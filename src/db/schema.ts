import 'dotenv/config';
import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql/node';
import { sql } from 'drizzle-orm';

/** Database connection */
export const db = drizzle({
  connection: {
    url: process.env.PROD ? process.env.DATABASE_URL! : 'file:dev.sqlite',
    authToken: process.env.PROD ? process.env.DATABASE_AUTH_TOKEN! : undefined,
  },
});

/** Items sqlite table */
export const items = sqliteTable('items', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  purchase_cost: int().notNull(), // in total cents
  list_price: int().notNull(), // in total cents
  item_desc: text(),
});

export const sales = sqliteTable('sales', {
  id: int().primaryKey({ autoIncrement: true }),
  sale_price: int().notNull(), // in total cents
  sale_date: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`), // date string in ISO format
  item_id: int()
    .references(() => items.id, { onDelete: 'no action' })
    .notNull(),
});
