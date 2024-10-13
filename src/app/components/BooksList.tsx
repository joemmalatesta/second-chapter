"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Book } from "@/models/Book";
import L from "leaflet";
import { useSession } from "next-auth/react";
import "../../index.css";

const BooksList: React.FC = () => {
  const genres: string[] = [
    "Children's",
    "Fantasy",
    "Fiction",
    "Historical Fiction",
    "Mystery",
    "Non-fiction",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];

  const [books, setBooks] = useState<any[]>([]);
  const [isLocationAvailable, setIsLocationAvailable] =
    useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); //new

  const calculateDistances = useCallback(
    (booksData: any[], position: GeolocationPosition) => {
      return booksData.map((book) => {
        const currentPosition = L.latLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const bookPosition = L.latLng(
          book.location.latitude,
          book.location.longitude
        );
        const distanceInMeters = currentPosition.distanceTo(bookPosition);
        const distanceInMiles = distanceInMeters / 1609.34; // Convert meters to miles
        const roundedDistance = Math.round(distanceInMiles * 10) / 10; // Round to nearest 10th
        return { ...book, distance: roundedDistance };
      });
    },
    []
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationAvailable(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocationAvailable(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/books`);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        const filterBooks = (booksData: any[]) => {
          return booksData.filter((book: any) => 
            !book.checkedOutTo && 
            (selectedGenres.length === 0 || selectedGenres.includes(book.genre.toLowerCase))
          );
        };

        if (isLocationAvailable) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const booksWithDistance = calculateDistances(data, position);
              const filteredBooks = filterBooks(booksWithDistance);
              const sortedBooks = filteredBooks.sort(
                (a: any, b: any) => a.distance - b.distance
              );
              setBooks(sortedBooks);
            },
            (error) => {
              console.error("Error getting location:", error);
              const filteredBooks = filterBooks(data);
              setBooks(filteredBooks);
            }
          );
        } else {
          const filteredBooks = filterBooks(data);
          setBooks(filteredBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [isLocationAvailable, calculateDistances, selectedGenres]);

  const handleGenreChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Claim book
  const { data: session } = useSession();

  function claimBook(isbn: string) {
    if (!session?.user?.email) {
      console.error("User not logged in");
      return;
    }

    fetch(`/api/books`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkedOutTo: session.user.email,
        isbn,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to claim book");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Book claimed successfully:", data);
        // You might want to update the local state or refetch books here
      })
      .catch((error) => {
        console.error("Error claiming book:", error);
      });
  }

  return (
    <main>
      <div className="search-container">
        <div className="search-bar">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3219361867156b40f47e4282855b0f72e161aeab4826f9fb6d1012a5d255f21c?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
            alt="Search icon"
            className="search-icon"
          />
          <div className="flex">
            <span className="search-text pr-2">Browse Books</span>
            <ul className="flex flex-wrap gap-1.5 genre-selections">
              {genres.map((genre, index) => (
                <li key={index} className="genre-item">
                  <input
                    type="checkbox"
                    id={`genre${index}`}
                    className="hidden"
                    onChange={() => {
                      handleGenreChange(genre);
                      //   if (selectedGenres.includes(genre)) {
                      //     setSelectedGenres(
                      //       selectedGenres.filter((g) => g !== genre)
                      //     );
                      //   } else {
                      //     setSelectedGenres([...selectedGenres, genre]);
                      //   }
                    }}
                    // checked={selectedGenres.includes(genre)}
                  />
                  <label
                    htmlFor={`genre${index}`}
                    className={`inline-block px-4 py-2 rounded-full border border-gray-300 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 ${
                      selectedGenres.includes(genre) ? "bg-gray-200" : ""
                    }`}
                  >
                    {genre}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5">
        {books.map((book) => (
          <article className="book-item w-52 rounded-lg flex flex-col justify-around items-center">
            <div className="book-div rounded-lg overflow-hidden w-44 max-h-64">
              <img
                src={book.image}
                alt="Book cover"
                className=" book-cover rounded-lg overflow-hidden scale-[102%] max-h-44 object-fit"
              />
            </div>
            <div className="book-details w-full">
              <div className="book-info">
                <h3 className="book-title overflow-ellipsis">{book.title}</h3>
                <p className="book-author text-sm opacity-60 overflow-ellipsis">
                  {book.author}

                </p>
                <div className="w-full  flex justify-between items-center">
                  <div className=" flex gap-1 items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M184,72a56,56,0,1,0-64,55.42V232a8,8,0,0,0,16,0V127.42A56.09,56.09,0,0,0,184,72Zm-56,40a40,40,0,1,1,40-40A40,40,0,0,1,128,112Z"></path></svg>                    <span>
                      {book.distance >= 0.1
                        ? book.distance
                        : ".1"}
                      mi
                    </span>
                  </div>
                  <button
                    onClick={() => claimBook(book.isbn)}
                    className="bg-[#6c584c]/80 hover:bg-[#6c584c] p-2 rounded-lg "
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default BooksList;
