import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const enviarCorreo = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"BeautyMaps" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
    console.log('Correo enviado:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return false;
  }
};
