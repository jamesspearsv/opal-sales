import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: process.env.PROD ? 'turso' : 'sqlite',
  dbCredentials: process.env.PROD
    ? {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN!,
      }
    : {
        url: 'file:dev.sqlite',
      },
});
