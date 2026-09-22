import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { name, email, projectBrief, budget } = await request.json()

    if (!name || !email || !projectBrief) {
      return NextResponse.json(
        { error: "Name, email, and project brief are required" },
        { status: 400 },
      )
    }

    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!user || !pass) {
      console.warn("SMTP_USER or SMTP_PASS not set")
      return NextResponse.json({ error: "SMTP not configured" }, { status: 500 })
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com"
    const port = Number(process.env.SMTP_PORT || 587)

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    // Always deliver to SMTP_TO (inbox). Do not use public site.email —
    // that brand address often differs from the monitored inbox.
    const recipient = process.env.SMTP_TO || user
    const fromAddress = process.env.SMTP_FROM || user

    const text = [
      `New project enquiry from ${name}`,
      `Email: ${email}`,
      `Budget: ${budget || "Not specified"}`,
      ``,
      `Brief:`,
      projectBrief,
    ].join("\n")

    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">New project enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Budget:</strong> ${escapeHtml(budget || "Not specified")}</p>
        <p><strong>Brief:</strong></p>
        <pre style="white-space:pre-wrap;background:#f4f4f5;padding:12px;border-radius:8px">${escapeHtml(projectBrief)}</pre>
      </div>
    `

    const info = await transporter.sendMail({
      from: `"GetCodeFree Contact" <${fromAddress}>`,
      to: recipient,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text,
      html,
    })

    console.log("Email sent:", info.messageId, "→", recipient)
    return NextResponse.json({ success: true, to: recipient })
  } catch (error) {
    console.error("send-email error:", error)
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: `Failed to send email: ${message}` }, { status: 500 })
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
