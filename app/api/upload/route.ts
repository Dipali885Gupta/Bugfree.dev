import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// Route segment config for Next.js 15 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// This is the key configuration for body size in Next.js 15
export const maxDuration = 300 // Maximum function execution time in seconds (5 minutes for large uploads)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    // Validate Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary environment variables')
      return NextResponse.json(
        { error: 'Server configuration error. Please check Cloudinary credentials.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
    if (!validVideoTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload MP4, WebM, OGG, or MOV video.' },
        { status: 400 }
      )
    }

    // Validate file size (500MB limit)
    const maxSize = 500 * 1024 * 1024 // 500MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Video file size must be less than 500MB. Please compress your video or select a smaller file.' },
        { status: 413 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary (simple upload - auto-optimization happens on delivery)
    const result = await new Promise<{
      secure_url: string
      public_id: string
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'video',
            folder: 'bugfree-projects',
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload_stream error:', error)
              reject(error)
            } else {
              resolve(result as { secure_url: string; public_id: string })
            }
          }
        )
        .end(buffer)
    })

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    
    // Provide specific error messages
    if (error instanceof Error) {
      if (error.message.includes('body') || error.message.includes('FormData')) {
        return NextResponse.json(
          { error: 'Request too large. Please ensure your video is under 500MB.' },
          { status: 413 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to upload video. Please try again.' },
      { status: 500 }
    )
  }
}

// Delete video from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { public_id } = await request.json()

    if (!public_id) {
      return NextResponse.json({ error: 'No public_id provided' }, { status: 400 })
    }

    await cloudinary.uploader.destroy(public_id, { resource_type: 'video' })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}
