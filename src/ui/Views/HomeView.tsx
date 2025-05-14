import NewItemModal from '../components/NewItemModal.js';

interface HomeProps {
  items: { id: number; name: string; list_price: number }[];
}

export default function HomeView(props: HomeProps) {
  return (
    <>
      <NewItemModal />
      <table>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>list_price</th>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.list_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
