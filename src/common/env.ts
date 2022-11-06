/* istanbul ignore file */
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.configPath });

function getEnv(varName, defaultValue?) {
    let envVariable = process.env[varName];
    if (!envVariable && defaultValue === undefined) {
      throw new Error(`environment variable ${varName} is undefined`);
    }
    return envVariable || defaultValue;
  }
  
  /**
   * The current environment
   */
  export const ENV = getEnv('ENV', 'local');

  /**
 * pusher
 */
export const PUSHER_APP_ID = getEnv('PUSHER_APP_ID');
export const PUSHER_API_KEY = getEnv('PUSHER_API_KEY');
export const PUSHER_API_SECRET = getEnv('PUSHER_API_SECRET');
export const PUSHER_CLUSTER = getEnv('PUSHER_CLUSTER');