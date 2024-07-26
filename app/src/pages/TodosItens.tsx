import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography, createTheme, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/system';
import { Item, getItensPorGalpao } from '../services/itemService';
import * as XLSX from "xlsx";

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

const TodosItens = () => {
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const { galpaoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getItensPorGalpao(galpaoId!)
      .then((itensData) => {
        setItens(itensData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar itens do galpão:', error);
        setLoading(false);
      });
  }, [galpaoId]);

  const handleExportToExcel = () => {
    const exportData = itens.map(item => ({
      Nome: item.nome,
      Setor: item.setor.nome, // Ajustar conforme a estrutura de item.setor
      Posição: item.posicao,
      Quantidade: item.quantidade,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData); // Converter dados para planilha
    const workbook = XLSX.utils.book_new(); // Criar novo livro para a planilha
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Itens'); // Adicionar planilha ao livro
    XLSX.writeFile(workbook, 'todosositens.xlsx'); // Exportar para arquivo Excel
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
          Todos os Itens do Galpão
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : itens.length === 0 ? (
          <Typography variant="body1">Nenhum item encontrado para este galpão.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Setor</TableCell>
                  <TableCell>Posição</TableCell>
                  <TableCell>Quantidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itens.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.setor.nome}</TableCell> 
                    <TableCell>{item.posicao}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <br />
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate(`/galpoes/${galpaoId}`)}
            style={{ margin: 'auto', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Cancelar
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleExportToExcel}
          style={{ margin: 'auto', marginTop: '4%', width: '150px', padding: '10px', fontSize: '14px' }}
        >
          Exportar para Excel
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default TodosItens;
