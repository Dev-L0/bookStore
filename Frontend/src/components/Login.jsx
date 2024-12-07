import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useState} from "react";
import { useAuthStore } from "../../store/authStore.js";

function Login() {


  const schema = z.object({
    email: z.string()
      .email({ message: 'Please enter a valid email address.' })
      .min(10, { message: 'Email must be at least 10 characters.' })
      .max(50, { message: 'Email cannot exceed 50 characters.' }),
    password: z.string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' }),
  }).strict();


  //const navigate = useNavigate();
  const {login, isLoading, error} = useAuthStore();
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
 
  
  const handleLogin = async (e)=> {
    e.preventDefault();
     try{
    await login(email, password);
    toast.success("Logged in!");
   
     }catch(error){
       toast.error("error logging in", error.message);
       console.log(error);
       
    }
   
  }

  
  return (
    <>
      <div className="flex justify-center items-center h-screen">
      
        {/* <dialog id="my_modal_3" className="modal "> */}
       
          <div className="modal-box dark:bg-slate-400 border ">
         
            <form onSubmit={handleLogin} method="dialog">
            <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}>
              ✕
            </Link>
            
            <h3 className="font-bold text-2xl">Login</h3>
            <div>
              {/* Email */}
              <div className="mt-5 space-y-2">
                <label className="p-1">Email</label>
                <br />
                <input
                 value={email}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                  onChange={(e)=>setEmail(e.target.value)}
                /><br/>
               
              </div>
              {/* Password */}
              <div className="mt-5 space-y-2">
                <label className="p-1">Password</label>
                <br />
                <input
                   value={password}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered outline-none w-80 dark:bg-slate-300"
                  onChange={(e)=>setPassword(e.target.value)}
                /><br/>
                
              </div>
            </div>
            <Link
                  className="underline text-xs text-sky-700 cursor-pointer"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
                <div>
                  {error && <p className="text-red-500 text-semibold mb-2">{error}</p>}
                </div>
            <div className="flex justify-around mt-3 p-2">
              {/* Button */}
              
              <button className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black" disabled={isLoading}>
                {isLoading ? "signing in..." : "Login"}
              </button>
             
              <p className="mt-2">
                Not registered?{" "} 
                <Link
                  className="underline text-sky-700 cursor-pointer"
                  to="/signup"
                >
                  Signup
                </Link>
               
                </p>
               
            </div>
            </form>
          </div>
        {/* </dialog> */}
      </div>
    </>
  );
}

export default Login;
