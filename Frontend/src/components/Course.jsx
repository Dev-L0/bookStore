import React from 'react'
import list from '../../public/list.json';
import Card from './Card';
import {Link} from 'react-router-dom';
function Course() {
  return (
    <>
    
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 '>
      <div className='px-10 pt-40 items-center justify-center text-center '>
      <h1 className='text-2xl md:text-4xl '>We are delighted to have you <span className='text-red-300 dark:text-sky-900'>here! :)</span></h1>
      <p className='mt-8 mb-8'>Welcome to our cozy bookstore, where every shelf is a gateway to new adventures and timeless tales! Whether you're a devoted bibliophile or a casual reader, you'll find a carefully curated selection of books across all genres—fiction, non-fiction, fantasy, mystery, and more</p>
      <Link to='/' className='py-1 px-3 rounded-md cursor-pointer border border-slate-400 opacity-70 hover:bg-slate-800 text-xl'>Back</Link>
      </div>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-4'>
        {
          list.map((item)=>(
            <Card key={item.id} item={item}/>
          ))
        }
      </div>
    </div>
    
    </>
  )
}

export default Course