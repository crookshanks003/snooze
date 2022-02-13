import { UserModel } from "../../entities";
import { CreateUser } from "../../types";

export function findByGoogleId(googleId: string) {
	return UserModel.findOne({ googleId });
}

export function createUser(user: CreateUser) {
	const newUser = new UserModel(user);
	return newUser.save();
}
