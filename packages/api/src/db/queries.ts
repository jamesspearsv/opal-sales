import { db } from './connection.js';
import { and, eq, inArray, isNull } from 'drizzle-orm';
import { seed } from 'drizzle-seed';
import { items, sales } from './schema.js';
import type { Item, Result, Sale } from '@packages/shared';

/**
 * * Seeds an empty database with test items
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

// export async function migrateDates() {
//   const rows = await db.select().from(sales);
//   return rows;
// }

// export async function updateDate(id: number, date: string) {
//   await db.update(sales).set({ sale_date: 'NULL' }).where(eq(sales.id, id));
// }

/**
 * * Selects all item rows and their related sale rows
 * @returns
 */
export async function selectItems(): Promise<Result<Item[]>> {
  try {
    const rows = await db
      .select({
        id: items.id,
        name: items.name,
        purchase_cost: items.purchase_cost,
        list_price: items.list_price,
        item_desc: items.item_desc,
        sale_date: sales.sale_date,
        sale_id: sales.id,
      })
      .from(items)
      .leftJoin(sales, eq(sales.item_id, items.id))
      .where(and(isNull(sales.sale_date), eq(items.bundled, false)));
    return { success: true, data: rows };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Unable to select items' };
  }
}

export async function selectItem(id: number): Promise<Result<Item>> {
  try {
    const row = await db.select().from(items).where(eq(items.id, id));
    return { success: true, data: row[0] };
  } catch (error) {
    console.log(error);
    console.error(error);
    return { success: false, message: 'Unable to select item' };
  }
}

/**
 * Selects all sale rows and related item rows
 * @returns
 */
export async function selectSales(): Promise<Result<Sale[]>> {
  try {
    const rows = await db
      .select({
        id: sales.id,
        sale_price: sales.sale_price,
        sale_date: sales.sale_date,
        item_id: sales.item_id,
        purchase_cost: items.purchase_cost,
        item_name: items.name,
      })
      .from(sales)
      .innerJoin(items, eq(items.id, sales.item_id));
    return { success: true, data: rows };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Unable to select sales' };
  }
}

/**
 * Inserts a new item row into the items table
 * @param item
 * @returns
 */
export async function insertItem(item: {
  name: string;
  purchase_cost: number;
  list_price: number;
  item_desc: string;
}): Promise<Result<string>> {
  try {
    await db.insert(items).values({
      name: item.name,
      purchase_cost: item.purchase_cost,
      list_price: item.list_price,
      item_desc: item.item_desc,
    });
    return { success: true, data: 'Successfully inserted new item!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Unable to insert new item' };
  }
}

export async function deleteItem(id: number): Promise<Result<string>> {
  try {
    await db.delete(items).where(eq(items.id, id));
    return { success: true, data: 'Deleted item' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Unable to delete item' };
  }
}

/**
 * Inserts a new sale row into the sales table
 * @param sale
 * @returns
 */
export async function insertSale(sale: {
  sale_price: number;
  item_id: number;
  sale_date: string;
}): Promise<Result<string>> {
  try {
    await db.insert(sales).values({
      sale_price: sale.sale_price,
      sale_date: sale.sale_date,
      item_id: sale.item_id,
    });
    return { success: true, data: 'Successfully inserted new sale' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Unable to insert new sale' };
  }
}

export async function bundleItems(ids: number[]): Promise<Result<string>> {
  try {
    await db.update(items).set({ bundled: true }).where(inArray(items.id, ids));
    return { success: true, data: 'Bundled item!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Unable to bundle item' };
  }
}
