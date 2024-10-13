import { NextRequest, NextResponse } from "next/server";
import Book from "../../../models/Book"; // Adjust the path as necessary
import { mongoConnect } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await mongoConnect(); // Connect to the database

  const { isbn, location, bookState, checkedOutTo, ownerId } = await req.json(); // Parse the JSON body

  const book = new Book({
    isbn,
    location,
    bookState,
    checkedOutTo,
    ownerId,
  });

  try {
    await book.save(); // Save the book to the database
    console.log(
      "Book saved:",
      isbn,
      location,
      bookState,
      checkedOutTo,
      ownerId
    );
    return NextResponse.json({ done: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving book:", error);
    return NextResponse.json(
      { error: "Failed to save book." },
      { status: 500 }
    );
  }
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import Book from "../../../models/Book"; // Ensure the path is correct
// import dbConnect from "../../../lib/dbConnect";

// interface BookData {
//   isbn: string;
//   location: string;
//   bookState: string;
//   checkedOutTo: string;
//   ownerId: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     console.log("Received a POST request to /api/books");

//     await sendBooks(req, res);
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// const sendBooks = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   const { isbn, location, bookState, checkedOutTo, ownerId }: BookData =
//     req.body;

//   const book = new Book({
//     isbn,
//     location,
//     bookState,
//     checkedOutTo,
//     ownerId,
//   });

//   try {
//     await book.save();
//     console.log("inside api", isbn, location, bookState, checkedOutTo, ownerId);
//     res.status(200).json({ done: true });
//   } catch (error) {
//     console.error("Error saving book:", error);
//     res.status(500).json({ error: "Failed to save book." });
//   }
// };
