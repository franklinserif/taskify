/**
 * It contains all google strategry
 * @module utils/strategies/google
 */

import gStrategy from "passport-google-oauth20";
import config from "../../../config";
import Service from "../../../services/user.service";

const service = new Service();

const GoogleStrategy = gStrategy.Strategy;

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.googleClientId as string,
    clientSecret: config.googleClientSecret as string,
    callbackURL: "http://localhost:3000",
  },
  async function (accessToken, refreshToken, profile, cb) {
    if (profile.emails) {
      const user = await service.findByEmail(profile?.emails[0].value);

      if (!user) {
        const user = await service.create({
          firstName: profile.name?.givenName as string,
          lastName: profile.name?.familyName as string,
          email: profile.emails[0].value as string,
          refreshToken,
        });

        const UserData = { ...user, accessToken };

        cb(null, UserData);
      } else {
        user.refreshToken = refreshToken;
        user.save();

        const UserData = { ...user, accessToken };
        cb(null, UserData);
      }
    }
  }
);

export default googleStrategy;
