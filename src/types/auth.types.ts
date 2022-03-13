export enum SleepStatus {
	awake="awake",
	asleep="asleep",
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
}

export interface CreateUser {
	name: string;
	email?: string;
	googleId: string;
	provider: string;
	image?: string;
}
