import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/all-books");
        const data = await res.json();
        setBooks(data.slice(0, 100));
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, []);

  return <BookCards books={books} headline="Best Seller Books" />;
};

export default BestSellerBooks;
