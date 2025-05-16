import { eq } from 'drizzle-orm';
import { seed } from 'drizzle-seed';
import { db, items, sales } from './schema.js';

/**
 * Seeds an empty database with test items
 * @returns
 */
export async function seedDatabase() {
  try {
    await seed(db, { items });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Selects all item rows and their related sale rows
 * @returns
 */
export async function selectItems() {
  try {
    const rows = await db
      .select()
      .from(items)
      .leftJoin(sales, eq(sales.item_id, items.id));
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Selects all sale rows and related item rows
 * @returns
 */
export async function selectSales() {
  try {
    const rows = await db
      .select()
      .from(sales)
      .leftJoin(items, eq(items.id, sales.item_id));
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Inserts a new item row into the items table
 * @param item
 * @returns
 */
export async function insertItem(item: { name: string; list_price: number }) {
  try {
    await db
      .insert(items)
      .values({ name: item.name, list_price: item.list_price });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Inserts a new sale row into the sales table
 * @param sale
 * @returns
 */
export async function insertSale(sale: {
  sale_price: number;
  sale_date: number;
  item_id: number;
}) {
  try {
    await db.insert(sales).values({
      sale_price: sale.sale_price,
      sale_date: sale.sale_date,
      item_id: sale.item_id,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
