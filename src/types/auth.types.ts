export enum SleepStatus {
	awake = "awake",
	asleep = "asleep",
}

export enum MealTime {
	DINNER = "dinner",
	LUNCH = "lunch",
	BREAKFAST = "breakfast",
	SNACKS = "snacks",
}

export interface User {
	name: string;
	email?: string;
	googleId: string;
	registered_at: Date;
	provider: string;
	image?: string;
	roomNumber: number;
	sleepStatus: SleepStatus;
	mealTime: MealTime[];
}

export interface CreateUser {
	name: string;
	email?: string;
	googleId: string;
	provider: string;
	image?: string;
}
