import * as dotenv from "dotenv";

dotenv.config();

export const config = {
	MONGO_USERNAME: process.env.MONGO_USERNAME!,
	MONGO_PASSWORD: process.env.MONGO_PASSWORD!,
	MONGO_URI: process.env.MONGO_URI!,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
	JWT_SECRET: process.env.JWT_SECRET!,
};

export function checkConfig() {
	if (
		!config.JWT_SECRET ||
		!config.MONGO_URI ||
		!config.GOOGLE_CLIENT_SECRET ||
		!config.GOOGLE_CLIENT_ID
	) {
		throw new Error("Config is either missing or incomplete");
	}
	return true;
}
