import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, List, TextField, ListItem, ListItemText, Typography, Divider, IconButton, ListItemAvatar, Avatar, Container, createTheme, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


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

  return (
    <Container component={motion.div} initial="hidden" animate="visible" variants={containerVariants} sx={{ textAlign: 'center' }}>
      <Typography
        sx={{ display: 'inline', fontWeight: 'bold', fontSize: 30, lineHeight: 3 }}
        color="black"
        variant="h2"
        gutterBottom
      >
        Bem-vindo ao Sistema de Gerenciamento de Galpões
      </Typography>
      <br />
      <Typography
        sx={{ display: 'inline', fontWeight: 'bold', fontSize: 30, lineHeight: 3 }}
        color="black"
        variant="h6"
        gutterBottom
      >
        Galpões
      </Typography>
      <br />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
        // Verifica se existem galpoes criados:
      ) : data.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
          {data.map((galpao) => (
            <ListItem key={galpao.id} onClick={() => handleGalpaoClick(galpao.id)} button>
              <ListItemText primary={
                <Typography
                  sx={{ display: 'inline', fontWeight: 'bold', fontSize: 20, lineHeight: 3 }}
                  color="black"
                  variant="h6"
                  gutterBottom
                >
                  {galpao.nome}
                </Typography>

              } secondary={
                <Typography
                  sx={{ display: 'inline', fontWeight: 'bold', fontSize: 15, lineHeight: 3 }}
                  color="black"
                  variant="h6"
                  gutterBottom
                >
                  {galpao.endereco}
                </Typography>
              } />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          sx={{ display: 'inline', fontWeight: 'bold', fontSize: 20, lineHeight: 3 }}
          color="black"
          variant="h6"
          gutterBottom
        >
          Nenhum galpão encontrado
        </Typography>
      )}
      <br />
      {/* Botão criar galpão */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/galpoes/criar')}
      >
        Criar Galpão
      </Button>
    </Container>
  );
}