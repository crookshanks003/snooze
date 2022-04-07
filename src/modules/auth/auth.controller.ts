import { Router, Request } from "express";
import passport from "passport";
import { config } from "../../config";
import { MealTime, SleepStatus } from "../../types";
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
		failureRedirect: config.CLIENT_URL,
		session: false,
	}),
	//TODO: make auth better?
	(req: any, res) => {
		const token = AuthService.getJwtToken(req.user.googleId);
		res.redirect(302, `${config.CLIENT_URL}/callback?token=${token}`);
	},
);

authRouter.get("/profile", authMiddleware, (req, res) => {
	res.send(req.user);
});

authRouter.get("/all", authMiddleware, async (_req, res) => {
	const users = await AuthService.getAllUsers();
	res.send(users);
});

authRouter.post("/room", authMiddleware, async (req, res) => {
	const user = await AuthService.changeRoomNumber(
		//@ts-ignore
		req.user.googleId,
		req.body.roomNumber,
	);
	if (!user) {
		return res.status(500).send({ error: { message: "something went wrong" } });
	}
	return res.send(user);
});

authRouter.post(
	"/sleep-status",
	authMiddleware,
	async (req: Request<any, any, { sleepStatus: SleepStatus }>, res) => {
		const user = await AuthService.changeSleepStatus(
			//@ts-ignore
			req.user.googleId,
			req.body.sleepStatus,
		);
		if (!user) {
			return res.status(500).send({ error: { message: "Can't change status right now" } });
		}
		AuthGateway.broadcastStatus(req.body.sleepStatus, user.googleId);
		return res.send(user);
	},
);

authRouter.post(
	"/meal-time",
	authMiddleware,
	async (req: Request<any, any, { mealTime: MealTime[] }>, res) => {
		const user = await AuthService.changeMealTime(
			//@ts-ignore
			req.user.googleId,
			req.body.mealTime,
		);
		res.send(user);
	},
);
