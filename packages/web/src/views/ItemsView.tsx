import type { ErrorResponse, GetItemsResponse, Item } from '@packages/shared';
import { useEffect, useState } from 'react';

export default function ItemsView() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async function getItems() {
      const res = await fetch('/api/items');

      if (!res.ok) {
        const errorMessage = (await res.json()) as ErrorResponse;
        setError(errorMessage.message);
        setItems([]);
      }

      const json = (await res.json()) as GetItemsResponse;
      setError('');
      setItems(json.data);
    })();
  }, []);

  return (
    <section>
      <div>
        <h1>Items</h1>
        {/* TODO: [ ] Add item action buttons */}
      </div>
      <table>
        <thead>
          <th></th>
          <th>name</th>
          <th>purchase_cost</th>
          <th>list_price</th>
          <th></th>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.name}</td>
              <td>${Number(item.purchase_cost / 100).toFixed(2)}</td>
              <td>${Number(item.list_price / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
