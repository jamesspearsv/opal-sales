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
    <section x-data="{selected: []}">
      <div class="flex-horizontal">
        <h1>Items</h1>
        <Modal label="New Item">
          <NewItem />
        </Modal>
        <template x-if="selected.length > 0">
          <button>Make a bundle</button>
        </template>
        <template x-if="selected.length > 0">
          <button>Cancel</button>
        </template>
      </div>
      <table
        x-on:select="() => {
        console.log('listening to select')
        console.log(typeof selected)
        selected.push($event.detail.id)
        }"
        x-on:remove="() => {
        selected = selected.filter((id) => id !== $event.detail.id)
        }"
      >
        <thead>
          <th></th>
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
                  <td>
                    <input
                      type="checkbox"
                      value={row.items.id}
                      x-on:change="() => {
                       if ($event.currentTarget.checked) {
                       $dispatch('select', {id: $event.currentTarget.value})
                       } else {
                        $dispatch('remove', {id: $event.currentTarget.value})}
                      }"
                    />
                  </td>

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
    </section>
  );
}
