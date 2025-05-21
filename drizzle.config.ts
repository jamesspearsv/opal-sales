import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: process.env.PROD ? 'turso' : 'sqlite',
  dbCredentials: process.env.PROD
    ? {
        url: process.env.PROD ? process.env.DATABASE_URL! : 'file:dev.sqlite',
        authToken: process.env.PROD
          ? process.env.DATABASE_AUTH_TOKEN!
          : undefined,
      }
    : {
        url: 'file:dev.sqlite',
      },
});
