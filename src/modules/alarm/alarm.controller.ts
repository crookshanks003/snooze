import { Router, Request } from "express";
import { CreateAlarm } from "../../types";
import { authMiddleware } from "../../utils/auth.middleware";
import { AlarmService } from "./alarm.service";

export const alarmRouter = Router();

alarmRouter.get("/all", authMiddleware, async (_req, res) => {
	const alarms = await AlarmService.getAll();
	res.send(alarms);
});

alarmRouter.get("/active", authMiddleware, async (_req, res) => {
	const activeAlarms = await AlarmService.getActive();
	return res.send(activeAlarms);
});

alarmRouter.post("/", authMiddleware, async (req: Request<any, any, { time: Date }>, res) => {
	//@ts-ignore
	const alarm: CreateAlarm = { time: req.body.time, user: req.user.googleId };
	const newAlarm = await AlarmService.createAlarm(alarm);
	return res.send(newAlarm);
});
