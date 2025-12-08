import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

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
