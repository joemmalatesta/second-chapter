import { NextRequest, NextResponse } from "next/server";
import Book from "@/models/Book"; // Adjust the path as necessary
import { mongoConnect } from "@/lib/mongodb";

export async function POST(request: Request) {
  await mongoConnect(); // Connect to the database

  const { isbn, location, bookState, ownerId, author, genre, title, image } =
    await request.json(); // Parse the JSON body

  const book = new Book({
    isbn,
    location,
    bookState,
    author,
    image,
    genre,
    title,
    ownerId,
  });

  try {
    await book.save(); // Save the book to the database\
    console.log("Saved!!");
    return NextResponse.json({ done: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving book:", error);
    return NextResponse.json(
      { error: "Failed to save book." },
      { status: 500 }
    );
  }
}

// Get all books, or just some if param is passed.
export async function GET(request: NextRequest) {
  await mongoConnect(); // Connect to the database

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    let query = {};
    if (userId) {
      query = { ownerId: userId };
    }

    const books = await Book.find(query); // Fetch books based on query
    // Filter out books without an image
    const booksWithImages = books.filter(
      (book) => book.image && book.image.trim() !== ""
    );
    return NextResponse.json(booksWithImages, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await mongoConnect(); // Connect to the database

  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get("isbn");

  if (!isbn) {
    return NextResponse.json({ error: "ISBN is required." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { checkedOutTo } = body;

    if (!checkedOutTo) {
      return NextResponse.json(
        { error: "checkedOutTo is required in the request body." },
        { status: 400 }
      );
    }

    const updatedBook = await Book.findOneAndUpdate(
      { isbn: isbn },
      { checkedOutTo: checkedOutTo },
      { new: true }
    );

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book." },
      { status: 500 }
    );
  }
}
