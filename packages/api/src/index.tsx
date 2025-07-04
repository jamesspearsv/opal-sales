import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { api } from './api.js';
import { logger } from 'hono/logger';
import { readFile } from 'node:fs/promises';

const __dirname = process.cwd();

export const app = new Hono();

/* APP MIDDLEWARE */
app.use(logger());
app.use('/assets/*', serveStatic({ root: './web' }));
app.route('/api', api);

app.get('*', async (c) => {
  return c.html(
    await readFile(__dirname + '/web/index.html', { encoding: 'utf-8' })
  );
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}/api`);
  }
);

export default app;
