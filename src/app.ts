import express from "express";
import passport from "passport";
import { AuthModule } from "./modules/auth/auth.module";
import { ModuleType } from "./types/module.type";

export function createApp() {
	const modules: ModuleType<any, any>[] = [AuthModule];
	const app = express();

	app.use(passport.initialize());

	AuthModule.exports.setupGoogleAuth();
	AuthModule.exports.setupJwtAuth();

	app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
		console.log(req.user);
		res.send("Hello world");
	});

	//mapping routes
	modules.forEach((mod) => {
		app.use(mod.route, mod.router);
	});

	return app;
}
