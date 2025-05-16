import { parseDateString } from '../../lib/helpers.js';
import type { Item, Sale } from '@/lib/types.js';
import type { PropsWithChildren } from 'hono/jsx';

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
          <th>id</th>
          <th>item</th>
          <th>list_price</th>
          <th>sale_price</th>
          <th>+/-</th>
          <th>sale_date</th>
        </thead>
        <tbody>
          {props.rows.map((row) => (
            <tr>
              <td>{row.sales.id}</td>
              <td>{row.items.name}</td>
              <td>${Number(row.items.list_price / 100).toFixed(2)}</td>
              <td>${Number(row.sales.sale_price / 100).toFixed(2)}</td>
              <td>
                {Number(
                  (row.sales.sale_price - row.items.list_price) / 100
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
