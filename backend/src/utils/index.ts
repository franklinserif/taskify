/**
 * this is the main strategies module
 * @module utils/strategies/index
 */

import passport from "passport";

import LocalStrategy from "./strategies/local.strategy";
import JwtStrategry from "./strategies/jwt.strategy";

passport.use(LocalStrategy);
passport.use(JwtStrategry);
