import { useState } from 'react';

interface FormValues {
  sale_date: string;
  item_id: number;
  sale_price: string;
}

export default function AddSale(props: { item_id: number }) {
  const initialState: FormValues = {
    sale_date: '',
    sale_price: '',
    item_id: props.item_id,
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

    // TODO: finish submit handler
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <input
          type="hidden"
          name="item_id"
          id="item_id"
          value={props.item_id}
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
