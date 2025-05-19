import { parseDateString } from '../../lib/parsing.js';
import type { PropsWithChildren } from 'hono/jsx';
import type { Item, Sale } from '../../lib/types.js';

interface SalesViewProps extends PropsWithChildren {
  rows: {
    sales: Sale;
    items: Item;
  }[];
}

export default function SalesView(props: SalesViewProps) {
  return (
    <>
      <h1>All Sales</h1>
      <table>
        <thead>
          <th>item</th>
          <th>sale_price</th>
          <th>+/-</th>
          <th>sale_date</th>
        </thead>
        <tbody>
          {props.rows.map((row) => (
            <tr>
              <td>{row.items.name}</td>
              <td>${Number(row.sales.sale_price / 100).toFixed(2)}</td>
              <td>
                {Number(
                  (row.sales.sale_price - row.items.purchase_cost) / 100
                ).toFixed(2)}
              </td>
              <td>{parseDateString(row.sales.sale_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
