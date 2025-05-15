import 'dotenv/config';
import { sqliteTable, int, text, foreignKey } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql/node';

/** Database connection */
export const db = drizzle(process.env.DATABASE_URL!);

/** Items sqlite table */
export const items = sqliteTable('items', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  list_price: int().notNull(),
});

export const sales = sqliteTable('sales', {
  id: int().primaryKey({ autoIncrement: true }),
  sale_price: int().notNull(),
  sale_date: text().notNull(),
  item_id: int()
    .references(() => items.id, { onDelete: 'no action' })
    .notNull(),
});
