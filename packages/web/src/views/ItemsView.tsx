import type { ErrorResponse, GetItemsResponse, Item } from '@packages/shared';
import Modal from '@web/components/Modal';
import AddBundleForm from '@web/forms/AddBundle';
import AddItemForm from '@web/forms/AddItem';
import AddSale from '@web/forms/AddSale';
import { useEffect, useState } from 'react';

export default function ItemsView() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setError] = useState('');
  //! hack: figure out a more efficient to handle data updating and refreshing
  const [updater, setUpdater] = useState(Math.random());

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
      setSelectedItems([]);
    })();
  }, [updater]);

  function handleCheckboxChange(index: number, action: 'push' | 'remove') {
    if (action === 'push') {
      const newArray = [...selectedItems];
      newArray.push(items[index]);
      setSelectedItems(newArray);
    } else if (action === 'remove') {
      const newArray = selectedItems.filter(
        (newItem) => items[index].id !== newItem.id
      );
      setSelectedItems(newArray);
    }
  }

  return (
    <>
      <section>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <h1>Items</h1>
          <Modal label="New Item" updater={updater}>
            <AddItemForm updater={setUpdater} />
          </Modal>
          {/* Conditionally render item action buttons */}
          {selectedItems.length === 1 && (
            <Modal label="Sell" updater={updater}>
              <AddSale item={selectedItems[0]} setUpdater={setUpdater} />
            </Modal>
          )}
          {selectedItems.length > 1 && (
            <Modal label="Bundle">
              <AddBundleForm items={selectedItems} setUpdater={setUpdater} />
            </Modal>
          )}
        </div>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>name</th>
              <th>purchase_cost</th>
              <th>list_price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(
                        index,
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
    </>
  );
}
