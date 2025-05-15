import type { Item, Sale } from '@/lib/types.js';
import type { PropsWithChildren } from 'hono/jsx';
import Modal from '../components/Modal.js';
import AddSale from '../forms/AddSale.js';

interface SalesViewProps extends PropsWithChildren {
  rows: {
    sales: Sale;
    items: Item | null;
  }[];
}

export default function SalesView(props: SalesViewProps) {
  return (
    <table>
      <thead>
        <th>id</th>
        <th>item</th>
        <th>list_price</th>
        <th>sale_amount</th>
        <th>sale_date</th>
      </thead>
      <tbody>
        {props.rows.map((row) => (
          <tr>
            <td>{row.sales.id}</td>
            <td>{row.items?.name}</td>
            <td>${row.items?.list_price}</td>
            <td>${row.sales.sale_amount}</td>
            <td>{row.sales.sale_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
