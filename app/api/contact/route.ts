import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dendist0402@gmail.com', // Email tujuan (email King)
      subject: `Kolaborasi Website Portfolio: ${name}`,
      text: `Nama: ${name}\nEmail Pengirim: ${email}\n\nPesan:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #00f3ff; border-radius: 10px;">
          <h2 style="color: #0066ff;">Pesan Kolaborasi Baru! 🚀</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #bc13fe;" />
          <p><strong>Pesan:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Email berhasil dikirim!' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Gagal mengirim email.' }, { status: 500 });
  }
}