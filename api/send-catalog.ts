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

  const { name, whatsapp, interest, volume, email, city } = (req.body ?? {}) as {
    name?: string
    whatsapp?: string
    interest?: string
    volume?: string
    email?: string
    city?: string
  }

  if (!name?.trim() || !whatsapp?.trim() || !email?.trim() || !email.includes('@')) {
    res.status(400).json({ error: 'Nome, WhatsApp e e-mail válidos são obrigatórios.' })
    return
  }

  const interestLabel = interest === 'caixa-dagua' ? "Caixa d'Água" : interest === 'tanque' ? 'Tanque Estacionário' : 'Não informado'
  const volumeLabel = volume && volume !== 'outro' ? `${Number(volume).toLocaleString('pt-BR')} L` : volume === 'outro' ? 'Ainda não sabe / outro' : '—'

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

    // E-mail para o lead — limpo, só o catálogo
    await transporter.sendMail({
      from: `"Paulim Tanques" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Catálogo de Produtos — Paulim Tanques',
      text: `Olá ${name.trim()},\n\nSegue em anexo o catálogo de produtos da Paulim Tanques.\n\nQualquer dúvida, é só responder este e-mail ou chamar no WhatsApp.\n\nEquipe Paulim Tanques`,
      attachments: [
        { filename: 'Catalogo-Paulim-Tanques.pdf', path: CATALOG_PATH },
      ],
    })

    // E-mail interno — dados do lead pra equipe entrar em contato
    await transporter.sendMail({
      from: `"Site Paulim Tanques" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Novo interesse no catálogo — ${name.trim()}`,
      text: [
        `Nome: ${name.trim()}`,
        `WhatsApp: ${whatsapp.trim()}`,
        `E-mail: ${email.trim()}`,
        `Cidade: ${city?.trim() || '—'}`,
        `Interesse: ${interestLabel}`,
        `Volume/capacidade: ${volumeLabel}`,
      ].join('\n'),
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-catalog error', err)
    res.status(500).json({ error: 'Falha ao enviar o e-mail. Tente novamente.' })
  }
}
