import crypto from "crypto";
import boom from "@hapi/boom";

/**
 * Generate random number max value is 50000
 * @returns {Promise<number>}
 */
export default async function generateRandomCode() {
  return crypto.randomInt(5000, (err, n) => {
    if (err) throw boom.conflict();

    return n;
  });
}
