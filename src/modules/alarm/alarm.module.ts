import { ModuleType } from "../../types";
import { alarmRouter } from "./alarm.controller";
import { AlarmService } from "./alarm.service";

export const AlarmModule: ModuleType<any, any> = {
	route: "/alarm",
	router: alarmRouter,
	service: AlarmService,
};
