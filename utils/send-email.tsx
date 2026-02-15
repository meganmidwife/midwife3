'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SITE_EMAIL = process.env.SITE_EMAIL;
const transporter = nodemailer.createTransport({
  service: 'outlook',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendMail({
  email,
  to,
  subject,
  text,
  html,
}: {
  email: string;
  to?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error('Something Went Wrong', SMTP_USER, SMTP_PASS, error);
    return;
  }
  const info = await transporter.sendMail({
    from: email,
    to: email || SITE_EMAIL,
    subject: subject,
    text: text,
    html: html ? html : '',
  });
  console.log('Message Sent', info.messageId);
  console.log('Mail sent to', SITE_EMAIL);
  return info;
}