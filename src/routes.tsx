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
import { parseCents } from './lib/parsing.js';

export const routes = {
  Items: '/items',
  Sales: '/sales',
  Home: '/',
  Bundle: '/bundle',
};

export const api = new Hono();

// router.get('/migrate', async (c) => {
//   const sales = await migrateDates();
//   sales.forEach((sale) => {
//     const newDate = parseDateString(sale.sale_date as number);

//     (async () => await updateDate(sale.id, newDate))();
//   });
//   return c.json(sales);
// });

api.get(routes.Home, async (c) => {
  const date = new Date();
  const year = date.getFullYear;
  const month = date.getMonth() + 1;

  const startDate = parseInt(`${year}${month}01`);

  const endDate = parseInt(`${year}${month}`);

  const sales = await selectSales();
  return c.json(sales);
});

// TODO: Add basic form validation
api.get('/seed', async (c) => {
  const result = await seedDatabase();
  if (result) return c.text('Database seeded!');
  return c.text('Unable to seed database...');
});

api.get(routes.Items, async (c) => {
  const rows = await selectItems();
  return c.render(<ItemsView rows={rows || []} />);
});

api.post(routes.Items, async (c) => {
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

api.get(routes.Sales, async (c) => {
  const rows = await selectSales();
  return c.render(<SalesView rows={rows as { sales: Sale; items: Item }[]} />);
});

api.post(routes.Sales, async (c) => {
  const data = await c.req.formData();
  const item_id = data.get('item_id') as string;
  const sale_price = data.get('sale_price') as string;
  const sale_date = data.get('sale_date') as string;
  const parsed_date = new Date(sale_date).toISOString().replace('T', ' ');

  const amount_int = parseCents(sale_price);

  const result = await insertSale({
    item_id: parseInt(item_id),
    sale_price: amount_int,
    sale_date: parsed_date,
  });

  if (!result) return c.redirect(routes.Items + '?error=true');

  return c.redirect(routes.Items);
});

api.post(routes.Bundle, async (c) => {
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
