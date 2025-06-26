import { createBrowserRouter, RouterProvider } from 'react-router';
import IndexView from './views/IndexView';
import ItemsView from './views/ItemsView';
import SalesView from './views/SalesView';
import Nav from './components/Nav';
import '@web/styles.css';

const router = createBrowserRouter([
  { path: '/', element: <IndexView /> },
  { path: '/items', element: <ItemsView /> },
  { path: '/sales', element: <SalesView rows={[]} /> },
]);

function App() {
  return (
    <main>
      <Nav />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
