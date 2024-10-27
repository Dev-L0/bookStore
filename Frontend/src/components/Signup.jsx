import React from "react";
import Login from './Login';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div  className="flex items-center justify-center h-screen">
        <div className="modal-box dark:bg-slate-400 border">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </Link>
          
          <h3 className="font-bold text-2xl">Signup</h3>
          <div>
               {/* Name */}
               <div className="mt-5 space-y-2">
              <span className="p-1">Name</span>
              <br />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                {...register("name", { required: true })}
              />
              <br/>
              {errors.name && <span className="text-sm text-red-400"> name is required!</span>}
            </div>
            {/* Email */}
            <div className="mt-5 space-y-2">
              <span className="p-1">Email</span>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                {...register("email", { required: true })}
              />
              <br/>
              {errors.email && <span className="text-sm text-red-400"> email is required!</span>}
            </div>
            {/* Password */}
            <div className="mt-5 space-y-2">
              <span className="p-1">Password</span>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered outline-none w-80 dark:bg-slate-300"
                {...register("password", { required: true })}
              />
              <br/>
              {errors.password && <span className="text-sm text-red-400"> password is required!</span>}
            </div>
          </div>
          <div className="flex justify-around mt-5 p-2">
            {/* Button */}
            <button className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black">
              Signup
            </button>
          
            <p className='mt-2'>Have account?<button className='underline text-sky-700 cursor-pointer'  onClick={()=>document.getElementById("my_modal_3").showModal()}>Login</button></p>
            <Login/>
            
            </div> 
            </form>
          </div>
        </div>
    </>
  );
}
