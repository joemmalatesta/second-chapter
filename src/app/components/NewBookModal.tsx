"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//LOCATION
interface GeolocationData {
	latitude: number;
	longitude: number;
	accuracy: number;
}

//BOOK API
interface BookDetails {
	fetchedTitle: string;
	author: string;
	genre: string;
	thumbnail: string | null;
	identifier: string;
}

interface NewBookModalProps {
	isOpen: boolean;
	onClose: () => void;
}

let NewBookModal = ({ isOpen, onClose }: NewBookModalProps) => {
	const {data: session} = useSession()
	let [location, setLocation] = useState<GeolocationData | null>(null);
	let [error, setError] = useState<string | null>(null);

    // GET CURRENT LOCATION
	useEffect(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
				});
			},
			(error) => {
				setError(`Error: ${error.message}`);
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			}
		);
	}, []);

	let [bookTitle, setBookTitle] = useState("");
	let [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

	let bookState = "new";
	let ownerId = "";


    // Get book details from google books api
	let fetchBookDetails = async (title: string) => {
		let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=${process.env.NEXT_PUBLIC_BOOKS_KEY}`);
		let data = await response.json();
		return data.items[0] ? data.items[0] : null;
	};


    // Handle search clicked from input
	let handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent the default form submission behavior
		try {
			let fetchedBook = await fetchBookDetails(bookTitle); //fetch book details using title
			if (!fetchedBook) {
				console.error("Book not found");
				return;
			}
			setBookDetails({
				fetchedTitle: fetchedBook.volumeInfo.title,
				identifier: fetchedBook['volumeInfo']['industryIdentifiers'][0]['identifier'],
				author: fetchedBook.volumeInfo.authors ? fetchedBook.volumeInfo.authors.join(", ") : "Unknown",
				genre: fetchedBook.volumeInfo.categories ? fetchedBook.volumeInfo.categories.join(", ") : "Unknown",
				thumbnail: fetchedBook.volumeInfo.imageLinks ? fetchedBook.volumeInfo.imageLinks.thumbnail : null
			});
            console.log(bookDetails?.genre)
		} catch (error) {
			console.error("problem", error);
		}
	};



	let listBook = async () => {
		if (!bookDetails) {
			console.log("No book details to save.");
			return;
		}
        console.log(bookDetails.fetchedTitle)
		let response = await fetch("/api/books", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				isbn: bookDetails.identifier,
                author: bookDetails.author,
                genre: bookDetails.genre,
                title: bookDetails.fetchedTitle,
                image: bookDetails.thumbnail,
				location,
				bookState,
                ownerId: session?.user?.email,
			}),
		});
	};

	if (!isOpen) return null;

	return (
		<div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-3">

				<h2 className="text-2xl font-bold">Add New Book</h2>
                <button onClick={onClose} className="rounded-md bg-[#6c584c]/60 hover:bg-[#6c584c]/90 text-white p-2">
						Close
					</button>
                </div>
				<form className="flex" onSubmit={handleSearch}>
					<label></label>
					<input type="text" className="border border-black/80 rounded-l-md p-2 focus:outline-none" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)}></input>
					<button className="p-2 rounded-r-md bg-[#6c584c] text-white" type="submit">Search</button>
				</form>

				{bookDetails && (
					<div>
						<h2>Book Title: {bookDetails.fetchedTitle}</h2>
						<h3>Author: {bookDetails.author}</h3>
						<h4>Genre: {bookDetails.genre}</h4>
						{bookDetails.thumbnail && <Image src={bookDetails.thumbnail} alt={bookDetails.fetchedTitle} width={150} height={225} />}
					</div>
				)}
				<div className="flex justify-between mt-4">
					<button onClick={listBook} className={`${bookDetails ? "block" : "opacity-0 pointer-events-none "} rounded-md bg-[#6c584c] text-white px-4 py-2`}>
						List Book
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewBookModal;
