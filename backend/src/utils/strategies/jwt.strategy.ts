/**
 * It contains all jwt strategry
 * @module utils/strategies/jwt
 */

import { Strategy, ExtractJwt } from "passport-jwt";

import config from "../../config";

/**
 * @constant
 */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secrectOrKey: config.jwtSecret,
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
