import type { Item } from '@packages/shared';
import { useState, type SetStateAction } from 'react';

interface FormValues {
  sale_date: string;
  item_id: number;
  sale_price: string;
}

export default function AddSale(props: {
  item: Item;
  setUpdater: React.Dispatch<SetStateAction<number>>;
}) {
  const initialState: FormValues = {
    sale_date: '',
    sale_price: '',
    item_id: props.item.id,
  };

  const [formValues, setFormValues] = useState(initialState);

  function handleInputChange<K extends keyof FormValues>(
    key: K,
    value: FormValues[K]
  ) {
    const newValues = { ...formValues, [key]: value };
    setFormValues(newValues);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (!res.ok) return; // TODO: handle failed request

    const json = await res.json();
    console.log(json);

    setFormValues(initialState);
    props.setUpdater(Math.random());
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <input
          type="hidden"
          name="item_id"
          id="item_id"
          value={props.item.id}
        />
        <label htmlFor="sale_date">Date</label>
        <input
          type="date"
          name="sale_date"
          id="sale_date"
          required
          value={formValues.sale_date}
          onChange={(e) => {
            handleInputChange('sale_date', e.currentTarget.value);
          }}
        />
        <label htmlFor="sale_price">Sale Amount</label>
        <input
          type="text"
          name="sale_price"
          pattern="[0-9]+\.\d\d"
          required
          placeholder="1000.12"
          value={formValues.sale_price}
          onChange={(e) => {
            handleInputChange('sale_price', e.currentTarget.value);
          }}
        />
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
