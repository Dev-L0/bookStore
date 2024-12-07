import { create } from "zustand";
import axios from "axios";



const API_URL = "http://localhost:3000/api/book";
axios.defaults.withCredentials = true;

export const useBookStore = create((set) => ({
  books: [],
  selectedBook:null,
  error: null,
  isLoading: false,
  message: null,
  isAuthenticated: false,
  createBook: async (name, price, category, title, image, summary) => {
    set({ isLoading: true, error: null });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("title", title);
    formData.append("image", image); // Add the image file here
    formData.append("summary", summary);
   
    try {
      const response = await axios.post(`${API_URL}/create-book`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({
        book: response.data.newBook,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "error creating book",
        isLoading: false,
      });
      throw Error;
    }
  },

  updateBook: async (id, name, price, category, title, image, summary)=>{
   set({isLoading: true, error:null});
   const formData = new FormData();
   formData.append("name", name);
   formData.append("price", price);
   formData.append("category", category);
   formData.append("title", title);
   formData.append("image", image);
   formData.append("summary", summary);
    
   
   try{
    const response = await axios.patch(`${API_URL}/${id}`, formData, { headers: {"Content-Type": "multipart/form-data"},
    });
    set({books:response.data.updateBook, isAuthenticated:true, isLoading:false});
   }catch(error){
    set({error:error.response.data.message || "error updating book", isLoading: false});

   }
  },

  getAllBooks: async()=>{
    set({isLoading:true, error: null});
    try{
      const response = await axios.get(`${API_URL}/all-books`);
      set({books:response.data.books, isAuthenticated:true, isLoading:false});
    }catch(error){
      set({error:error.response.data.message || "error fetching books", isLoading: false}); 
    }
  },

  getBookById: async(id)=>{
    set({isLoading:true, error:null});
    try{
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response.data.findBook);
      set({selectedBook:response.data.findBook, isAuthenticated:true, isLoading:false});
    }catch(error){
      set({error:error.response.data.message || `error fetching book ${id}`, isLoading:false});
    }
  },

  deleteBook: async(id)=>{
    set({isLoading:true, error:null});
    try{
      const response = await axios.delete(`${API_URL}/${id}`);
      set({books:response.data.books, isAuthenticated:true, isLoading:false});
  } catch(error){
    set({error:error.response.data.message || "error deleting book", isLoading: false});
  }
},

}));
