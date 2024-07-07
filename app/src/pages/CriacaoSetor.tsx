import { Box, Button, Container, TextField, Typography, createTheme } from '@mui/material';
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
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCreate = async () => {
    await createSetor(id, { nome: setor });
    navigate(`/galpoes/${id}`);
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
        style={{ marginBottom: 20}}
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
      </Container>
    </ThemeProvider>
  );
};

export default CriacaoSetor;