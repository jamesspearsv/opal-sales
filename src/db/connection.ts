import { drizzle } from 'drizzle-orm/libsql';
import 'dotenv/config';

if (process.env.NODE_ENV === 'prod')
  console.log('---> Running in production mode');
else console.log(' ---> Running in development mode');

// Check for correct env configuration
if (
  process.env.NODE_ENV === 'prod' &&
  (!process.env.DATABASE_AUTH_TOKEN || !process.env.DATABASE_URL)
) {
  throw Error('Missing environment config');
}

/** Database connection */
export const db = drizzle({
  connection: {
    url:
      process.env.NODE_ENV === 'prod'
        ? process.env.DATABASE_URL!
        : 'file:dev.sqlite',
    authToken:
      process.env.NODE_ENV === 'prod'
        ? process.env.DATABASE_AUTH_TOKEN!
        : undefined,
  },
});
