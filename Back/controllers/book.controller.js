import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res
      .status(200)
      .json({ message: "Successfully, fetched all books.", books });
  } catch (error) {
    console.log("Error", error);
    res
      .status(400)
      .json({ message: error.message || "Internal Server Error." });
  }
};

export const createBook = async (req, res) => {
  const { name, price, category, title, summary } = req.body;
  const image = req.file ? req.file.path : null;
console.log(req.body);
  try {
    if (!name || !price || !category || !image || !title ||!summary) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const book = await Book.findOne({name});
    if (book) {
      return res.status(400).json({ message: "Book already exists!" });
      }

    const newBook = await Book.create({
      name,
      price,
      category,
      title,
      summary,
      image,
      
    });

    
    res
      .status(201)
      .json({
        message: "Book created successfully!",
        success: true,
        newBook: newBook,
      });
  } catch (error) {
    console.log("Error creating book", error);
    res
      .status(400)
      .json({
        message: error.message || "Error creating book.",
        success: false,
      });
  }
};

export const getBookbyId = async (req, res) => {
  const { id } = req.params;
  // console.log("backend", id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid book ID format", success: false });
    }
    const findBook = await Book.findById(id);
    if (!findBook) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }
    console.log(
     { id: findBook.id,
      name: findBook.name,
      title: findBook.title,
      summary: findBook.summary, // Ensure this is included
      image: findBook.image})
    res.status(200).json({ message: "Book found",findBook:{
      id: findBook.id,
      name: findBook.name,
      title: findBook.title,
      summary: findBook.summary, // Ensure this is included
      image: findBook.image,
    } });
   
  } catch (error) {
    console.log("Error getting book", error);
    res
      .status(400)
      .json({
        message: error.message || "Internal Server error",
        success: false,
      });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid book ID format", success: false });
    }
    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Bood updated successfully!", updatedBook });
  } catch (error) {
    console.log("Error updating book", error);
    res.status(400).json({ message: error.message, success: false });
  }
};

export const deleteBook = async (req, res) => {
  const {id} = req.params;
  try{
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"Invalid book ID format", success:false});
    }

    const deletedBook = await Book.findByIdAndDelete(id);
    if(!deletedBook){
      return res.status(404).json({message:"Book not found", success:false})
    }
    res.status(200).json({message:"Book deleted successfully!", deleteBook});
  }catch(error){
    console.log("Error deleting book", error);
    res.status(400).json({message:error.message, success:false});
  }
};
