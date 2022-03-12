import passport from "passport";
import {
	JwtFromRequestFunction,
	Strategy as JWTStrategy,
	StrategyOptions,
} from "passport-jwt";
import { config } from "../../config";

const jwtFromCookie: JwtFromRequestFunction = (req) => {
	let token: string | null = null;
	let cookies: { [key: string]: string } = {};
	if (req.headers.cookie) {
		req.headers.cookie.split(";").forEach((cookie) => {
			const [name, value] = cookie.split("=");
			cookies[name] = value;
		});
		token = cookies["jwt"];
	}
	return token;
};

export function setupJwtAuth() {
	const jwtOptions: StrategyOptions = {
		jwtFromRequest: jwtFromCookie,
		secretOrKey: config.JWT_SECRET,
	};

	passport.use(
		new JWTStrategy(jwtOptions, (payload, done) => {
			if (!payload.sub) {
				done({ error: "Invalid token" });
			}
			return done(null, payload.sub, payload);
		}),
	);
}
