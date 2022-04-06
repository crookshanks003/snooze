import { config } from "../../config";
import jwt from "jsonwebtoken";
import { UserModel } from "../../entities";
import { CreateUser, MealTime, SleepStatus } from "../../types";

export const AuthService = {
	findByGoogleId(googleId: string) {
		return UserModel.findOne({ googleId });
	},

	createUser(user: CreateUser) {
		const newUser = new UserModel(user);
		return newUser.save();
	},

	getJwtToken(userId: string) {
		return jwt.sign(
			{
				sub: userId,
			},
			config.JWT_SECRET,
		);
	},

	getAllUsers() {
		return UserModel.find({}).sort({ roomNumber: 1 });
	},

	changeSleepStatus(googleId: string, sleepStatus: SleepStatus) {
		return UserModel.findOneAndUpdate({ googleId }, { sleepStatus });
	},

	changeRoomNumber: (googleId: string, roomNumber: number) => {
		return UserModel.findOneAndUpdate({ googleId }, { roomNumber });
	},

	changeMealTime(googleId: string, mealTime: MealTime[]) {
		return UserModel.findOneAndUpdate({ googleId }, { mealTime });
	},
};
