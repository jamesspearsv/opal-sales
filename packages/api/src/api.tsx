import { Hono } from 'hono';
import {
  seedDatabase,
  selectItems,
  insertItem,
  insertSale,
  selectSales,
  selectItem,
  deleteItem,
  bundleItems,
} from './db/queries.js';
import { parseCents } from '@packages/shared';
import type {
  ErrorResponse,
  PostItemsResponse,
  GetItemsResponse,
  GetSalesResponse,
  PostSalesResponse,
  BundleRequest,
  SuccessResponse,
  PostBundleResponse,
} from '@packages/shared';

export const api = new Hono();

api.get('/seed', async (c) => {
  const result = await seedDatabase();
  if (result) return c.text('Database seeded!');
  return c.text('Unable to seed database...');
});

api.get('/items', async (c) => {
  const result = await selectItems();
  if (!result.success) {
    return c.json(
      { message: 'Unable to query items data' } as ErrorResponse,
      500
    );
  }
  return c.json({ data: result.data } as GetItemsResponse);
});

api.post('/items', async (c) => {
  const body = await c.req.json();
  console.log(body);

  const { name, list_price, purchase_cost } = body;

  // collect request json data
  // const data = await c.req.formData();

  // const name = data.get('name') as string;
  // const list_price = data.get('list_price') as string;
  // const purchase_cost = data.get('purchase_cost') as string;

  // parse purchase cost and list price into cents
  const cost_int = parseCents(purchase_cost);
  const price_int = parseCents(list_price);

  const result = await insertItem({
    name,
    purchase_cost: cost_int,
    list_price: price_int,
    item_desc: '',
  });

  if (!result.success) {
    return c.json({ message: result.message } as ErrorResponse, 500);
  }

  return c.json({ data: result.data } as PostItemsResponse);
});

api.get('/sales', async (c) => {
  const result = await selectSales();
  if (!result.success) {
    return c.json({ message: result.message } as ErrorResponse, 500);
  }

  return c.json({ data: result.data } as GetSalesResponse);
});

api.post('/sales', async (c) => {
  // const data = await c.req.formData();
  // const item_id = data.get('item_id') as string;
  // const sale_price = data.get('sale_price') as string;
  // const sale_date = data.get('sale_date') as string;

  const body = await c.req.json();
  const { item_id, sale_price, sale_date } = body;

  const parsed_date = new Date(sale_date).toISOString().replace('T', ' ');
  const amount_int = parseCents(sale_price);

  const result = await insertSale({
    item_id: parseInt(item_id),
    sale_price: amount_int,
    sale_date: parsed_date,
  });

  if (!result.success) {
    return c.json({ message: result.message } as ErrorResponse, 500);
  }

  return c.json({
    data: 'Successfully inserted new sale',
  } as PostSalesResponse);
});

// TODO: [ ] update /bundle handler
api.post('/bundle', async (c) => {
  const body = await c.req.json();
  const { bundle_name, bundle_desc, list_price, purchase_cost, item_ids } =
    body as BundleRequest;

  const bundleResult = await bundleItems(item_ids);

  // insert new bundled item
  const insertResult = await insertItem({
    name: bundle_name,
    purchase_cost,
    list_price,
    item_desc: bundle_desc,
  });

  if (!insertResult.success) {
    return c.json(
      { message: 'Unable to create new bundle' } as ErrorResponse,
      500
    );
  }

  // set selected items as bundled
  if (!bundleResult.success) {
    // TODO: add logic to un-bundle items
    return c.json({ message: 'Unable to bundle items' } as ErrorResponse, 500);
  }

  return c.json({
    data: 'New bundle created and items bundled',
  } as PostBundleResponse);

  // const queries = itemsList.map((id) => selectItem(parseInt(id)));
  // const results = await Promise.all(queries);
  // results.forEach(result => {
  //   if (!result.success)
  // })
  // const totalListPrice = results.reduce((a, item) => {
  //   if (item) {
  //     return a + item..list_price;
  //   } else return 0;
  // }, 0);
  // let newDesc = 'Items in bundle:';
  // results.forEach((item, index) => {
  //   if (item && index < results.length - 1) {
  //     newDesc = newDesc + `${item.name}, `;
  //   } else if (item) {
  //     newDesc = newDesc + ` and ${item.name}`;
  //   }
  // });

  // const totalPurchaseCost = results.reduce((a, item) => {
  //   if (item) {
  //     return a + item.purchase_cost;
  //   } else return 0;
  // }, 0);

  // const insertResult = await insertItem({
  //   name: `Item Bundle`,
  //   purchase_cost: totalPurchaseCost,
  //   list_price: totalListPrice,
  //   item_desc: newDesc,
  // });

  // const deleteQueries = itemsList.map((id) => deleteItem(parseInt(id)));
  // await Promise.all(deleteQueries);

  // if (insertResult) return c.redirect('/items');
});

api.get('/', (c) => c.json({ status: 'healthy' }));
