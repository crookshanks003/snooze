import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import cookieParser from "cookie-parser";
import { AuthModule } from "./modules/auth/auth.module";
import { ModuleType } from "./types/module.type";
import { authMiddleware } from "./utils/auth.middleware";

export function createApp() {
	const modules: ModuleType<any, any>[] = [AuthModule];
	const app = express();

	app.use(cors({ credentials: true, origin:"http://localhost:3000"}));
	app.use(helmet())
	app.use(cookieParser());
	app.use(express.json());

	app.use(passport.initialize());

	AuthModule.exports.setupGoogleAuth();
	AuthModule.exports.setupJwtAuth();

	app.get(
		"/test",
		authMiddleware,
		(req, res) => {
			console.log(req.user);
			res.send("Hello world");
		},
	);

	//mapping routes
	modules.forEach((mod) => {
		app.use(mod.route, mod.router);
	});

	return app;
}
