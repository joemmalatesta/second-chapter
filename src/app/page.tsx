"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useState } from "react";
import LoginModal from "./components/loginModal";
import Geolocation from "./components/Geolocation";
import NewBookModal from "./components/NewBookModal";
// import Map from "./components/Map";
import "../index.css"; // Import your global CSS here
import Book from "@/models/Book";
import BooksList from "./components/BooksList";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
	const genres: string[] = ["children's", "Fantasy", "Fiction", "Historical Fiction", "Mystery", "Non-fiction", "Romance", "Sci-Fi", "Thriller"];

	const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

	const openNewBookModal = () => setIsNewBookModalOpen(true);
	const closeNewBookModal = () => setIsNewBookModalOpen(false);

	return (
		<main>
			<section className="book-browsing-section">
				<Navbar />
				<section className="main-content w-full">
					<div className="content-wrapper w-full">
						<aside className="sidebar w-1/3">
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
							</div>
						</aside>
						<section className="main-section w-2/3">
							<div className="search-container">
								<div className="search-bar">
									<img
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/3219361867156b40f47e4282855b0f72e161aeab4826f9fb6d1012a5d255f21c?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
										alt="Search icon"
										className="search-icon"
									/>
									<div className="flex">
										<span className="search-text">Browse Books...</span>
										<ul className="flex flex-wrap gap-1.5">
											{genres.map((genre, index) => (
												<li key={index} className="genre-item">
													<input
														type="checkbox"
														id={`genre${index}`}
														className="hidden"
														onChange={() => {
															if (selectedGenres.includes(genre)) {
																setSelectedGenres(selectedGenres.filter((g) => g !== genre));
															} else {
																setSelectedGenres([...selectedGenres, genre]);
															}
														}}
														checked={selectedGenres.includes(genre)}
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
							<BooksList />
						</section>
					</div>
				</section>
			</section>
		</main>
	);
}
