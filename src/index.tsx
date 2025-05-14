import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import Layout from './ui/Layout.js';
import HomeView from './ui/Views/HomeView.js';
import { serveStatic } from '@hono/node-server/serve-static';

const app = new Hono();

app.use(jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use(
  serveStatic({
    root: './',
  })
);

app.get('/', (c) => {
  return c.render(<HomeView />);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
