import type { Item, Sale } from '../../lib/types.js';
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
        <Modal label="New Item" ref="newItem">
          <NewItem />
        </Modal>
        <template x-if="selected.length > 1">
          <form action="/bundle" method="post" x-ref="bundle-form">
            <input type="hidden" name="items" x-bind:value="selected" />
            <input type="submit" value="Make a bundle" style="margin:0;" />
          </form>
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
          <th>name</th>
          <th>purchase_cost</th>
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
                      x-ref="checkbox"
                    />
                  </td>
                  <td>{row.items.name}</td>
                  <td>${Number(row.items.purchase_cost / 100).toFixed(2)}</td>
                  <td>${Number(row.items.list_price / 100).toFixed(2)}</td>
                  <td>
                    {/* <Modal
                      label={!!row.sales ? 'Sold' : 'Record Sale'}
                      disabled={!!row.sales}
                      ref={`item${row.items.id.toString()}`}
                    >
                      <AddSale item_id={row.items.id} />
                    </Modal> */}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </section>
  );
}
