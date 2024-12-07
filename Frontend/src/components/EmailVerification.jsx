import React, { useState, useRef, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';
const EmailVerification = () => {
    const [code, setCode] = useState(["","","",""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    
    
    const {verifyEmail, isLoading, error} = useAuthStore();

    const handleChange = (index, value)=>{
     const newCode = [...code];
     if(value.length > 1){
        const pastedCode = value.slice(0,4).split("");
        for(let i =0; i<4; i++){
            newCode[i] = pastedCode[i] || "";
        }
        setCode(newCode);
        const lastFilledIndex = newCode.findLastIndex((digit)=> digit !=="");
        const focusIndex = lastFilledIndex < 3 ? lastFilledIndex + 1 : 3;

        inputRefs.current[focusIndex].focus();

     } else{
        newCode[index] = value;
        setCode(newCode);
        if(value && index < 3){
            inputRefs.current[index + 1].focus();
        }


     }
    }
    const handleKeyDown = (index, e)=>{
        if(e.key === "Backspace" && !code[index] && index > 0){
            inputRefs.current[index-1].focus();
        }

    }

    const handleSubmit= async (e)=>{
      e.preventDefault();
      const verificationCode = code.join("");
      try{
        await verifyEmail(verificationCode);
        navigate('/');
        toast.success("Email verified succesfully!");
        
      }catch(error){
        toast.error("Error verifying Email!")
        console.log(error);
      }
    }
    //Auto submit whe all fields are filled.
    useEffect(()=>{
   if(code.every(digit=> digit !== "")){
    handleSubmit(new Event('submit'));
   }
    },[code])
  return (
    <div className="flex justify-center items-center h-screen">
      
    <div className="mx-auto max-w-md w-full dark:bg-slate-400 rounded-2xl overflow-hidden border p-10">
   <h2 className='text-center text-2xl p-3'>Verify your email</h2>
   <p className='text-center p-5'>Enter the 4-digit code sent to your email address.</p>
   
   <form className='space-y-6' onSubmit={handleSubmit}>
<div className='flex justify-between'>
    {code.map((digit, index)=>( <input key={index}
    ref={(el)=>(inputRefs.current[index]=el)}
    type="text"
    maxLength = '4'
    value={digit}
    onChange={(e)=> handleChange(index, e.target.value)}
    onKeyDown={(e)=> handleKeyDown (index, e)}
        className='w-12 h-12 text-center text-2xl  text-black border bg-slate-700 rounded-lg focus:outline-none'
    
    />
         
))}
</div>
{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
<button type="submit"
                  className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black " disabled={isLoading || code.some((digit)=> !digit)}>{isLoading ? "Verifying..." : "Verify Email"}</button>
   </form>
    </div>
    </div>
  )
}

export default EmailVerification;