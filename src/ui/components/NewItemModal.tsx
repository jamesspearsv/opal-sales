export default function NewItemModal() {
  return (
    <>
      <button x-on:click="$refs.modal.showModal()">Open Modal</button>
      <dialog x-ref="modal">
        <article class={'new-item-modal'}>
          <button x-on:click="$refs.modal.close()">Close Modal</button>
          <div>
            <form action="/" method="post">
              <fieldset>
                <label htmlFor="name">Item Name</label>
                <input type="text" name="name" required />
                <label htmlFor="list_price">Listing Price</label>
                <input
                  type="number"
                  name="list_price"
                  min="0.01"
                  max="1000"
                  step="0.01"
                  required
                />
              </fieldset>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </article>
      </dialog>
    </>
  );
}
