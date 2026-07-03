import nodemailer from 'nodemailer'
import path from 'path'

type Req = { method?: string; body?: unknown }
type Res = {
  status: (code: number) => Res
  json: (body: unknown) => void
}

const CATALOG_PATH = path.join(process.cwd(), 'public', 'assets', 'catalogo-paulim-tanques.pdf')

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email } = (req.body ?? {}) as { name?: string; email?: string }

  if (!name?.trim() || !email?.trim() || !email.includes('@')) {
    res.status(400).json({ error: 'Nome e e-mail válidos são obrigatórios.' })
    return
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Paulim Tanques" <${process.env.SMTP_USER}>`,
      to: email,
      bcc: process.env.SMTP_USER,
      subject: 'Catálogo de Produtos — Paulim Tanques',
      text: `Olá ${name.trim()},\n\nSegue em anexo o catálogo de produtos da Paulim Tanques.\n\nQualquer dúvida, é só responder este e-mail ou chamar no WhatsApp.\n\nEquipe Paulim Tanques`,
      attachments: [
        { filename: 'Catalogo-Paulim-Tanques.pdf', path: CATALOG_PATH },
      ],
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-catalog error', err)
    res.status(500).json({ error: 'Falha ao enviar o e-mail. Tente novamente.' })
  }
}
