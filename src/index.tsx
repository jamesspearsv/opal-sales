import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import Layout from './ui/Layout.js';
import HomeView from './ui/Views/HomeView.js';
import { serveStatic } from '@hono/node-server/serve-static';
import { insertItem, seedDatabase, selectItems } from './db/queries.js';

const app = new Hono();

app.use(jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use(
  '/public/*',
  serveStatic({
    root: './',
    onNotFound(path, c) {
      console.log(path);
    },
  })
);

app.get('/seed', async (c) => {
  const result = await seedDatabase();
  if (result) return c.text('Database seeded!');
  return c.text('Unable to seed database...');
});

app
  .get('/', async (c) => {
    const items = await selectItems();
    // console.log('items:', items);
    return c.render(<HomeView items={items || []} />);
  })
  .post(async (c) => {
    const body = await c.req.parseBody();
    console.log(body);

    const name = body.name as string;
    const list_price = parseInt(body.list_price as string);

    const result = await insertItem({ name, list_price });

    if (!result) return c.redirect('/?error=true');
    return c.redirect('/');
  });

serve(
  {
    fetch: app.fetch,
    port: 5183,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
