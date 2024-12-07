import { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import axios from "axios";
function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/book");
        setBook(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div className="px-10 pt-40 items-center justify-center text-center ">
          <h1 className="text-2xl md:text-4xl ">
            We are delighted to have you{" "}
            <span className="text-red-300 dark:text-sky-900">here! :)</span>
          </h1>
          <p className="mt-8 mb-8">
            Welcome to our cozy bookstore, where every shelf is a gateway to new
            adventures and timeless tales! Whether you&apos;re a devoted bibliophile
            or a casual reader, you&apos;ll find a carefully curated selection of
            books across all genres—fiction, non-fiction, fantasy, mystery, and
            more
          </p>
          <Link
            to="/"
            className="py-1 px-3 rounded-md cursor-pointer border border-slate-400 opacity-70 hover:bg-slate-800 text-xl"
          >
            Back
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
