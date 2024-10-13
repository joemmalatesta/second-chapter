"use client";
import { Book } from "@/models/Book";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { signIn, signOut } from "next-auth/react";
import LoginModal from "../components/loginModal";

export default function ProfilePage() {
	const { status, data: session } = useSession();
	const [checkedOutBooks, setCheckedOutBooks] = useState<Book[]>([]);
	const [listedBooks, setListedBooks] = useState<Book[]>([]);

	useEffect(() => {
        if (status === 'authenticated') {

            
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
        }
	}, [session]);

	return (
		<main>
			<Navbar />
			{status === "authenticated" || status === 'loading' ? (
				<div className="mx-auto w-2/3">
					<h1 className="text-2xl font-bold mb-4">Profile</h1>

					<p>Welcome {session?.user?.name}!</p>
					<img src={session?.user?.image!} alt="" className="rounded-full w-10" />
					<button
						onClick={() => signOut()}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
					>
						Sign Out
					</button>
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
			) : (
				<LoginModal />
			)}
		</main>
	);
}
