import React,{useState} from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate , useParams} from 'react-router-dom';
import {Lock} from 'lucide-react';
import {Loader} from 'lucide-react';
import { toast } from 'sonner';
const ResetPassword = () => {
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const {resetPassword, error, isLoading, message} = useAuthStore();
    const {token }= useParams();
    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }
        try{
            
            await resetPassword(token, password);
            console.log(password, token)
            toast.success("Password reset successfully, redirecting to login page");
            setTimeout(()=>{
                navigate('/login');
            },1000)
           
        }catch(error){
            toast.error(error.message || "Error resetting password.");
        }
    }
  return (
    <div className='flex items-center justify-center h-screen'>
        
        {error && <p className = 'text-red-500 text-sm mb-4'>{error}</p>}
        {message && <p className = 'text-red-500 text-sm mb-4'>{message}</p>}
        
        <form onSubmit={handleSubmit}>
        <div className="p-10 bg-transparent border rounded-2xl flex flex-col items-center justify-center gap-10">
            <h1 className='text-2xl'>Reset Password</h1>
        <input
                     type="password"

        icon={Lock}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered outline-none w-80 dark:bg-slate-300 bg-transparent"
            />
             <input
             type="password"
             icon={Lock}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) =>setConfirmPassword(e.target.value)}
              className="input input-bordered outline-none w-80 dark:bg-slate-300 bg-transparent"
            />
            <button className="text-sm flex items-center justify-center border mt-5 rounded-xl w-32 h-10 mx-auto cursor-pointer border border-slate-400 bg-slate-400 text-black ">
              {isLoading ? <Loader/> : "Set New Password"}
            </button>

            </div>
        </form>
        
        </div>
   
  )
}

export default ResetPassword;