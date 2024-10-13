import mongoose, { model, Schema } from "mongoose";

export interface UserDocument {
	_id: string;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
	{
		email: {
			type: String,
			unique: true,
			required: [true, "Email is required"],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"],
		},
		name: {
			type: String,
			required: [true, "Name is required"],
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
export default User;
