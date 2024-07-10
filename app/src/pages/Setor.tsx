import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography, createTheme, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import { getSetor, Setor } from '../services/setorService';
import { getItensPorSetor, Item } from '../services/itemService';

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

const ItemPage = () => {
  const [setor, setSetor] = useState<Setor | null>(null);
  const [itens, setItens] = useState<Item[]>([]);
  const navigate = useNavigate();
  const { setorId } = useParams();

  useEffect(() => {
    getSetor(setorId!)
      .then((data) => {
        console.log('Setor data:', data); // Log dos dados recebidos
        setSetor(data);
        return getItensPorSetor(setorId!); // Buscar itens do setor separadamente
      })
      .then((itensData) => {
        console.log('Itens data:', itensData); // Log dos itens recebidos
        setItens(itensData);
      })
      .catch(() => navigate('/404'));
  }, [setorId, navigate]);

  const handleItemClick = (itemId: string) => {
    navigate(`/itens/${itemId}/detalhes`);
  };

  const handleEditItemClick = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/itens/${itemId}/editar`);
  };

  const handleNavigateNovoItem = () => {
    navigate(`/setores/${setorId}/itens/novo`);
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
          Setor: {setor?.nome}
        </Typography>
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 20, lineHeight: 1, marginTop: 5 }}
          color="black"
          variant="h4"
          gutterBottom
        >
          Itens
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {itens.length === 0 ? (
            <Typography variant="body1">Nenhum item encontrado.</Typography>
          ) : (
            itens.map((item) => (
              <Button
                key={item.id}
                variant="contained"
                color="secondary"
                onClick={() => handleItemClick(item.id)}
                sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, width: '50%', marginBottom: 2 }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{ display: 'block', fontWeight: 'bold', fontSize: 16, lineHeight: 1, marginBottom: 2, marginTop: 1.5 }}
                    color="inherit"
                    variant="h6"
                    gutterBottom
                  >
                    {item.nome}
                  </Typography>
                  <Typography
                    sx={{ display: 'block', fontSize: 14, lineHeight: 1, marginBottom: 1.5 }}
                    color="inherit"
                    variant="h6"
                    gutterBottom
                  >
                    {item.posicao}
                  </Typography>
                  <Typography
                    sx={{ display: 'block', fontSize: 14, lineHeight: 1, marginBottom: 1.5 }}
                    color="inherit"
                    variant="h6"
                    gutterBottom
                  >
                    {item.quantidade}
                  </Typography>
                </Box>
                <IconButton
                  aria-label="edit"
                  color='inherit'
                  onClick={(e) => handleEditItemClick(item.id, e)}
                >
                  <EditIcon />
                </IconButton>
              </Button>
            ))
          )}
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateNovoItem}
            style={{ margin: 'auto', marginRight: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Novo Item
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate(`/galpoes`)}
            style={{ margin: 'auto', marginLeft: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Voltar
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ItemPage;
