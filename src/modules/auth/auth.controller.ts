import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { config } from "../../config";

export const authRouter = Router();

authRouter.get(
	"/google",
	passport.authenticate("google", { session: false, scope: ["profile", "email"] }),
);

authRouter.get(
	"/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/login",
		failureMessage: true,
		session: false,
	}),
	(req: any, res) => {
		res.status(200).json({ token: getJwtToken(req.user.googleId) });
	},
);

function getJwtToken(userId: string) {
	return jwt.sign(
		{
			sub: userId,
		},
		config.JWT_SECRET,
	);
}
