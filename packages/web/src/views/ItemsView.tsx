import type { ErrorResponse, GetItemsResponse, Item } from '@packages/shared';
import Modal from '@web/components/Modal';
import NewItem from '@web/forms/AddItem';
import AddSale from '@web/forms/AddSale';
import { useEffect, useState } from 'react';

export default function ItemsView() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
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

  function handleCheckboxChange(id: number, action: 'push' | 'remove') {
    if (action === 'push') {
      const newArray = [...selectedItems];
      newArray.push(id);
      setSelectedItems(newArray);
    } else if (action === 'remove') {
      const newArray = selectedItems.filter((itemId) => id !== itemId);
      setSelectedItems(newArray);
    }
  }

  return (
    <section>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <h1>Items</h1>
          {/* Conditionally render item action buttons */}
          {selectedItems.length === 1 && (
            <Modal label="Add A Sale">
              <AddSale item_id={selectedItems[0]} />
            </Modal>
          )}
          {selectedItems.length > 1 && <button>Make A Bundle</button>}
          <Modal label="New Item">
            <NewItem />
          </Modal>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>name</td>
            <td>purchase_cost</td>
            <td>list_price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleCheckboxChange(
                      item.id,
                      e.currentTarget.checked ? 'push' : 'remove'
                    )
                  }
                />
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
