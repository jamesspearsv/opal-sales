import type {} from 'hono/jsx';

declare module 'hono/jsx' {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: {
        // Accept any attribute starting with 'x-'
        [key: `x-${string}`]: any;
        // Accept any attribute starting with 'x-on:'
        [key: `x-on:${string}`]: any;
        // Accept any attribute starting with 'x-bind:'
        [key: `x-bind:${string}`]: any;
        // Accept any other attribute (fallback)
        [key: string]: any;
      };
    }
  }
}
