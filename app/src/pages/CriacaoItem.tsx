import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import { createItem } from '../services/itemService';
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

const CriacaoItem = () => {
  const [nome, setNome] = useState<string>('');
  const [posicao, setPosicao] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { galpaoId, setorId } = useParams<{ galpaoId: string; setorId: string }>();

  const handleCreate = async () => {
    if (!nome || !posicao || quantidade < 0) {
      setError('Todos os campos devem ser preenchidos corretamente. Quantidade não pode ser negativa.');
      return;
    }
    try {
      console.log('Creating item with:', galpaoId, setorId, { nome, posicao, quantidade });
      await createItem(setorId, { nome: nome, posicao: posicao, quantidade: quantidade });
      navigate(`/setores/${setorId}`);
    } catch (error) {
      console.error('Error creating item:', error);
      setError('Erro ao criar o item. Tente novamente mais tarde.');
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
          Criação de Item
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ marginBottom: 20, width: '450px' }}
          />
          <TextField
            label="Posição"
            variant="outlined"
            fullWidth
            value={posicao}
            onChange={(e) => setPosicao(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="Quantidade"
            variant="outlined"
            fullWidth
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            style={{ marginBottom: 20, width: '450px' }}
          />
        </Box>
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
            onClick={() => navigate(`/setores/${setorId}`)}
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

export default CriacaoItem;
