'use client'
import React, { useEffect, useState } from 'react';
import { Book } from '@/models/Book';

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await fetch('/api/books');
            if (!response.ok) {
              throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
          } catch (error) {
            console.error('Error fetching books:', error);
          }

        };
        
        fetchBooks();
      }, []);
  return (
    <div>
      <h2>Books List</h2>
        
      {books.map((book) => (
        <div key={book.isbn}>
        <img src={book.image} alt="" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>State: {book.bookState}</p>
        </div>
      ))}
    </div>
  );
};

export default BooksList;

