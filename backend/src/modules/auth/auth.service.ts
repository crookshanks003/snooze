import { UserModel } from "src/entities";
import { CreateUser } from "src/types";

export function findByGoogleId(googleId: string) {
	return UserModel.findOne({ googleId });
}

export function createUser(user:CreateUser) {
	const newUser = new UserModel(user);
	return newUser.save();
}
