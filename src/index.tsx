import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { serveStatic } from '@hono/node-server/serve-static';
import Layout from './ui/Layout.js';
import { router } from './routes.js';
import { logger } from 'hono/logger';

export const app = new Hono();

/* APP MIDDLEWARE */
app.use(logger());
app.use(jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use(
  '/static/*',
  serveStatic({
    root: './',
    onNotFound(path, c) {
      console.log(path);
    },
  })
);

app.route('', router);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export default app;
