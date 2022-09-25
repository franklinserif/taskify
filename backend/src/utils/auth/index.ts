/**
 * this is the main strategies module
 * @module utils/strategies/index
 */

import passport from "passport";
import localStrategy from "./strategies/local.strategy";
import jwtStrategry from "./strategies/jwt.strategy";
import googleStrategy from "./strategies/google.strategy";

passport.use(localStrategy);
passport.use(jwtStrategry);
passport.use(googleStrategy);
