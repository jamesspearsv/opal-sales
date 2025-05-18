import * as dotenv from 'dotenv';
import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql/node';

dotenv.config({ path: `${process.cwd()}/.dev.env` });

/** Database connection */
export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
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
  sale_date: int().notNull(), // int representing YYYYMMDD format
  item_id: int()
    .references(() => items.id, { onDelete: 'no action' })
    .notNull(),
});
