export interface User {
	name: string;
	email?: string;
	googleId: string;
	provider: string;
	registered_at: Date;
}

export interface CreateUser {
	name: string;
	email?: string;
	googleId: string;
	provider: string;
}
