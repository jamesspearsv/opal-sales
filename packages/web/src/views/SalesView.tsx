import type { GetSalesResponse, Sale } from '@packages/shared';
import { useEffect, useState } from 'react';

export default function SalesView() {
  const [rows, setRows] = useState<Sale[]>([]);

  useEffect(() => {
    async function fetchSales() {
      const res = await fetch('/api/sales');
      if (!res.ok) return; // TODO: handle failed request
      const json = (await res.json()) as GetSalesResponse;
      setRows(json.data);
    }

    fetchSales();
  }, []);

  return (
    <>
      <section>
        <h1>All Sales</h1>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>item</th>
              <th>sale_price</th>
              <th>+/-</th>
              <th>sale_date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr>
                <td>{row.item_name}</td>
                <td>${Number(row.sale_price / 100).toFixed(2)}</td>
                <td>
                  {Number((row.sale_price - row.purchase_cost) / 100).toFixed(
                    2
                  )}
                </td>
                <td>{row.sale_date.split(' ')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
