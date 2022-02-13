import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../../config";
import { createUser, findByGoogleId } from "./auth.service";

export function setupGoogleAuth() {
	passport.use(
		new GoogleStrategy(
			{
				clientID: config.GOOGLE_CLIENT_ID,
				clientSecret: config.GOOGLE_CLIENT_SECRET,
				callbackURL: "/login/callback",
			},
			async (_accessToken, _refreshToken, profile, cb) => {
				try {
					const existingUser = await findByGoogleId(profile.id);
					if (!existingUser) {
						let email: string | undefined = undefined;
						if (profile.emails && profile.emails.length > 0) {
							email = profile.emails[0].value;
						}
						const newUser = await createUser({
							name: profile.displayName,
							email,
							googleId: profile.id,
							provider: profile.provider,
						});
						return cb(null, newUser);
					}
					return cb(null, existingUser);
				} catch (e) {
					console.log(e);
				}
			},
		),
	);
}
