// app/api/send-email/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, title, message } = await req.json();

    // SMTP konfigürasyonu
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,  // Kendi SMTP sunucunuzun adresi
      port: process.env.MAIL_PORT,  // Port numarası (587 veya 465)
      secure: process.env.MAIL_PORT === '465',  // SSL/TLS kullanımı
      auth: {
        user: process.env.MAIL_USER,  // E-posta adresiniz
        pass: process.env.MAIL_PASS,  // E-posta hesabınızın şifresi
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO_USER,  // Gönderilecek e-posta adresi
      subject: `Yeni Mesaj: ${title}`,
      text: `Mesaj Gönderen: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`,
    };

    // E-posta gönderme
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Mesaj başarıyla gönderildi!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('E-posta gönderilirken hata oluştu:', error);
    return new Response(
      JSON.stringify({ error: 'Mesaj gönderilemedi', details: error.message }),
      { status: 500 }
    );
  }
}
