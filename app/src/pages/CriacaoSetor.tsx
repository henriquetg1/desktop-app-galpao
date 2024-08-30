import { Box, Button, Container, TextField, Typography, createTheme, Snackbar, Alert } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSetor } from '../services/setorService';

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

const CriacaoSetor = () => {
  const [setor, setSetor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCreate = async () => {
    if (!id) {
      setError('ID do galpão não encontrado.');
      return;
    }
    if (!setor) {
      setError('O campo nome do setor deve ser preenchido.');
      return;
    }
    try {
      // Criar um setor sem definir o id, que será gerado pelo backend
      const novoSetor = {
        nome: setor,
        galpao: { id: id, nome: '', endereco: '' },
        itens: []
      };

      await createSetor(id, novoSetor);
      navigate(`/galpoes/${id}`);
    } catch (error) {
      console.error('Erro ao criar o setor:', error);
      setError('Erro ao criar o setor. Tente novamente mais tarde.');
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
          Criação de Setor
        </Typography>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          style={{ marginBottom: 20, width: '450px' }}
        />
        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            style={{ margin: 'auto', marginRight: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Salvar
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate(`/galpoes/${id}`)}
            style={{ margin: 'auto', marginLeft: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Cancelar
          </Button>
        </Box>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default CriacaoSetor;
