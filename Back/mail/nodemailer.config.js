import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user:process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    debug:true,
    logger:true
  });
  