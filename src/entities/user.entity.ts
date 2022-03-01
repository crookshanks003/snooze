import mongoose from "mongoose";
import { User } from "src/types";

const userSchema = new mongoose.Schema<User>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: false,
		unique: true,
	},
	googleId: String,
	provider: String,
	registered_at: {
		type: Date,
		dafault: Date.now,
	},
	image: {
		type: String,
		required: false,
	},
});

export const UserModel = mongoose.model<User>("User", userSchema);
