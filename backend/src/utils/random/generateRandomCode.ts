/**
 * Generate random number max value is 50000
 * @returns {number}
 */

import _ from "lodash";

export default function generateRandomCode(): number {
  return _.random(1000, 9000);
}
