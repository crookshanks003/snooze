import mongoose from "mongoose";
import { Alarm, AlarmStatus } from "../types/alarm.type";

const alarmSchema = new mongoose.Schema<Alarm>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	time: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: AlarmStatus,
		default: AlarmStatus.on,
	},
});

export const AlarmModel = mongoose.model<Alarm>("Alarm", alarmSchema);
