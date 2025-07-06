import { createBrowserRouter, RouterProvider } from 'react-router';
import HomeView from '@web/views/HomeView';
import ItemsView from '@web/views/ItemsView';
import SalesView from '@web/views/SalesView';
import Nav from './components/Nav';
import '@web/styles.css';

const router = createBrowserRouter([
  { path: '/', element: <HomeView /> },
  { path: '/items', element: <ItemsView /> },
  { path: '/sales', element: <SalesView /> },
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
