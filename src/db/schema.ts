import 'dotenv/config';
import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql/node';

/** Database connection */
export const db = drizzle(process.env.DATABASE_URL!);

/** Items sqlite table */
export const items = sqliteTable('items', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  list_price: int().notNull(),
});
