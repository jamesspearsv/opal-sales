import type { Item } from '@packages/shared';
import { Form } from 'react-router';

// interface FormValues {
//   bundle_name: string;
//   bundle_desc: string;
// }

export default function AddBundleForm(props: { items: Item[] }) {
  //   const initialState: FormValues = { bundle_name: '', bundle_desc: '' };

  const list_price = props.items.reduce((a, item) => {
    return a + item.list_price;
  }, 0);
  const purchase_price = props.items.reduce((a, item) => {
    return a + item.purchase_cost;
  }, 0);
  const default_desc = 'Items in bundle';

  return (
    <Form action="/api/checkouts" method="post">
      <fieldset>
        {/* <input type="text" value={list_price} name="list_price" />
        <input type="text" value={purchase_price} name="purchase_cost" /> */}
        <label htmlFor="bundle_name">Bundle Name</label>
        <input type="text" name="bundle_name" required />
        <textarea
          name="bundle_name"
          required
          defaultValue={default_desc}
        ></textarea>
      </fieldset>
    </Form>
  );
}
