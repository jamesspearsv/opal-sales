import { db, items } from '@/db/schema.js';
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
    const rows = await db.select().from(items);
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
