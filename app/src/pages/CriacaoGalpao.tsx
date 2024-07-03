
// Função para criar um novo galpão (nome e endereço) tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import { createGalpao } from '../services/galpaoService';

const CriacaoGalpao: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const navigate = useNavigate();

  const handleSave = async () => {
    await createGalpao({ nome, endereco });
    navigate('/galpoes');
  };
    
return (
    <Container>
    <h1>Criar Galpão</h1>
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

export default CriacaoGalpao;