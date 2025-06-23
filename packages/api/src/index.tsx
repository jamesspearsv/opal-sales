import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { serveStatic } from '@hono/node-server/serve-static';
import { api } from './api.js';
import { logger } from 'hono/logger';

export const app = new Hono();

/* APP MIDDLEWARE */
app.use(logger());
app.route('/api', api);

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
