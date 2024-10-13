"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  //BOOK API
  interface BookDetails {
    fetchedTitle: string;
    author: string;
    genre: string;
    thumbnail: string | null;
    identifier: string;
  }

  const [bookTitle, setBookTitle] = useState("");
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

  // const title = "To Kill A Mockingbird";

  const fetchBookDetails = async (title: string) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`
    );
    const data = await response.json();
    return data.items[0] ? data.items[0] : null;
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const bookDetails = await fetchBookDetails(bookTitle); //fetch book details using title

      if (!bookDetails) {
        console.error("Book not found");
        return;
      }

      const fetchedTitle = bookDetails.volumeInfo.title; // Extract title
      const identifier = bookDetails.volumeInfo.identifier;
      const author = bookDetails.volumeInfo.authors
        ? bookDetails.volumeInfo.authors.join(", ")
        : "Unknown"; // Extract author(s)
      const genre = bookDetails.volumeInfo.categories
        ? bookDetails.volumeInfo.categories.join(", ")
        : "Unknown";
      const thumbnail = bookDetails.volumeInfo.imageLinks
        ? bookDetails.volumeInfo.imageLinks.thumbnail
        : null; // Extract thumbnail

      setBookDetails({ fetchedTitle, author, genre, thumbnail, identifier });
    } catch (error) {
      console.error("problem", error);
    }
  };

  const sendemail = async () => {
    const response = await fetch("/api/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const sendbooksdb = async () => {
    if (!bookDetails) {
      console.log("No book details to save.");
      return;
    }
    const response = await fetch("/api/booksdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isbn: bookDetails.identifier,
        title: bookDetails.fetchedTitle,
        author: bookDetails.author,
        genre: bookDetails.genre,
      }),
    });
  };

  //start to test the book endpoints
  return (
    <main>
      <form onSubmit={handleSearch}>
        <label>Search for a Book:</label>
        <br></br>
        <input
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        ></input>
        <button type="submit">FIND IT</button>
      </form>

      {bookDetails && (
        <div>
          <h2>Book Title: {bookDetails.fetchedTitle}</h2>
          <h3>Author: {bookDetails.author}</h3>
          <h4>Genre: {bookDetails.genre}</h4>
          {bookDetails.thumbnail && (
            <Image
              src={bookDetails.thumbnail}
              alt={bookDetails.fetchedTitle}
              width={150}
              height={225}
            />
          )}
        </div>
      )}

      <br></br>
      <br></br>
      <button onClick={sendemail}>Email Me</button>

      <br></br>
      <br></br>
      <br></br>
      <button onClick={sendbooksdb}>Book Database</button>
    </main>
  );
}
