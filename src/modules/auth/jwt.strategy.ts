import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { config } from "../../config";
// import { findByGoogleId } from "./auth.service";

export function setupJwtAuth() {
	const jwtOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
		secretOrKey: config.JWT_SECRET,
	};

	passport.use(
		new JWTStrategy(jwtOptions, (payload, done) => {
			return done(null, payload.sub, payload);
		}),
	);
}
