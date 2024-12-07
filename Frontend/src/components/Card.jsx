import { useNavigate } from "react-router-dom"
import { useBookStore } from "../../store/bookStore";


function Card({item}) { 
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`/book-details/${item._id}`);
  };
  return (
   <>
   <div className='mt-20 my-3 p-3'>
   <div className="card border bg-base-100 dark:bg-slate-400 w-92 shadow hover:scale-105 duration-200 ">
  <figure>
    <img
      src={item.image}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.name}
      <div className="badge bg-red-300 text-black">{item.category}</div>
    </h2>
    <p>{item.title}</p>
    <div className="card-actions justify-between">
      <div className="badge badge-outline">${item.price}</div>
      <div className="badge badge-outline hover:bg-slate-900  rounded-full p-3" onClick={handleDetails}>Details</div>

    </div>
  </div>
</div>
</div>
   </>
  )
}

export default Card