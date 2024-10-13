"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useState } from "react";
import LoginModal from "./components/loginModal";
import Geolocation from "./components/Geolocation";
import NewBookModal from "./components/NewBookModal";
import Map from "./components/Map";
import "../index.css"; // Import your global CSS here

export default function Home() {
  return (
    <main>
      {/* <LoginModal /> */}
      {/* <Geolocation />
      <NewBookModal /> */}
      {/* <Map /> */}
      <section className="book-browsing-section">
        <header className="hero-banner">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8da7602e0a9f61aee3ad032dcfbb783d74d5a4f4f62f3589f503e89ef8e40b1?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
            alt=""
            className="hero-background"
          />
          <div className="header-content">
            <div className="logo-container">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/082f1e6041eba8b410214d2f6e149632ad3ad0259b10608f262f5c39023080d8?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
                alt="Second Chapter Logo"
                className="logo-image"
              />
              <div className="brand-name">
                <span className="brand-first">Second</span>
                <span className="brand-last">Chapter</span>
              </div>
            </div>
            <div className="user-login">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1263ea886cd98ba376e1c06e00bee9eb98f97b7180e5df62354871b6413ca1fc?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
                alt="User icon"
                className="user-icon"
              />
              <a href="">
                <span className="login-text">Login</span>
              </a>
            </div>
          </div>
          <div className="mission-statement">
            <h2 className="mission-title">OUR CAUSES</h2>
            <p className="mission-text">
              At Second Chapter, our mission is to give books a new life and
              foster a community of readers who share a passion for
              sustainability. We aim to reduce waste by rescuing books that
              would otherwise end up in landfills, offering them for free to
              individuals eager to expand their libraries. By reusing and
              recycling books, we not only promote environmental responsibility
              but also make literature accessible to everyone.
            </p>
          </div>
        </header>
        <section className="main-content">
          <div className="content-wrapper">
            <aside className="sidebar">
              <div className="filter-box">
                <h3 className="filter-title">Location</h3>
                <div className="filter-option">
                  <input type="checkbox" id="filter1"></input>
                  <label for="filter1">&lt; 5 mi</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="filter2"></input>
                  <label for="filter2">10 mi</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="filter3"></input>
                  <label for="filter3">25 mi</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="filter4"></input>
                  <label for="filter4">50 mi</label>
                </div>
                <div className="genre-filter">
                  <div className="genre-header">
                    <h3 className="genre-title">Genre</h3>
                  </div>
                  <ul className="genre-list">
                    <li className="genre-item">
                      <input type="checkbox" id="genre1"></input>
                      <label for="genre1">Children's</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre2"></input>
                      <label for="genre2">Fantasy</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre3"></input>
                      <label for="genre3">Fiction</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre4"></input>
                      <label for="genre4">Historical Fiction</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre5"></input>
                      <label for="genre5">Mystery</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre6"></input>
                      <label for="genre6">Non-Fiction</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre7"></input>
                      <label for="genre7">Romance</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre8"></input>
                      <label for="genre8">Sci-Fi</label>
                    </li>
                    <li className="genre-item">
                      <input type="checkbox" id="genre9"></input>
                      <label for="genre9">Thriller</label>
                    </li>
                  </ul>
                </div>
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
                  <span className="search-text">Browse for books...</span>
                </div>
              </div>

              <div className="book-grid">
                <div className="book-row">
                  <div className="book-row-content">
                    <div className="book-column">
                      <article className="book-item">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae658c32c35c53b03e4dfffd5145408e1f6eefcee590f557c4edac1036f64d38?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
                          alt="Book cover"
                          className="book-cover"
                        />
                        <div className="book-details">
                          <div className="book-info">
                            <h3 className="book-title">Book Title</h3>
                            <p className="book-author">Author</p>
                            <div className="book-distance">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7d268b437a1c2bda78e28aada5b4ccf3ccb5312157768db23ed228ae18b4e32?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
                                alt=""
                                className="distance-icon"
                              />
                              <span>mi</span>
                            </div>
                          </div>
                          <button className="claim-button">
                            <span className="claim-text">Claim</span>
                          </button>
                        </div>
                      </article>
                    </div>
                    <div className="book-column">
                      <article className="book-item">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a94b70960ba75d4d8f011720429f464e8608c2a814be00320826313437d982a?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
                          alt="Book cover"
                          className="book-cover"
                        />
                        <div className="book-details">
                          <div className="book-info">
                            <h3 className="book-title">Book Title</h3>
                            <p className="book-author">Author</p>
                            <div className="book-distance">
                              <div className="book-distance">
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7d268b437a1c2bda78e28aada5b4ccf3ccb5312157768db23ed228ae18b4e32?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
                                  alt=""
                                  className="distance-icon"
                                />
                                <span>mi</span>
                              </div>
                            </div>
                            <button className="claim-button">
                              <span className="claim-text">Claim</span>
                            </button>
                          </div>
                        </div>
                      </article>
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
