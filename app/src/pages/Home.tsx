import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, List, TextField, ListItem, ListItemText, Typography, Divider, IconButton, ListItemAvatar, Avatar, Container, createTheme, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';

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
    text: {
      primary: '#000000', // Preto
    },
    background: {
      default: '#ffffff',
    },
  },
});

// Variantes de animação para o container
const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, type: 'spring' },
  },
};

// Função que retorna a página Home
export default function Home() {
  const [data, setData] = useState([]); // Estado para armazenar dados dos galpões (nome e endereço)
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const navigate = useNavigate(); // Hook para navegação

  // Carrega os dados dos galpões ao montar o componente
  useEffect(() => {
    loadGalpoes();
  }, []);

  // Função para carregar os dados dos galpões
  async function loadGalpoes() {
    setLoading(true);
    fetch('http://localhost:8080/galpoes', {
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then(data => {
      setData(data);
      setLoading(false);
    }).catch(() => {
      setData([]); // Define os dados como um array vazio em caso de erro
      setLoading(false);
    });
  }

  // Manipulador para clicar em um galpão e navegar para a página de detalhes
  const handleGalpaoClick = (id) => {
    navigate(`/galpoes/${id}`);
  };

  // Manipulador para clicar no ícone de edição e navegar para a página de edição
  const handleEditClick = (id) => {
    navigate(`/galpoes/editar/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component={motion.div} initial="hidden" animate="visible" variants={containerVariants} sx={{ textAlign: 'center' }}>
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 25, lineHeight: 2 }}
          color="black"
          variant="h2"
          gutterBottom
        >
          Bem-vindo Sr. Waldir José Turco!
        </Typography>
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 20, lineHeight: 1, marginTop: 5}}
          color="black"
          variant="h4"
          gutterBottom
        >
          Acesse os galpões disponíveis:
        </Typography>
        <br />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : data.length > 0 ? (
          <List sx={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
            {data.map((galpao) => (
              <Box key={galpao.id} sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => handleGalpaoClick(galpao.id)}
                  sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography
                      sx={{ display: 'block', fontWeight: 'bold', fontSize: 16, lineHeight: 1, marginBottom: 2, marginTop: 1.5}}
                      color="inherit"
                      variant="h6"
                      gutterBottom
                    >
                      {galpao.nome}
                    </Typography>
                    <Typography
                      sx={{ display: 'block', fontSize: 14, lineHeight: 1, marginBottom: 1.5}}
                      color="inherit"
                      variant="h6"
                      gutterBottom
                    >
                      {galpao.endereco}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label="edit"
                    color='inherit'
                    onClick={(e) => {
                      e.stopPropagation(); // Impede o clique no ícone de navegar para a página de detalhes
                      handleEditClick(galpao.id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Button>
              </Box>
            ))}
          </List>
        ) : (
          <Typography
            sx={{ display: 'inline', fontWeight: 'bold', fontSize: 20, lineHeight: 3 }}
            color="black"
            variant="h6"
            gutterBottom
          >
            Não há galpões cadastrados
          </Typography>
        )}
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/galpoes/criar')}
          sx={{ display: 'block', margin: 'auto', width: '150px', padding: '10px', fontSize: '14px'}}
        >
          Criar Galpão
        </Button>
      </Container>
    </ThemeProvider>
  );
}
