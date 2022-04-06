import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import cookieParser from "cookie-parser";
import { AuthModule } from "./modules/auth/auth.module";
import { ModuleType } from "./types/module.type";
import bodyParser from "body-parser";
import { AlarmModule } from "./modules/alarm/alarm.module";

export function createApp() {
	const modules: ModuleType<any, any>[] = [AuthModule, AlarmModule];
	const app = express();

	app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
	app.use(helmet());
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(express.json());

	app.use(passport.initialize());

	AuthModule.exports!.setupGoogleAuth();
	AuthModule.exports!.setupJwtAuth();

	app.get(
		"/test",
		// authMiddleware,
		(_req, res) => {
			res.send("Hello world");
		},
	);

	//mapping routes
	modules.forEach((mod) => {
		app.use(mod.route, mod.router);
	});

	return app;
}
