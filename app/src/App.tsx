import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriacaoGalpao from './pages/CriacaoGalpao';
import CriacaoSetor from './pages/CriacaoSetor';
import EdicaoGalpao from './pages/EdicaoGalpao';
import EdicaoSetor from './pages/EdicaoSetor';
import Galpao from './pages/Galpao'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/galpoes" element={<Home />} />
      <Route path="/galpoes/criar" element={<CriacaoGalpao />} />
      <Route path="/galpoes/editar/:id" element={<EdicaoGalpao />} />
      <Route path="/galpoes/:id" element={<Galpao />} />
      <Route path="/galpoes/:id/setores/novo" element={<CriacaoSetor />} />
      <Route path="/galpoes/:id/setores/editar/:idSetor" element={<EdicaoSetor />} />


    </Routes>
  );
}

export default App;
