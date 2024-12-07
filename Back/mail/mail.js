import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_MAIL, PASSWORD_RESET_SUCCESS_TEMPLATE  } from './emailTemplate.js';
import { transporter } from './nodemailer.config.js';
import dotenv from 'dotenv';

dotenv.config();

 export const sendOtpMail = async (email, verificationToken)=> {
    try{
  const info = await transporter.sendMail({
    from: process.env.MAIL_USER, 
    to: email,
    subject: "Verify your email:",
    html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',  verificationToken), 
    category: "Email Verification"
  });

  console.log("OTP send successfully", info);
    }catch(err){
        console.log(`Error sending verification mail. ${err.message}`);
        throw new Error(`Error sending verification mail:${err}`);
    }
}



export const sendWelcomeEmail = async (email, name)=>{
  try{
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER, 
      to: email,
      subject: "Welcome to BS",
      html: WELCOME_MAIL.replace('{name}', name), 
      category: "Welcome mail"
    });
  
    console.log("Welcome email sent successfully", info);
      }catch(err){
          console.log(`Error sending welcome mail. ${err.message}`);
          throw new Error(`Error sending welcome mail:${err}`);
      }
  }


  export const sendResetPasswordEmail = async (email, resetURL)=>{
    try{
      const info = await transporter.sendMail({
        from: process.env.MAIL_USER, 
        to: email,
        subject: "Reset password",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL), 
        category: "Reset password "
      });
   
      console.log("Reset password email sent successfully", info);
        }catch(err){
            console.log(`Error sending reset password mail. ${err.message}`);
            throw new Error(`Error sending reset password mail:${err}`);
        }
  }


  export const sendResetSuccessEmail = async (email)=>{
    try{
      const info = await transporter.sendMail({
        from: process.env.MAIL_USER, 
        to: email,
        subject: "Password reset successful",
        html:PASSWORD_RESET_SUCCESS_TEMPLATE, 
        category: "Password reset successful "
      });
      console.log("Password reset successful sent successfully", info);
        }catch(err){
            console.log(`Error sending reset password mail. ${err.message}`);
            throw new Error(`Error sending reset password mail:${err}`);
        }
  }