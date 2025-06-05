import type { PropsWithChildren } from 'hono/jsx';
import Nav from './components/Nav.js';

export default function Layout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Include Pico CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.jade.min.css"
        ></link>
        {/* Include Alpine.js */}
        <script
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
          defer
        ></script>
        <link rel="stylesheet" href="/static/styles.css" />
        <title>Opal Store + Hono</title>
      </head>
      <body>
        <div id="root">
          <Nav />
          <main class={'main'}>{props.children}</main>
        </div>
      </body>
    </html>
  );
}
