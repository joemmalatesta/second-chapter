"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Book } from "@/models/Book";
import L from "leaflet";
import { useSession } from "next-auth/react";

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [isLocationAvailable, setIsLocationAvailable] =
    useState<boolean>(false);

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
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();

        if (isLocationAvailable) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const booksWithDistance = calculateDistances(data, position);
              setBooks(booksWithDistance);
            },
            (error) => {
              console.error("Error getting location:", error);
              setBooks(data);
            }
          );
        } else {
          const sortedBooks = data.sort((a: any, b: any) => a.distance - b.distance);
          setBooks(sortedBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [isLocationAvailable, calculateDistances]);

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
        isbn
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
      <div className="grid grid-cols-5">
        {books.map((book) => (
          <article className="book-item w-52 rounded-lg">
            <div className="rounded-lg overflow-hidden w-44 h-64">
            <img src={book.image} alt="Book cover" className=" book-cover rounded-lg overflow-hidden scale-[102%]" />
            </div>
            <div className="book-details">
              <div className="book-info">
                <h3 className="book-title overflow-ellipsis">{book.title}</h3>
                <p className="book-author text-sm opacity-60 overflow-ellipsis">{book.author}</p>
                <div className="w-full  flex justify-between items-center">
                  <div className=" flex gap-1 items-center text-sm">
                    <img src="/pin.svg" alt="" className="distance-icon w-6" />
                    <span>{book.distance >= 0.1 ? book.distance : book ? "..." :".1"}mi</span>
                  </div>
                <button
                  onClick={() => claimBook(book.isbn)}
                  className=" underline"
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
