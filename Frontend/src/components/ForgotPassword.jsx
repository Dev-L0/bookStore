import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import {toast} from 'sonner';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, isSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await forgotPassword(email); 
      toast.success("Reset link sent to your mail, successfully.");
      isSubmitted(true); 
    } catch (error) {
        console.error("Error sending reset link:", error);
                toast.error("Error sending reset link");
            
      
      
    }
  };
  return (
    <div className=" flex flex-col items center justify-center h-screen  overflow-hidden">
      <div className="p-10 bg-slate-900 rounded-2xl mx-auto">
        <h2 className="text-bold text-2xl text-center p-5">Forgot Password</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <p>
              Enter your email address and we will send you a link to reset your
              password.
            </p>
            <div className="flex flex-col p-5 justify-center items-center">
            <input
            type="email"
              placeholder="Enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered outline-none w-80 dark:bg-slate-300 bg-transparent"
            />
            <button className="text-sm flex items-center justify-center border mt-5 rounded-xl w-32 h-10 mx-auto cursor-pointer border border-slate-400 bg-slate-400 text-black ">
              {isLoading ? <LoadingSpinner /> : "Send Reset Link"}
            </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <Mail className="h-10 w-10 mx-auto mb-2" />{" "}
            <div>
              {" "}
              If an account exists for {email}, you will receive a password
              reset link shortly.{" "}
            </div>
          </div>
        )}
 </div>
        <Link
          className="text-sm hover:underline flex items-center justify-center border mt-5 rounded-xl w-32 h-10 mx-auto cursor-pointer border border-slate-400 bg-slate-400 text-black "
          to={"/login"}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
     
    </div>
  );
};

export default ForgotPassword;
