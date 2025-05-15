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
        <label htmlFor="sale_date">Date</label>
        <input type="date" name="sale_date" id="sale_date" required />
        <label htmlFor="sale_price">Sale Amount</label>
        <input
          type="text"
          name="sale_price"
          pattern="[0-9]+\.\d\d"
          required
          placeholder="1000.12"
        />
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
