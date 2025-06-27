import type { Item } from '@packages/shared';
import { useState, type SetStateAction } from 'react';

interface BundleRequest {
  bundle_name: string;
  bundle_desc: string;
  list_price: number;
  purchase_cost: number;
  item_ids: number[];
}

export default function AddBundleForm(props: {
  items: Item[];
  setUpdater: React.Dispatch<SetStateAction<number>>;
}) {
  const initialState: BundleRequest = {
    bundle_name: '',
    bundle_desc: '',
    list_price: props.items.reduce((a, item) => a + item.list_price, 0),
    purchase_cost: props.items.reduce((a, item) => a + item.purchase_cost, 0),
    item_ids: props.items.map((item) => item.id),
  };

  const [formValues, setFormValues] = useState(initialState);

  function handleInputChange<K extends keyof BundleRequest>(
    key: K,
    value: BundleRequest[K]
  ) {
    const newValues = { ...formValues, [key]: value };
    setFormValues(newValues);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/bundle', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (!res.ok) return; // TODO: handle failed request

    console.log(await res.json());

    props.setUpdater(Math.random());
  }

  return (
    <form onSubmit={async (e) => await handleSubmit(e)}>
      <fieldset>
        <label htmlFor="bundle_name">Bundle Name</label>
        <input
          type="text"
          name="bundle_name"
          onChange={(e) =>
            handleInputChange('bundle_name', e.currentTarget.value)
          }
          required
        />
        <textarea
          name="bundle_name"
          required
          value={formValues.bundle_desc}
          onChange={(e) =>
            handleInputChange('bundle_desc', e.currentTarget.value)
          }
        ></textarea>
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
