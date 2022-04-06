import mongoose from "mongoose";
import { checkConfig, config } from "./config";
import { createApp } from "./app";
import { createServer } from "http";
import { AuthModule } from "./modules/auth/auth.module";

function connectDb() {
	checkConfig();
	const mongoUri = config.MONGO_URI;

	mongoose
		.connect(mongoUri)
		.then(() => {
			console.log("Database connected");
		})
		.catch((e) => {
			console.log(e);
		});
}

function main() {
	const app = createApp();

	const server = createServer(app);
	AuthModule.exports!.AuthGateway.createServer(server);

	server.listen(5000, () => {
		console.log("Server started at port 5000");
	});
}

connectDb();
main();
