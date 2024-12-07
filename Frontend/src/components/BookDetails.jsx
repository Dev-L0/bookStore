import { useParams } from "react-router-dom";
import { useBookStore } from "../../store/bookStore";
import { toast } from "sonner";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";


const BookDetails = () => {
    const{getBookById, selectedBook, error, isLoading} = useBookStore();
    const {id} = useParams();

    useEffect(()=>{
        const details = async()=>{
            try{
              await getBookById(id);
              console.log("Selected Book:", selectedBook);
            }catch(error){
             console.log("Error getting book", error.message);
             toast.error("Error getting book!");
            }
        } 
        details(); 
    },[]);
     
  return (
    <div>
         {isLoading ? <LoadingSpinner/> : ""}
      
       
{selectedBook ? (
       <div className="bg-base-900 shadow-xl lg:flex items-center justify-center  md:flex-col m-10">
        <div className="flex items-center justify-center h-50 w-30">
  <figure className="w-1/2 bg-pink-700">
    <img className="bg-pink-700"
      src={selectedBook.image}
      alt="Movie" />
  </figure>
  </div>
  <div className="card-body w-3/4 p-5 mx-auto">
    <h2 className="card-title">{selectedBook.name}</h2>
    <p>{selectedBook.title}</p>
    <p className="">{selectedBook.summary}</p>
    {console.log(selectedBook.summary)}
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy now</button>
    </div>
  </div>
</div>) : ("NULL")}
      
    </div>
  )
}

export default BookDetails;