"use client";
import { Book } from "@/models/Book";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ProfilePage() {
	const { status, data: session } = useSession();
	const [checkedOutBooks, setCheckedOutBooks] = useState<Book[]>([]);
	const [listedBooks, setListedBooks] = useState<Book[]>([]);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch("/api/books");
				if (!response.ok) {
					throw new Error("Failed to fetch books");
				}
				const data = await response.json();
				const userEmail = session?.user?.email;
				if (userEmail) {
					const listedBooks = data.filter((book: Book) => book.ownerId === userEmail);
					const checkedOutBooks = data.filter((book: Book) => book.checkedOutTo === userEmail);
					setListedBooks(listedBooks);
					setCheckedOutBooks(checkedOutBooks);
				}
			} catch (error) {
				console.error("Error fetching books:", error);
			}
		};

		fetchBooks();
	}, [session]);

	return (
		<div className="container mx-auto p-4">
            <Link href={"/"}>home</Link>
			<h1 className="text-2xl font-bold mb-4">Profile</h1>
			<p>Welcome {session?.user?.name}!</p>
			<img src={session?.user?.image!} alt="" className="rounded-full" />
			<h3 className="font-medium">Listed Books</h3>
			<div className="grid grid-cols-4">
				{listedBooks.map((book) => (
					<div key={book.isbn} className="w-40">
						<img src={book.image} alt="" className="w-full" />
					</div>
				))}
			</div>
			<h3 className="font-medium mt-10">Claimed Books</h3>
			<div className="grid grid-cols-4">
				{checkedOutBooks.map((book) => (
					<div key={book.isbn} className="w-40">
						<img src={book.image} alt="" className="w-full" />
					</div>
				))}
			</div>
		</div>
	);
}
