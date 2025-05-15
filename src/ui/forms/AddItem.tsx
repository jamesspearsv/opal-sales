export default function NewItem() {
  return (
    <form action="/" method="post">
      <fieldset>
        <label htmlFor="name">Item Name</label>
        <input type="text" name="name" required />
        <label htmlFor="list_price">Listing Price</label>
        <input
          type="text"
          name="list_price"
          pattern="[0-9]+\.\d\d"
          placeholder="1000.12"
          required
        />
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
