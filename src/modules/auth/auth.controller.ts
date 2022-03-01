import { Router } from "express";
import passport from "passport";
import { AuthService } from "./auth.service";

export const authRouter = Router();

authRouter.get(
	"/google",
	passport.authenticate("google", {
		session: false,
		scope: ["profile", "email"],
	}),
);

authRouter.get(
	"/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/login",
		failureMessage: true,
		session: false,
	}),
	(req: any, res) => {
		const token = AuthService.getJwtToken(req.user.googleId);
		res.redirect(`http://localhost:3000/callback?token=${token}`);
	},
);
