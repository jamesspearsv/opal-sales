import {
  seedDatabase,
  selectItems,
  insertItem,
  insertSale,
  selectSales,
} from './db/queries.js';
import HomeView from './ui/views/HomeView.js';
import { Hono } from 'hono';
import SalesView from './ui/views/SalesView.js';

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

    const result = await insertItem({
      name,
      list_price: parseInt(list_price),
    });
    if (!result) return c.redirect('/?error=true');

    return c.redirect('/');
  });

router
  .get('/sales', async (c) => {
    const rows = await selectSales();
    return c.render(<SalesView rows={rows ? rows : []} />);
  })
  .post('/sales', async (c) => {
    const data = await c.req.formData();
    console.log(data);
    const item_id = data.get('item_id') as string;
    const sale_amount = data.get('sale_amount') as string;
    const sale_date = data.get('sale_date') as string;

    const result = await insertSale({
      item_id: parseInt(item_id),
      sale_amount: parseInt(sale_amount),
      sale_date,
    });

    if (!result) return c.redirect('/?error=true');

    return c.redirect('/');
  });
