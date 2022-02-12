import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import { createUser, findByGoogleId } from "./auth.service";

dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: "http://localhost:5000/auth/callback",
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
		}
	)
);
