import type { Item, Sale } from '@/lib/types.js';
import Modal from '../components/Modal.js';
import NewItem from '../forms/AddItem.js';
import AddSale from '../forms/AddSale.js';

interface HomeProps {
  rows: {
    items: Item;
    sales: Sale | null;
  }[];
}

export default function HomeView(props: HomeProps) {
  return (
    <>
      <div class="flex-horizontal">
        <h1>Items</h1>
        <Modal label="New Item">
          <NewItem />
        </Modal>
      </div>
      <table>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>list_price</th>
          <th></th>
        </thead>
        <tbody>
          {props.rows.map((row) => (
            <tr>
              <td>{row.items.id}</td>
              <td>{row.items.name}</td>
              <td>${row.items.list_price}</td>
              <td>
                <Modal
                  label={!!row.sales ? 'Sold' : 'Record Sale'}
                  disabled={!!row.sales}
                >
                  <AddSale item_id={row.items.id} />
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
