import { AlarmModel } from "../../entities/alarm.entity";
import { AlarmStatus, CreateAlarm } from "../../types/alarm.type";

export const AlarmService = {
	getAll() {
		return AlarmModel.find();
	},

	getActive() {
		return AlarmModel.find({ status: AlarmStatus.on });
	},

	createAlarm(alarm: CreateAlarm) {
		const newAlarm = new AlarmModel(alarm);
		return newAlarm.save();
	},
};
