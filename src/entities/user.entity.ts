import mongoose from "mongoose";
import { MealTime, SleepStatus, User } from "../types";

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
	roomNumber: {
		type: Number,
		default: 0,
	},
	sleepStatus: {
		type: String,
		enum: SleepStatus,
		default: SleepStatus.awake,
	},
	mealTime: {
		type: [String],
		enum: MealTime,
		default: [MealTime.SNACKS],
	},
});

export const UserModel = mongoose.model<User>("User", userSchema);
