import { routes } from '../../api.js';

export default function Nav() {
  return (
    <nav class={'nav'}>
      <ul>
        <li>Lucky Opal Finds</li>
      </ul>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/items">Items</a>
        </li>
        <li>
          <a href="/sales">Sales</a>
        </li>
      </ul>
    </nav>
  );
}
