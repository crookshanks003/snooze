import { setupJwtAuth } from "./jwt.strategy";
import { authRouter } from "./auth.controller";
import { ModuleType } from "../../types/module.type";
import { AuthService } from "./auth.service";
import { setupGoogleAuth } from "./google.strategy";

interface Exports {
	setupJwtAuth: () => void;
	setupGoogleAuth: () => void;
}

export const AuthModule: ModuleType<Exports, typeof AuthService> = {
	route: "/auth",
	router: authRouter,
	service: AuthService,
	exports: {
		setupGoogleAuth,
		setupJwtAuth,
	},
};
