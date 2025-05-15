export default function AddSale(props: { item_id: number }) {
  return (
    <form action="/sales" method="post">
      <fieldset>
        <input
          type="hidden"
          name="item_id"
          id="item_id"
          value={props.item_id}
        />
        <label htmlFor="sale_amount">Sale Amount</label>
        <input
          type="number"
          name="sale_amount"
          id="sale_amount"
          min="0.01"
          max="1000"
          step="0.01"
          required
        />
        <label htmlFor="sale_date">Date</label>
        <input type="date" name="sale_date" id="sale_date" required />
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
