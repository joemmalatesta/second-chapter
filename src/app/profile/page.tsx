"use client";
import { Book } from "@/models/Book";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { signIn, signOut } from "next-auth/react";
import LoginModal from "../components/loginModal";
import "../../index.css";

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
    }, [session, status]);

    return (
		<main>
			<Navbar />
			{status === "authenticated" || status === 'loading' ? (
				<div className="px-80 bg-[#f0ead2] py-5">
                    <div className="flex gap-5 my-8 items-center">

					<h1 className="text-2xl font-bold">{session?.user?.name}'s Second Chapter</h1>
					<button
						onClick={() => signOut()}
						className="bg-[#6c584c]/70 hover:bg-[#6c584c]/80 text-white font-bold py-2 px-4 rounded "
                        >
						Sign Out
					</button>
                        </div>
					<h3 className="font-semibold text-2xl py-2 underline underline-offset-2">Listed</h3>
					<div className="grid grid-cols-4 gap-2 gap-y-10">
						{listedBooks.map((book) => (
							<div key={book.isbn} className="w-40 h-60">
								<img src={book.image} alt="" className="w-full object-cover rounded-lg" />
							</div>
						))}
					</div>
					<h3 className="mt-10 text-2xl font-bold underline underline-offset-2 py-2">Claimed</h3>
					<div className="grid grid-cols-4 gap-2 gap-y-10">
						{checkedOutBooks.map((book) => (
							<div key={book.isbn} className="w-40">
								<img src={book.image} alt="" className="w-full rounded-lg" />
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