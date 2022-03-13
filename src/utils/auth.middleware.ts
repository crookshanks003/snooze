import { RequestHandler } from "express";
import passport from "passport";

export const authMiddleware: RequestHandler = (req, res, next) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(err, user, info: any) => {
			if (info instanceof Error) {
				res.status(401).send({
					error: { message: info.message },
				});
			} else if (err) {
				res.status(401).send(err);
			} else {
				req.user = user;
				next();
			}
		},
	)(req, res, next);
};
