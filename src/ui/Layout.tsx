import type { PropsWithChildren } from 'hono/jsx';
import Nav from './components/Nav.js';

export default function Layout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.jade.min.css"
        ></link>
        <script src="//unpkg.com/alpinejs" defer></script>
        <title>Opal Store + Hono</title>
      </head>
      <body>
        <div id="root">
          <Nav />
          <main>{props.children}</main>
        </div>
      </body>
    </html>
  );
}
