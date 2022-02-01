import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

function connectDb() {
	const mongoUri = process.env.MONGO_URI;
	console.log(mongoUri);

	mongoose
		.connect(mongoUri!)
		.then(() => {
			console.log("Database connected");
		})
		.catch((e) => {
			console.log(e);
		});
}

function main() {
	const app = express();

	app.use(cors());
	app.use(helmet());
	app.use(express.json());

	app.get("/", (_, res) => {
		res.send("Hello world");
	});

	app.listen(5000, () => {
		console.log("Server started");
	});
}

connectDb();
main();
