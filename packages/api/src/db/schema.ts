import 'dotenv/config';
import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

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
