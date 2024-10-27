import React from "react";
import banner from '../../public/banner.png';
const Banner = () => {
  return (
    <>
      <div className="max-w-screen-2xl container my-10 mx-auto md:px-20 px-4 flex flex-col md:flex-row">
          <div className="order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-32">
          <div className="space-y-12">
            <h1 className="text-4xl font-bold">
              Welcome! Where every book opens a door to a <span className="dark:text-sky-900">new adventure.</span>
            </h1>
            <p className="text-xl">
            Greetings, book lovers! we believe that every book has a story to tell. Dive into our collection and find your next favorite read!
            </p>
            <label className="input dark:bg-sky-100 dark:border-slate-500  input-bordered flex items-center gap-2 w-25">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" />
</label>


          </div>
          <button className="btn dark:bg-slate-400 dark:border-slate-500 dark:text-black  mt-6 bg-transparent opacity-70">Send</button> 
        </div>
        <div className="order-1 md:order-2 w-full md:w-1/2 md:mt-10"><img className="w-100 h-100" src={banner}/></div>
      </div>
    </>
  );
};

export default Banner;
