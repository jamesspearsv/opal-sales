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
    <div x-data="{selecting: false}">
      <div class="flex-horizontal">
        <h1>Items</h1>
        <Modal label="New Item">
          <NewItem />
        </Modal>
      </div>
      {/* 
      <button x-on:click="selecting = !selecting">Select</button>
       */}
      <table>
        <thead>
          {/* 
          <th x-show="!selecting"></th>
           */}
          <th>id</th>
          <th>name</th>
          <th>list_price</th>
          <th></th>
        </thead>
        <tbody>
          {props.rows.map(
            (row) =>
              !row.sales && (
                <tr>
                  {/* 
                  <td x-show="!selecting">
                    <button>Select</button>
                  </td>
                    */}
                  <td>{row.items.id}</td>
                  <td>{row.items.name}</td>
                  <td>${Number(row.items.list_price / 100).toFixed(2)}</td>
                  <td>
                    <Modal
                      label={!!row.sales ? 'Sold' : 'Record Sale'}
                      disabled={!!row.sales}
                    >
                      <AddSale item_id={row.items.id} />
                    </Modal>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
