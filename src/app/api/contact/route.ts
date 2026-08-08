import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAX_LENGTH = 5000

function clean(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  // Honeypot — bots fill this hidden field. Silently succeed without sending.
  if (body.website) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(body.name, 100)
  const email = clean(body.email, 254)
  const message = clean(body.message, MAX_LENGTH)
  const service = clean(body.service, 100)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }

  const user = process.env.MAIL_USERNAME
  const pass = process.env.MAIL_PASSWORD
  if (!user || !pass) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  const host = process.env.MAIL_HOST ?? 'smtp.gmail.com'
  const port = Number(process.env.MAIL_PORT ?? 587)
  const secure = port === 465

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })

  const rawFromName = process.env.MAIL_FROM_NAME ?? ''
  const fromName = rawFromName.includes('${') || !rawFromName.trim() ? 'Rojit Pokharel' : rawFromName.trim()
  const from = `"${fromName}" <${process.env.MAIL_FROM_ADDRESS || user}>`
  const owner = process.env.CONTACT_MAIL_TO ?? 'info@rojitpokharel.com.np'

  const serviceLabel = service.replace(/-/g, ' ')

  const ownerMail = {
    from,
    to: owner,
    replyTo: `${name} <${email}>`,
    subject: `New project inquiry${serviceLabel ? ` — ${serviceLabel}` : ''} — ${name}`,
    text: [
      `You received a new inquiry from the portfolio site.\n`,
      `Name: ${name}`,
      `Email: ${email}`,
      serviceLabel ? `Service: ${serviceLabel}` : null,
      `\nMessage:\n${message}\n`,
    ]
      .filter(Boolean)
      .join('\n'),
  }

  const clientMail = {
    from,
    to: email,
    subject: 'Thanks for reaching out — Rojit Pokharel',
    text: [
      `Hi ${name},\n`,
      `Thanks for your message${serviceLabel ? ` about ${serviceLabel}` : ''}.\n`,
      `I've received it and will get back to you within 24 hours.\n`,
      `\nIn the meantime, you can explore my work: https://portfolio.rojitpokharel.com.np/projects\n`,
      `\n— Rojit Pokharel\nFull-Stack Web Developer & System Architect\nKathmandu, Nepal`,
    ].join('\n'),
  }

  try {
    await Promise.all([transporter.sendMail(ownerMail), transporter.sendMail(clientMail)])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact email send failed:', err)
    return NextResponse.json(
      { error: 'Could not send your message. Please try again or email me directly.' },
      { status: 500 },
    )
  }
}
