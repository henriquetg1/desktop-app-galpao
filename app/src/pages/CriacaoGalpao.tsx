import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import { createGalpao } from '../services/galpaoService';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';

// Tema personalizado
const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif'
  },
  palette: {
    primary: {
      main: '#006437', // Verde do Palmeiras
    },
    secondary: {
      main: '#1D78AC', // Azul mais claro
    },
    warning: {
      main: '#C40F0F', // Vermelho
    },
    info: {
      main: '#000000', // Preto
    },
  }
});

const CriacaoGalpao: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!nome || !endereco) {
      setError('Todos os campos devem ser preenchidos.');
      return;
    }
    try {
      await createGalpao({ nome, endereco });
      navigate('/galpoes');
    } catch (error) {
      setError('Erro ao criar o galpão. Tente novamente mais tarde.');
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 25, lineHeight: 2 }}
          color="black"
          variant="h2"
          gutterBottom
        >
          Criação de Galpão
        </Typography>
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
        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ margin: 'auto', marginRight: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Salvar
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate('/galpoes')}
            style={{ margin: 'auto', marginLeft: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Cancelar
          </Button>
        </Box>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={'error'} sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default CriacaoGalpao;
