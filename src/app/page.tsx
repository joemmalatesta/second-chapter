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
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);

  const openNewBookModal = () => setIsNewBookModalOpen(true);
  const closeNewBookModal = () => setIsNewBookModalOpen(false);

  return (
    <main>
      <section className="book-browsing-section">
       <Navbar />
        <section className="main-content">
          <div className="content-wrapper">
            <aside className="sidebar">
              <div className="filter-box">
                <h3 className="filter-title">Location</h3>
                <div className="filter-option">
                  <input type="checkbox" id="filter1"></input>
                  <label htmlFor="filter1">&lt; 5 mi</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="filter2"></input>
                  <label htmlFor="filter2">10 mi</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="filter3"></input>
                  <label htmlFor="filter3">25 mi</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="filter4"></input>
                  <label htmlFor="filter4">50 mi</label>
                </div>
                <div className="genre-filter">
                  <div className="genre-header">
                    <h3 className="genre-title">Genre</h3>
                  </div>
                  <ul className="genre-list">
                    <li className="genre-item">
                      <input type="checkbox" id="genre1"></input>
                      <label htmlFor="genre1">Children's</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre2"></input>
                      <label htmlFor="genre2">Fantasy</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre3"></input>
                      <label htmlFor="genre3">Fiction</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre4"></input>
                      <label htmlFor="genre4">Historical Fiction</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre5"></input>
                      <label htmlFor="genre5">Mystery</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre6"></input>
                      <label htmlFor="genre6">Non-Fiction</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre7"></input>
                      <label htmlFor="genre7">Romance</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre8"></input>
                      <label htmlFor="genre8">Sci-Fi</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre9"></input>
                      <label htmlFor="genre9">Thriller</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="map">
                <Map />
              </div>
            </aside>
            <section className="main-section">
              <div className="search-container">
                <div className="search-bar">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3219361867156b40f47e4282855b0f72e161aeab4826f9fb6d1012a5d255f21c?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
                    alt="Search icon"
                    className="search-icon"
                  />
                  <span className="search-text">Browse Books...</span>
                </div>
              </div>

              <div className="book-grid">
                <div className="book-row">
                  <div className="book-row-content">
                    <div className="book-column">
                      <BooksList />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
