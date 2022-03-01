import { config } from "../../config";
import jwt from "jsonwebtoken";
import { UserModel } from "../../entities";
import { CreateUser } from "../../types";

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
};
