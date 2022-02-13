import { setupGoogleAuth } from "./google.strategy";
import { setupJwtAuth } from "./jwt.strategy";
import { authRouter } from "./auth.controller";

export const AuthModule = {
	setupGoogleAuth,
	setupJwtAuth,
	authRouter,
};
