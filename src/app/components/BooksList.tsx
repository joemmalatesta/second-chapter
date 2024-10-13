"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Book } from "@/models/Book";
import L from "leaflet";
import { useSession } from "next-auth/react";

const BooksList: React.FC = () => {
	const [books, setBooks] = useState<any[]>([]);
	const [isLocationAvailable, setIsLocationAvailable] = useState<boolean>(false);

	const calculateDistances = useCallback((booksData: any[], position: GeolocationPosition) => {
		return booksData.map((book) => {
			const currentPosition = L.latLng(position.coords.latitude, position.coords.longitude);
			const bookPosition = L.latLng(book.location.latitude, book.location.longitude);
			const distanceInMeters = currentPosition.distanceTo(bookPosition);
			const distanceInMiles = distanceInMeters / 1609.34; // Convert meters to miles
			const roundedDistance = Math.round(distanceInMiles * 10) / 10; // Round to nearest 10th
			return { ...book, distance: roundedDistance };
		});
	}, []);

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
					setBooks(data);
				}
			} catch (error) {
				console.error("Error fetching books:", error);
			}
		};

		fetchBooks();
	}, [isLocationAvailable, calculateDistances]);


    // Claim book
	function claimBook(isbn: string) {
		const { data: session } = useSession();

		if (!session?.user?.email) {
			console.error("User not logged in");
			return;
		}

		fetch(`/api/books/${isbn}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				checkedOutTo: session.user.email,
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
		<div>
			<h2>Books List</h2>
			<div className="grid grid-cols-4">
				{books.map((book) => (
					<div key={book.isbn} className="w-40">
						<img src={book.image} alt="" className="w-full" />
						<div className="flex items-center justify-between">
							<div className="flex items-center opacity-60">
								<img src="/pin.svg" alt="" className="w-4" />
								<p className="text-sm">{book.distance >= 0.1 ? book.distance : ".1"}mi</p>
							</div>
							<div className="rounded-full w-3 h-3 bg-green-500" />
						</div>
						<button onClick={() => claimBook(book.isbn)} className="text-center p-1 rounded">
							Claim
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default BooksList;
