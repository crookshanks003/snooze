import passport  from "passport";
import {
	JwtFromRequestFunction,
	Strategy as JWTStrategy,
	StrategyOptions,
} from "passport-jwt";
import { config } from "../../config";
import { AuthService } from "./auth.service";

const jwtFromCookie: JwtFromRequestFunction = (req) => {
	let token: string | null = null;
	if(req && req.cookies) {
		token = req.cookies["jwt"];
	}
	return token;
};

export function setupJwtAuth() {
	const jwtOptions: StrategyOptions = {
		jwtFromRequest: jwtFromCookie,
		secretOrKey: config.JWT_SECRET,
	};

	passport.use(
		new JWTStrategy(jwtOptions, async (payload, done) => {
			if (!payload.sub) {
				done({ error: "Invalid token" });
			}
			const user = await AuthService.findByGoogleId(payload.sub);
			if (!user){
				return done({error: {message: "Invalid user token"}});
			}
			return done(null, user, payload);
		}),
	);
}
