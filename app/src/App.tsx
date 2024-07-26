import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriacaoGalpao from './pages/CriacaoGalpao';
import CriacaoSetor from './pages/CriacaoSetor';
import CriacaoItem from './pages/CriacaoItem';
import EdicaoGalpao from './pages/EdicaoGalpao';
import EdicaoSetor from './pages/EdicaoSetor';
import EdicaoItem from './pages/EdicaoItem';
import Galpao from './pages/Galpao'
import Setor from './pages/Setor'
import TodosItens from './pages/TodosItens';
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
      <Route path="/setores/:setorId" element={<Setor />} />
      <Route path="/setores/:setorId/itens/novo" element={<CriacaoItem />} />
      <Route path='/itens/:itemId/editar' element={<EdicaoItem />} />
      <Route path="/galpoes/:galpaoId/itens" element={<TodosItens />} />

    </Routes>
  );
}

export default App;
