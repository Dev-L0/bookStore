import React, { useEffect } from "react";
import { useBookStore } from "../../store/bookStore";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AllBooks = () => {
  const { getAllBooks, deleteBook, isLoading, error, books } = useBookStore();
  useEffect(() => {
    const getBooks = async () => {
      await getAllBooks();
    };
    getBooks();
  }, [getAllBooks]);

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      await getAllBooks();
      toast.success("Successfully deleted the book!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting the book!");
    }
  };

  return (
    <div className="overflow-x-auto p-5">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {Array.isArray(books) &&
            books.map((item) => (
              <tr key={item._id}>
                <th className="w-2 "><img loading="lazy" alt={item.name} src={item.image}/></th>
                <th>{item.name}</th>
                <td><span>{item.title}</span></td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td className="flex justify-between">
                  <Link
                    to={`/update-book/${item._id}`}
                    className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black"
                  >
                    Update
                  </Link>
                  <button
                    className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 bg-slate-400 text-black dark:border-black"
                    onClick={() => handleDeleteBook(item._id) }disabled={isLoading}
                  >
                    {isLoading ? "Deleting" : "Delete"}
                    {error && <span className="text-red-500">{error}</span>}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBooks;
