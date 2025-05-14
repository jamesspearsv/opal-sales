import { drizzle } from 'drizzle-orm/libsql/node';

const db = drizzle(process.env.DATABASE_URL!);


