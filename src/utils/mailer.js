
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import configObject from '../config/process.config.js';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: configObject.email, // tu correo gmail
    pass: configObject.password, // contraseña de aplicación
  }
});

export const sendTicketEmail = async (to, ticketData) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: 'Tu compra ha sido confirmada ✅',
    html: `
      <h1>¡Gracias por tu compra!</h1>
      <p><strong>Código de ticket:</strong> ${ticketData.code}</p>
      <p><strong>Fecha:</strong> ${ticketData.purchase_datetime}</p>
      <p><strong>Total:</strong> $${ticketData.amount}</p>
    `
  };
 
  await transporter.sendMail(mailOptions);
};


export const sendLoginEmail = async (to, user) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: 'Login exitoso ✅',
    html: `
      <h1>¡Bienvenido!</h1>
      <p><strong>Nombre:</strong> ${user.first_name}</p>
      <p><strong>Apellido:</strong> ${user.last_name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `
  };

  await transporter.sendMail(mailOptions);
 };