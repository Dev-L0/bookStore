import User from '../models/user.model.js';
import brcryptjs from 'bcryptjs';
import crypto from 'crypto';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js';
import {sendOtpMail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail} from '../mail/mail.js';
export const signup = async(req,res)=>{
    let{name, email,password, role} = req.body;
    try{
      if(!name || !email || !password){
        throw new Error("All fields are required!");
      }

      const userAlreadyExists = await User.findOne({email});
      if(userAlreadyExists){
        return res.status(400).json({success:false, message:"User already exists!"});
      }

      const hashedPassword = await brcryptjs.hash(password, 10);
      const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();

      const user = new User({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
        role: role || 'user',
      });

      await user.save();

    generateTokenAndSetCookie(res, user._id, user.role);
     res.status(201).json({success:true,
      message:"User created successfully",
      user:{...user._doc,
        password:undefined
      }});
      
     await sendOtpMail(email, verificationToken);

    }catch(error){
      console.log("Error", error.message);
        res.status(400).json({success:false, message:` error ${error.message}`});
    }
}

export const verifyEmail = async(req,res)=>{
  const {code} = req.body;
  try{
    const user = await User.findOne({
      verificationToken:code,
      verificationTokenExpires: {$gt : Date.now()},
    });

    if(!user){
      return res.status(400).json({success:false, message:"Invalid or expired verification code!"});
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({success:true, message:"Email verified successfully!", user:{
      ...user._doc, password:undefined
    }});

  }catch(error){
    console.log("error in verifying email", error);
    res.status(400).json({success:false, message:error.message || "Server error"});
  }
}
export const login = async(req,res)=>{
  const {email, password} = req.body;
  
    try{
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }
   const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({message:"Invalid credentials!"});
   }
   const isPasswordValid = await brcryptjs.compare(password, user.password);
   if(!isPasswordValid){
    return res.status(400).json({message:"Invalid credentials!"});
   }
   generateTokenAndSetCookie(res, user._id, user.role);
   user.lastLogin = new Date();

   await user.save();

   res.status(200).json({success:true, message:"Logged in successfully!",
    user: {...user._doc, password: undefined}
   });
    }
    catch(error){
      console.log("error in login", error);
      res.status(400).json({success:false, message:error.message});
    }
}

export const logout = async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logged out successfully!"});
}

export const forgotPassword = async(req,res)=>{
  const {email} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(200).json({message:"Invalid credentals!"});
    } 
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hr

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();
    await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({success: true, message:"Password reset link sent to your mail"})

  }catch(error){
   console.log("error in forgotPassword", error);
   res.status(400).json({success:false, message:error.message});
  }
}

export const resetPassword = async(req,res)=>{
  try{
  const {token} = req.params;
  const {password} = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() }
  });

  if(!user){
    return res.status(400).json({success:false, message:"Invalid or expired reset token"});
  }

  const hashedPassword = await brcryptjs.hash(password, 10);
  
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
 
  await user.save();
  await sendResetSuccessEmail(user.email);
  res.status(200).json({success:true, message:"Password reset successfully!"});
  }catch(error){
    console.log("Error resetting password", error);
    res.status(400).json({success:false, message: error.message});
  }
}

export const checkAuth = async (req, res)=>{
  try{
    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({success:false, message:"User not found."});
    }
    res.status(200).json({success:true, message:"User authenticated.", user:{
      ...user._doc,
      password: undefined
    }});
  }catch(error)
{ console.log("Error in checkAuth", error);
  res.status(400).json({success:false, message:error.message});

}}