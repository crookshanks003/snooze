import { Router, Request } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";
import passport from "passport";
import { SleepStatus, User } from "src/types";
import { authMiddleware } from "../../utils/auth.middleware";
import { AuthGateway } from "./auth.gateway";
import { AuthService } from "./auth.service";

/* ---'/auth'--- */
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

authRouter.get("/profile", authMiddleware, (req, res) => {
	res.send(req.user);
});

authRouter.get("/all", authMiddleware, async (req, res) => {
	const users = await AuthService.getAllUsers();
	res.send(users);
});

authRouter.post("/room", authMiddleware, async (req, res) => {
	const user = await AuthService.changeRoomNumber(
		//@ts-ignore
		req.user.googleId,
		req.body.roomNumber,
	);
	if(!user) {
		return res.status(500).send({error: {message: "something went wrong"}});
	}
	return res.send(user);
});

authRouter.post(
	"/status",
	authMiddleware,
	async (req: Request<{}, {}, { sleepStatus: SleepStatus }>, res) => {
		let user = await AuthService.changeSleepStatus(
			//@ts-ignore
			req.user.googleId,
			req.body.sleepStatus,
		);
		if (!user) {
			return res
				.status(500)
				.send({ error: { message: "Can't change status right now" } });
		}
		AuthGateway.broadcastStatus(req.body.sleepStatus, user.googleId);
		return res.send(user);
	},
);
