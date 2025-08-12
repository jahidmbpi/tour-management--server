import bcryptjs from "bcryptjs";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";

import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as localStratagy } from "passport-local";

passport.use(
  new localStratagy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
          return done(null, false, { message: "user dose not exist" });
        }

        const IsGooleAuthenticated = isUserExist.auths.some(
          (providerObjects) => providerObjects.provider == "google"
        );
        if (IsGooleAuthenticated && !isUserExist.password) {
          return done(null, false, {
            message:
              "you have Authenticated to google login. if you login with credentials then at frist log in with google and set password and gmail and then you can log in with email and password",
          });
        }
        const isPasswordMatch = await bcryptjs.compare(
          password as string,
          isUserExist.password as string
        );

        if (!isPasswordMatch) {
          return done(null, false, { message: "password dose not match" });
        }

        return done(null, isUserExist);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessTocken: string,
      refreshTocken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, {
            massaage: "no email found",
          });
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user);
      } catch (error) {
        console.log(error, "google stratizy error ");
        return done(error);
      }
    }
  )
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user?._id);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
