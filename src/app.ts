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

	app.get(
		"/",
		(req, res, next) => {
			passport.authenticate(
				"jwt",
				{ session: false },
				(err, _user, info: any) => {
					if (info instanceof Error) {
						res.status(401).send({
							error: { message: info.message },
						});
					} else if (err) {
						res.status(401).send({
							error: { message: "Invalid token" },
						});
					} else {
						next();
					}
				},
			)(req, res, next);
		},
		(req, res) => {
			res.send("Hello world");
		},
	);

	//mapping routes
	modules.forEach((mod) => {
		app.use(mod.route, mod.router);
	});

	return app;
}
