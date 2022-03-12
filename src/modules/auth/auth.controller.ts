import { Router, Request } from "express";
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
		failureRedirect: "http://localhost:3000",
		session: false,
	}),
	(req: any, res) => {
		const token = AuthService.getJwtToken(req.user.googleId);
		res.cookie("jwt", token, {
			httpOnly: true,
			expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
			// secure: false,
		});
		res.redirect(302, "http://localhost:3000/");
	},
);

// authRouter.get("/profile", (req, res) => {

// })
