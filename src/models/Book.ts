import mongoose, { Document, Schema } from "mongoose";

interface Book extends Document {
  isbn: string;
  location: Object;
  bookState: string;
  checkedOutTo: string;
  ownerId: mongoose.Types.ObjectId;
}

const BookSchema: Schema = new Schema(
  {
    isbn: { type: String, required: true, unique: true },
    location: { type: Object, required: true },
    bookState: { type: String, required: true },
    checkedOutTo: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model<Book>("Book", BookSchema);
