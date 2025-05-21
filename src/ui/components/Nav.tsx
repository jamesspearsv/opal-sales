import { routes } from '../../routes.js';

export default function Nav() {
  return (
    <nav class={'nav'}>
      <ul>
        <li>Lucky Opal Finds</li>
      </ul>
      <ul>
        <li>
          <a href={routes.Home}>Home</a>
        </li>
        <li>
          <a href={routes.Items}>Items</a>
        </li>
        <li>
          <a href={routes.Sales}>Sales</a>
        </li>
      </ul>
    </nav>
  );
}
