import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useBookStore} from '../../store/bookStore.js'
import {toast} from 'sonner';
const AddBook = () => {
  
  const{createBook, isLoading, error} = useBookStore();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      await createBook(name, price, category, title, image, summary);
      toast.success("Succesfully added a book!");
      navigate('/all-books');
      
    }catch(error){
      toast.error("Error creating book", error.message);
       console.log(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen text-sm mt-10">
      <div className="dark:bg-slate-400">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h3 className="font-bold text-2xl">Add Book</h3>
          <div>
            {/* book name */}
            <div className="mt-5 space-y-2">
              <label className="p-1">Name of the Book</label>
              <br />
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter book name"
                className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                onChange={(e)=> setName(e.target.value)}
              />

              <br />
            </div>
            {/* Title of book */}
            <div className="mt-5 space-y-2">
              <label className="p-1">Title of book</label>
              <br />
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Enter the title of book"
                className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                onChange={(e)=> setTitle(e.target.value)}
              />

              <br />
            </div>
            
            {/* price */}
            <div className="mt-5 space-y-2">
              <label className="p-1">Price</label>
              <br />
              <input
                type="number"
                id="price"
                value={price}
                placeholder="Enter the price of book"
                className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                onChange={(e)=>setPrice(e.target.value)}
              />

              

              <br />
            </div>
            {/* Category of book */}
            <div className="mt-5 space-y-2">
              <label className="p-1">Category of book</label>
              <br />
              <select className="select select-bordered w-full max-w-xs " id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
  <option>Select category</option>
  <option>Fiction</option>
  <option>Action</option>
</select>
          
              <br />
            </div>
           
            <div className="mt-5 space-y-2">
              <label className="p-1">Image of book</label>
              <br />
              <input
                type="file"
                id="image"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e)=>setImage(e.target.files[0])}
              />
             
            </div>
            <br/>
              {/* Summary of book */}
              <div className="mt-5 space-y-2">
              <label className="p-1">Summary of book</label>
              <br />
              <input
                type="text"
                id="summary"
                value={summary}
                placeholder="Enter the summary of book"
                className="input input-bordered outline-none w-80 dark:bg-slate-300 "
                onChange={(e)=> setSummary(e.target.value)}
              />
              {console.log(summary)}

              <br />
            </div>
          </div>
          <div>{error && <span className="text-red-500">{error}</span>}</div>

          <div className="flex justify-around mt-5 p-2 gap-5">
            {/* Button */}
            <button
              className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black"
              disabled={isLoading} 
            >
              {isLoading ? "Submitting..": "Submit"}
            </button>
            <Link
              className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black"
              to="/admin-dashboard"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
