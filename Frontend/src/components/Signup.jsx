import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { useForm} from "react-hook-form"
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {  toast } from 'sonner';
import { useState } from "react";
import { useAuthStore } from "../../store/authStore.js";


export default function Signup() {

  const schema = z.object({
    name: z.string()
      .min(3, { message: 'Username must be at least 3 characters.' })
      .max(30, { message: 'Username cannot exceed 30 characters.' }),
    email: z.string()
      .email({ message: 'Please enter a valid email address.' })
      .min(10, { message: 'Email must be at least 10 characters.' })
      .max(50, { message: 'Email cannot exceed 50 characters.' }),
    password: z.string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' }),
  }).strict();



 const[password, setPassword] = useState("");
 const[email, setEmail] = useState("");
 const[name, setName] = useState("");
 
  const {signup, isLoading, error} = useAuthStore();
  const navigate = useNavigate();
 
  const handleSignup = async (e)=>{
    e.preventDefault();
    try{
      await signup(email, password, name);
      toast.success("Signed up successfully!");
       setTimeout(()=>{navigate('/verify-email')}, 1000);
      
     
    }catch(error){
      toast.error("Error signing up", error.message);
      console.log(error);
    }
  }

 
  return (
    <>
   
      <div className="flex items-center justify-center h-screen">
        <div>
        
      </div>
        <div className="modal-box dark:bg-slate-400 border ">
          <form onSubmit={handleSignup} className="flex flex-col items-center" method="dialog">
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-2xl">Signup</h3>
            <div>
              {/* usernaame */}
              <div className="mt-5 space-y-2">
                <label className="p-1">Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  
                 
                />
                
               

                <br />
              </div>
              {/* Email */}
              <div className="mt-5 space-y-2">
                <label className="p-1">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
           
                

                <br />
              </div>
              {/* Password */}
              <div className="mt-5 space-y-2">
                <label className="p-1">Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                  
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div>{error && <span className="text-red-500">{error}</span>}</div>
                
                

                <br/>
              </div>
            </div>
            <div className="flex justify-around mt-5 p-2">
              {/* Button */}
              <button className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black" 
                 disabled={isLoading} 
              
              >
                 {isLoading ? "Submitting.." : "Signup"}
              </button>

              
            </div>
          </form>
          <p className="text-center mt-3">
                Have account?
                <Link className="underline text-sky-700 cursor-pointer" to='/login'>Login
                </Link>
                
              </p>
              
        </div>
        
      </div>
    </>
  );
}
