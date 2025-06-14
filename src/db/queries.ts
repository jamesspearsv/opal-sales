import { db } from './connection.js';
import { eq } from 'drizzle-orm';
import { seed } from 'drizzle-seed';
import { items, sales } from './schema.js';

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

// export async function migrateDates() {
//   const rows = await db.select().from(sales);
//   return rows;
// }

// export async function updateDate(id: number, date: string) {
//   await db.update(sales).set({ sale_date: 'NULL' }).where(eq(sales.id, id));
// }

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

export async function selectItem(id: number) {
  try {
    const row = await db.select().from(items).where(eq(items.id, id));
    return row[0];
  } catch (error) {
    console.log(error);
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
export async function insertItem(item: {
  name: string;
  purchase_cost: number;
  list_price: number;
  item_desc: string;
}) {
  try {
    await db.insert(items).values({
      name: item.name,
      purchase_cost: item.purchase_cost,
      list_price: item.list_price,
      item_desc: item.item_desc,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteItem(id: number) {
  try {
    await db.delete(items).where(eq(items.id, id));
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
  item_id: number;
  sale_date: string;
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
