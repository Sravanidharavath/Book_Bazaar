import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => res.json())
      .then(data => setAllBooks(data));
  }, []);

  //delete a book
  const handleDelete = (id) =>{
    console.log(id);
    fetch(`http://localhost:5000/book/${id}`,{
      method: "DELETE",
    }).then(res => res.json()).then(data => {
      alert("Book is deleted successfully!")
      //setAllBooks(data);
    })
  }

  return (
    <div className="w-full p-4 md:p-8 overflow-x-auto bg-gray-100 min-h-screen">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Books</h2>

      <table className="lg:w-[1180px] table-auto border-2 border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-5">No.</th>
            <th className="px-4 py-5">Book Name</th>
            <th className="px-4 py-5">Author Name</th>
            <th className="px-4 py-5">Category</th>
            <th className="px-4 py-5">Price</th>
            <th className="px-4 py-5">Edit or Manage</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {allBooks.map((book, index) => (
            <tr key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                {index + 1}
              </td>
              <td className="px-4 py-4">{book.bookTitle}</td>
              <td className="px-4 py-4">{book.authorName}</td>
              <td className="px-4 py-4">{book.category}</td>
              <td className="px-4 py-4">${book.price ? book.price : '10.00'}</td>
              <td className="px-4 py-4">
                <Link
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  to={`/admin/dashboard/edit-books/${book._id}`}
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(book._id)} className='bg-red-500 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
