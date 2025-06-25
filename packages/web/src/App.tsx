import { BrowserRouter, Route, Routes } from 'react-router';
import IndexView from './views/IndexView';
import ItemsView from './views/ItemsView';
import SalesView from './views/SalesView';
import Nav from './components/Nav';
import '@web/styles.css';

function App() {
  return (
    <main>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexView />} />
          <Route path="/items" element={<ItemsView />} />
          <Route path="/sales" element={<SalesView rows={[]} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
