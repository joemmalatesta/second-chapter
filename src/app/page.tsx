"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useEffect, useState } from "react";
import LoginModal from "./components/loginModal";
import Geolocation from "./components/Geolocation";
import NewBookModal from "./components/NewBookModal";
import BooksList from "./components/BooksList";
import Link from "next/link";

export default function Home() {
	const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);

	const openNewBookModal = () => setIsNewBookModalOpen(true);
	const closeNewBookModal = () => setIsNewBookModalOpen(false);

	return (
		<main>
			{/* <LoginModal />
      <Geolocation /> */}
			<Link href="/profile" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
				View Profile
			</Link>
			<button onClick={openNewBookModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Add New Book
			</button>
			<NewBookModal isOpen={isNewBookModalOpen} onClose={closeNewBookModal} />
			<BooksList />
		</main>
	);
}
