import { useState } from 'react';

interface FormState {
  name: string;
  purchase_cost: string;
  list_price: string;
}

const initialState: FormState = { name: '', purchase_cost: '', list_price: '' };

export default function NewItem() {
  const [formValues, setFormValues] = useState(initialState);

  function handleInputChange<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    const newValues = { ...formValues, [key]: value };
    setFormValues(newValues);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    });

    if (!res.ok) return; // TODO: add failed request handling

    setFormValues(initialState);
    console.log(await res.json());
  }

  return (
    <form onSubmit={async (e) => await handleSubmit(e)}>
      <fieldset>
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={(e) => {
            handleInputChange('name', e.currentTarget.value);
          }}
          required
        />
        <label htmlFor="purchase_cost">Purchase Cost</label>
        <input
          type="text"
          name="purchase_cost"
          pattern="[0-9]+\.\d\d"
          placeholder="1000.12"
          value={formValues.purchase_cost}
          onChange={(e) => {
            handleInputChange('purchase_cost', e.currentTarget.value);
          }}
          required
        />
        <label htmlFor="list_price">Listing Price</label>
        <input
          type="text"
          name="list_price"
          pattern="[0-9]+\.\d\d"
          placeholder="1000.12"
          value={formValues.list_price}
          onChange={(e) => {
            handleInputChange('list_price', e.currentTarget.value);
          }}
          required
        />
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
