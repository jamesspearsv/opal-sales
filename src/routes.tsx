import { Hono } from 'hono';
import {
  seedDatabase,
  selectItems,
  insertItem,
  insertSale,
  selectSales,
} from './db/queries.js';
import HomeView from './ui/views/HomeView.js';
import SalesView from './ui/views/SalesView.js';
import type { Item, Sale } from './lib/types.js';
import { parseDateInt } from './lib/helpers.js';

export const router = new Hono();

// TODO: Add basic form validation
router.get('/seed', async (c) => {
  const result = await seedDatabase();
  if (result) return c.text('Database seeded!');
  return c.text('Unable to seed database...');
});

router
  .get('/', async (c) => {
    const rows = await selectItems();
    // console.log('items:', items);
    return c.render(<HomeView rows={rows || []} />);
  })
  .post(async (c) => {
    const data = await c.req.formData();

    const name = data.get('name') as string;
    const list_price = data.get('list_price') as string;

    const price_int =
      parseInt(list_price.split('.')[0]) * 100 +
      parseInt(list_price.split('.')[1]);

    const result = await insertItem({
      name,
      list_price: price_int,
    });
    if (!result) return c.redirect('/?error=true');

    return c.redirect('/');
  });

router
  .get('/sales', async (c) => {
    const rows = await selectSales();
    return c.render(
      <SalesView rows={rows as { sales: Sale; items: Item }[]} />
    );
  })
  .post('/sales', async (c) => {
    const data = await c.req.formData();
    console.log(data);
    const item_id = data.get('item_id') as string;
    const sale_price = data.get('sale_price') as string;
    const sale_date = data.get('sale_date') as string;

    const amount_int =
      parseInt(sale_price.split('.')[0]) * 100 +
      parseInt(sale_price.split('.')[1]);

    const date_int = parseDateInt(sale_date);
    console.log(date_int);

    const result = await insertSale({
      item_id: parseInt(item_id),
      sale_price: amount_int,
      sale_date: date_int,
    });

    if (!result) return c.redirect('/?error=true');

    return c.redirect('/');
  });
