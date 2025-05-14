import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import Layout from './ui/Layout.js';
import HomeView from './ui/Views/HomeView.js';
import { serveStatic } from '@hono/node-server/serve-static';
import { seedDatabase, selectItems } from './db/queries.js';

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

app.get('/', async (c) => {
  const items = await selectItems();
  console.log('items:', items);
  return c.render(<HomeView items={items || []} />);
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
