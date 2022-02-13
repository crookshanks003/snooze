import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { checkConfig } from "./config";
import passport from "passport";

import { AuthModule } from "./modules/auth/auth.module";

dotenv.config();

function connectDb() {
	const mongoUri = process.env.MONGO_URI;

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
	app.use(passport.initialize());

	checkConfig();

	AuthModule.setupJwtAuth();
	AuthModule.setupGoogleAuth();

	app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
		console.log(req.user);
		res.send("Hello world");
	});

	app.use("/login", AuthModule.authRouter);

	app.listen(5000, () => {
		console.log("Server started");
	});
}

connectDb();
main();
