import { User } from "./auth.types";

export enum AlarmStatus {
	on = "on",
	off = "off",
}

export interface Alarm {
	user: User;
	time: Date;
	status: AlarmStatus;
}

export interface CreateAlarm {
	user: string;
	time: Date;
}
