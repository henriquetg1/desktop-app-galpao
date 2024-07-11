import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography, createTheme, IconButton, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/system';
import { Galpao, getGalpao } from '../services/galpaoService';
import { Setor } from '../services/setorService';
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
    warning: {
      main: '#C40F0F', // Vermelho
    },
    info: {
      main: '#000000', // Preto
    },
  }
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

const GalpaoPage = () => {
    const [galpao, setGalpao] = useState<Galpao | null>(null);
    const [setores, setSetores] = useState<Setor[]>([]);
    const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        getGalpao(id!)
            .then((data) => {
                setGalpao(data);
                setSetores(data.setores || []);
                setLoading(false);
            })
            .catch(() => navigate('/404'));
            setLoading(false);
    }, [id, navigate]);

    const handleSetorClick = (setorId) => {
        navigate(`/setores/${setorId}`);
    };

    const handleEditSetorClick = (setorId, e) => {
        e.stopPropagation();
        navigate(`/galpoes/${id}/setores/editar/${setorId}`);
    };

    const handleNavigateNovoSetor = () => {
        navigate(`/galpoes/${id}/setores/novo`);
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
              Galpão: {galpao?.nome}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography
                sx={{ display: 'block', fontWeight: 'bold', fontSize: 20, lineHeight: 1, marginTop: 5, marginBottom: 2}}
                color="black"
                variant="h4"
                gutterBottom
              >
                Acesse os setores cadastrados abaixo:
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  <CircularProgress />
                </Box>
              ) : setores.length > 0 ? (
                setores.map((setor) => (
                  <Box key={setor.id} sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleSetorClick(setor.id)}
                      sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}
                    >
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography
                          sx={{ display: 'block', fontWeight: 'bold', fontSize: 16, lineHeight: 1, marginBottom: 2, marginTop: 1.5}}
                          color="inherit"
                          variant="h6"
                          gutterBottom
                        >
                          {setor.nome || 'Nome do setor não disponível'}
                        </Typography>
                      </Box>
                      <IconButton
                        aria-label="edit"
                        color='inherit'
                        onClick={(e) => {
                          e.stopPropagation(); // Impede o clique no ícone de navegar para a página de detalhes
                          handleEditSetorClick(setor.id, e);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography>Nenhum setor disponível</Typography>
              )}
            </Box>
            <br />
            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateNovoSetor}
                style={{ margin: 'auto', marginRight: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
              >
                Novo Setor
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
          </Container>
        </ThemeProvider>
    );
};

export default GalpaoPage;
