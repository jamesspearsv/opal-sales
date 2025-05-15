import { db, items, sales } from '@/db/schema.js';
import { eq } from 'drizzle-orm';
import { seed } from 'drizzle-seed';

export async function seedDatabase() {
  try {
    await seed(db, { items });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function selectItems() {
  try {
    const rows = await db
      .select()
      .from(items)
      .leftJoin(sales, eq(sales.item_id, items.id));
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function selectSales() {
  try {
    const rows = await db
      .select()
      .from(sales)
      .leftJoin(items, eq(items.id, sales.item_id));
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

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

export async function insertSale(sale: {
  sale_amount: number;
  sale_date: string;
  item_id: number;
}) {
  try {
    await db.insert(sales).values({
      sale_amount: sale.sale_amount,
      sale_date: sale.sale_date,
      item_id: sale.item_id,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
