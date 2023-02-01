import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import AdministracaoRestaurantes from './paginas/AdminRestaurantes';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormularioRestaurante from './paginas/AdminRestaurantes/FormularioRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
    </Routes>
  );
}

export default App;
