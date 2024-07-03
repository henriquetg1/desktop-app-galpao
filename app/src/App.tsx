import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriacaoGalpao from './pages/CriacaoGalpao';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/galpoes" element={<Home />} />
      <Route path="/galpoes/criar" element={<CriacaoGalpao />} />

    </Routes>
  );
}

export default App;
