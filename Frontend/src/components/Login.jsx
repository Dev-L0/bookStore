import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box dark:bg-slate-400 border">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}>
              ✕
            </Link>
            
            <h3 className="font-bold text-2xl">Login</h3>
            <div>
              {/* Email */}
              <div className="mt-5 space-y-2">
                <span className="p-1">Email</span>
                <br />
                <input
                {...register("email", { required: true })}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                /><br/>
                {errors.email && <span className="text-sm text-red-400"> email is required!</span>}
              </div>
              {/* Password */}
              <div className="mt-5 space-y-2">
                <span className="p-1">Password</span>
                <br />
                <input
                {...register("password", { required: true })}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered outline-none w-80 dark:bg-slate-300"
                /><br/>
                {errors.password && <span className="text-sm text-red-400 ">Password is required!</span>}
              </div>
            </div>
            <div className="flex justify-around mt-3 p-2">
              {/* Button */}
              <button className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black">
                Login
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
        </dialog>
      </div>
    </>
  );
}

export default Login;
