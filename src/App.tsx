import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import AdminRestaurantes from './paginas/AdminRestaurantes';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantes />} />
    </Routes>
  );
}

export default App;
