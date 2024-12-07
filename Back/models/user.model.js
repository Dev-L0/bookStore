import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role:{
      type:String,
      enum:['user', 'admin'],
      default:'user'

    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpires: Date,
  
  cartData:{
    type: Object,
    default:{}
  }
},
  { timestamps: true, minimize:false }
);

const User = mongoose.model("User", userSchema);

export default User;
