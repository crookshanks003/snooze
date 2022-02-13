export interface User {
	name: string;
	email?: string;
	googleId: string;
	registered_at: Date;
	provider: string;
}

export interface CreateUser {
	name: string;
	email?: string;
	googleId: string;
	provider: string;
}
