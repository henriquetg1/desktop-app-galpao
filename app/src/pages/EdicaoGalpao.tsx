// Edição do galpão

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import { Galpao, updateGalpao } from '../services/galpaoService';

const EdicaoGalpao: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadGalpao();
  }, []);

  async function loadGalpao() {
    fetch(`http://localhost:8080/galpoes/${id}`, {
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then((data: Galpao) => {
      setNome(data.nome);
      setEndereco(data.endereco);
    });
  }

  const handleSave = async () => {
    await updateGalpao(id, { nome, endereco });
    navigate('/galpoes');
  };

  return (
    <Container>
      <h1>Editar Galpão</h1>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <TextField
        label="Endereço"
        variant="outlined"
        fullWidth
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Salvar
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/galpoes')}
        style={{ marginLeft: 10 }}
      >
        Cancelar
      </Button>
    </Container>
  );
}

export default EdicaoGalpao;