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
            {status === "authenticated" || status === "loading" ? (
				<div className=" full-height px-80">
					<h1 className="text-3xl font-bold mb-4">Profile</h1>
                    <div className="flex items-center space-x-4 mt-6">
   					 <img src={session?.user?.image!} alt="" className="rounded-full w-10" />
  					  <p>Welcome {session?.user?.name}!</p>
					</div>
                    <button
                        onClick={() => signOut()}
                        className="bg-[#A98467] hover:bg-[#8B4513] text-[#FFFFFF] font-bold py-2 px-4 rounded mt-4"
                    >
                        Sign Out
                    </button>

					<div className="mb-6"></div>

                    {/* Listed Books */}
                    <h2 className="profile-subtitle">Listed Books</h2>
                    <div className="grid grid-cols-4">
                        {listedBooks.map((book) => (
                            <div key={book.isbn} className="w-40">
                                <img src={book.image} alt="" className="w-full" />
                            </div>
                        ))}
                    </div>

                    {/* Claimed Books */}
                    <h3 className="profile-subtitle mt-10">Claimed Books</h3>
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