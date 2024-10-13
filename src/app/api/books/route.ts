import { NextRequest, NextResponse } from "next/server";
import Book from "../../../models/Book"; // Adjust the path as necessary
import { mongoConnect } from "@/lib/mongodb";

export async function POST(request: Request) {
  await mongoConnect(); // Connect to the database

  const { isbn, location, bookState, checkedOutTo, ownerId } = await request.json(); // Parse the JSON body
  console.log(isbn)

  const book = new Book({
    isbn,
    location,
    bookState,
    checkedOutTo,
    ownerId,
  });

  try {
    await book.save(); // Save the book to the database
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
