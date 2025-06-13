import { drizzle } from 'drizzle-orm/libsql';
import 'dotenv/config';

if (process.env.PROD) console.log('---> Running in production mode');
else console.log(' ---> Running in development mode');

// Check for correct env configuration
if (
  process.env.PROD &&
  (!process.env.DATABASE_AUTH_TOKEN || !process.env.DATABASE_URL)
) {
  throw Error('Missing environment config');
}

/** Database connection */
export const db = drizzle({
  connection: process.env.PROD
    ? {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN!,
      }
    : {
        url: 'file:dev.sqlite',
      },
});
