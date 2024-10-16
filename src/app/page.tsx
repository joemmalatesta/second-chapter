"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useState } from "react";
import LoginModal from "./components/loginModal";
import Geolocation from "./components/Geolocation";
import NewBookModal from "./components/NewBookModal";
import Map from "./components/Map";
import "../index.css"; // Import your global CSS here
import Book from "@/models/Book";
import BooksList from "./components/BooksList";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  // const genres: string[] = [
  //   "Children's",
  //   "Fantasy",
  //   "Fiction",
  //   "Historical Fiction",
  //   "Mystery",
  //   "Non-fiction",
  //   "Romance",
  //   "Sci-Fi",
  //   "Thriller",
  // ];

  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);
  // const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const openNewBookModal = () => setIsNewBookModalOpen(true);
  const closeNewBookModal = () => setIsNewBookModalOpen(false);

  return (
    <main>
      <section className="">
        <Navbar />
        <section className="main-content w-full">
          <div className="content-wrapper w-full">
            <aside className="sidebar w-1/3">
              <button
                onClick={openNewBookModal}
                className="w-full mt-4 add-book-btn bg-[#6c584c] text-white py-2 px-4 rounded-md mb-4 hover:bg-[#5a4a3f] transition-colors duration-300"
              >
                Add Book
              </button>
              <NewBookModal
                isOpen={isNewBookModalOpen}
                onClose={closeNewBookModal}
              />

              <Map opacity={isNewBookModalOpen ? 0.6 : 1} />
            </aside>
            <section className="main-section w-2/3">
              {/* <div className="search-container">
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
                              if (selectedGenres.includes(genre)) {
                                setSelectedGenres(
                                  selectedGenres.filter((g) => g !== genre)
                                );
                              } else {
                                setSelectedGenres([...selectedGenres, genre]);
                              }
                            }}
                            checked={selectedGenres.includes(genre)}
                          />
                          <label
                            htmlFor={`genre${index}`}
                            className={`inline-block px-4 py-2 rounded-full border border-gray-300 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 ${
                              selectedGenres.includes(genre)
                                ? "bg-gray-200"
                                : ""
                            }`}
                          >
                            {genre}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}
              <BooksList />
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
