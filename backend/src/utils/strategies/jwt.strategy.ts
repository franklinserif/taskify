/**
 * It contains all jwt strategry
 * @module utils/strategies/jwt
 */

import { Strategy, ExtractJwt } from "passport-jwt";

import config from "../../config";

console.log("secrect", config.jwtSecret);

/**
 * @constant
 */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

/**
 * JWT strategy for user in the middleware
 * @type {Object} JWT strategy
 * @constant
 */
const jwtStrategy = new Strategy(options, (payload, done) => {
  done(null, payload);
});

export default jwtStrategy;
