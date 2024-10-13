import mongoose, { Document, Schema } from "mongoose";

export interface Book{
  isbn: string;
  location: Object;
  bookState: string;
  title: string;
  author: string;
  image: string;
  genre: string[];
  checkedOutTo: string;
  ownerId: mongoose.Types.ObjectId;
}

const BookSchema: Schema = new Schema(
  {
    isbn: { type: String, required: true, unique: true },
    location: { type: Object, required: true },
    bookState: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: [String], required: true },
    image: {type: String, required: true},
    checkedOutTo: { type: String, required: false },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model<Book>("Book", BookSchema);
