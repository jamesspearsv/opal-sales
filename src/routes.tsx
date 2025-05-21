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
import ItemsView from './ui/views/ItemsView.js';
import SalesView from './ui/views/SalesView.js';
import type { Item, Sale } from './lib/types.js';
import { parseCents, parseDateInt } from './lib/parsing.js';

export const routes = {
  Items: '/items',
  Sales: '/sales',
  Home: '/',
  Bundle: '/bundle',
};

export const router = new Hono();
router.get(routes.Home, async (c) => {
  const date = new Date();
  const year = date.getFullYear;
  const month = date.getMonth() + 1;

  const startDate = parseInt(`${year}${month}01`);

  const endDate = parseInt(`${year}${month}`);

  const sales = await selectSales(startDate, endDate);
  return c.json(sales);
});

// TODO: Add basic form validation
router.get('/seed', async (c) => {
  const result = await seedDatabase();
  if (result) return c.text('Database seeded!');
  return c.text('Unable to seed database...');
});

router.get(routes.Items, async (c) => {
  const rows = await selectItems();
  return c.render(<ItemsView rows={rows || []} />);
});

router.post(routes.Items, async (c) => {
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

  return c.redirect(routes.Items);
});

router.get(routes.Sales, async (c) => {
  const rows = await selectSales();
  return c.render(<SalesView rows={rows as { sales: Sale; items: Item }[]} />);
});

router.post(routes.Sales, async (c) => {
  const data = await c.req.formData();
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

  if (!result) return c.redirect(routes.Items + '?error=true');

  return c.redirect(routes.Items);
});

router.post(routes.Bundle, async (c) => {
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
  let newDesc = 'Items in bundle:';
  results.forEach((item, index) => {
    if (item && index < results.length - 1) {
      newDesc = newDesc + `${item.name}, `;
    } else if (item) {
      newDesc = newDesc + ` and ${item.name}`;
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

  if (insertResult) return c.redirect(routes.Items);
});
