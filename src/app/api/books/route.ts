import { NextRequest, NextResponse } from "next/server";
import Book from "@/models/Book"; // Adjust the path as necessary
import { mongoConnect } from "@/lib/mongodb";

export async function POST(request: Request) {
  await mongoConnect(); // Connect to the database

  const { isbn, location, bookState, checkedOutTo, ownerId, author, genre, title, image  } = await request.json(); // Parse the JSON body
  console.log(location, image)

  const book = new Book({
    isbn,
    location,
    bookState,
    author,
    image,
    genre,
    title,
    checkedOutTo,
    ownerId,
  });

  try {
    await book.save(); // Save the book to the database\
    console.log("Saved!!")
    return NextResponse.json({ done: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving book:", error);
    return NextResponse.json(
      { error: "Failed to save book." },
      { status: 500 }
    );
  }
}


export async function GET() {
  await mongoConnect(); // Connect to the database

  try {
    const books = await Book.find({}); // Fetch all books
    // Filter out books without an image
    const booksWithImages = books.filter(book => book.image && book.image.trim() !== '');
    return NextResponse.json(booksWithImages, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books." },
      { status: 500 }
    );
  }
}
