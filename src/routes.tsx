import { Hono } from 'hono';
import {
  seedDatabase,
  selectItems,
  insertItem,
  insertSale,
  selectSales,
  selectItem,
  deleteItem,
} from './db/queries.js';
import HomeView from './ui/views/HomeView.js';
import SalesView from './ui/views/SalesView.js';
import type { Item, Sale } from './lib/types.js';
import { parseCents, parseDateInt } from './lib/parsing.js';
import { db } from './db/schema.js';

export const router = new Hono();

// TODO: Add basic form validation
router.get('/seed', async (c) => {
  const result = await seedDatabase();
  if (result) return c.text('Database seeded!');
  return c.text('Unable to seed database...');
});

// TODO: Move to /items
router.get('/', async (c) => {
  const rows = await selectItems();
  // console.log('items:', items);
  return c.render(<HomeView rows={rows || []} />);
});

router.post('/', async (c) => {
  const data = await c.req.formData();

  const name = data.get('name') as string;
  const list_price = data.get('list_price') as string;
  const purchase_cost = data.get('purchase_cost') as string;

  const cost_int = parseCents(purchase_cost);
  const price_int = parseCents(list_price);

  const result = await insertItem({
    name,
    purchase_cost: cost_int,
    list_price: price_int,
    item_desc: '',
  });
  if (!result) return c.redirect('/?error=true');

  return c.redirect('/');
});

router.get('/sales', async (c) => {
  const rows = await selectSales();
  return c.render(<SalesView rows={rows as { sales: Sale; items: Item }[]} />);
});

router.post('/sales', async (c) => {
  const data = await c.req.formData();
  console.log(data);
  const item_id = data.get('item_id') as string;
  const sale_price = data.get('sale_price') as string;
  const sale_date = data.get('sale_date') as string;

  const amount_int = parseCents(sale_price);
  const date_int = parseDateInt(sale_date);

  const result = await insertSale({
    item_id: parseInt(item_id),
    sale_price: amount_int,
    sale_date: date_int,
  });

  if (!result) return c.redirect('/?error=true');

  return c.redirect('/');
});

router.post('/bundle', async (c) => {
  const data = await c.req.formData();
  const items = data.get('items') as string;
  const itemsList = items.split(',');

  const queries = itemsList.map((id) => selectItem(parseInt(id)));
  const results = await Promise.all(queries);
  const totalListPrice = results.reduce((a, item) => {
    if (item) {
      return a + item.list_price;
    } else return 0;
  }, 0);
  let newDesc = 'Items in bundle:\n';
  results.forEach((item) => {
    if (item) {
      newDesc = newDesc + `- ${item.name}\n`;
    }
  });

  const totalPurchaseCost = results.reduce((a, item) => {
    if (item) {
      return a + item.purchase_cost;
    } else return 0;
  }, 0);

  const insertResult = await insertItem({
    name: `Item Bundle`,
    purchase_cost: totalPurchaseCost,
    list_price: totalListPrice,
    item_desc: newDesc,
  });

  // TODO: Delete all provided items
  const deleteQueries = itemsList.map((id) => deleteItem(parseInt(id)));
  await Promise.all(deleteQueries);

  if (insertResult) return c.redirect('/');
});
