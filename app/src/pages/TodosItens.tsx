import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography, createTheme, CircularProgress, TextField, InputAdornment, IconButton, FormControl, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/system';
import { Item, getItensPorGalpao } from '../services/itemService';
import * as XLSX from "xlsx";
import SearchIcon from '@mui/icons-material/Search';

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
  const [filteredItens, setFilteredItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState(''); // Opção de filtro
  const [searchField, setSearchField] = useState('nome'); // Campo de pesquisa
  const { galpaoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getItensPorGalpao(galpaoId!)
      .then((itensData) => {
        setItens(itensData);
        setFilteredItens(itensData); // Inicialmente, filtrar pelos itens completos
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar itens do galpão:', error);
        setLoading(false);
      });
  }, [galpaoId]);

  useEffect(() => {
    const searchAndFilter = () => {
      let updatedItens = itens;

      // Aplicar filtro de pesquisa
      if (searchTerm.trim() !== '') {
        updatedItens = updatedItens.filter(item =>
          item[searchField].toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Aplicar ordenação com base na opção de filtro
      if (filterOption === 'quantidade-crescente') {
        updatedItens = [...updatedItens].sort((a, b) => a.quantidade - b.quantidade);
      } else if (filterOption === 'quantidade-decrescente') {
        updatedItens = [...updatedItens].sort((a, b) => b.quantidade - a.quantidade);
      } else if (filterOption === 'nome-ascendente') {
        updatedItens = [...updatedItens].sort((a, b) => a.nome.localeCompare(b.nome));
      } else if (filterOption === 'nome-descendente') {
        updatedItens = [...updatedItens].sort((a, b) => b.nome.localeCompare(a.nome));
      } else if (filterOption === 'posicao-ascendente') {
        updatedItens = [...updatedItens].sort((a, b) => a.posicao.localeCompare(b.posicao));
      } else if (filterOption === 'posicao-descendente') {
        updatedItens = [...updatedItens].sort((a, b) => b.posicao.localeCompare(a.posicao));
      }

      setFilteredItens(updatedItens);
    };

    searchAndFilter();
  }, [searchTerm, filterOption, searchField, itens]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterOption(event.target.value as string);
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchField(event.target.value as string);
  };

  const handleExportToExcel = () => {
    const exportData = filteredItens.map(item => ({
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <TextField
              label="Pesquisar"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControl variant="outlined" sx={{ minWidth: 275, textAlign: 'left' }}>
              <Select
                value={searchField}
                onChange={handleSearchFieldChange}
                displayEmpty
                inputProps={{ 'aria-label': 'campo de pesquisa' }}
              >
                <MenuItem value="nome">Nome</MenuItem>
                <MenuItem value="posicao">Posição</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 275, textAlign: 'left' }}>
              <Select
                value={filterOption}
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ 'aria-label': 'filtro' }}
              >
                <MenuItem value="">Sem filtro</MenuItem>
                <MenuItem value="quantidade-crescente">Quantidade (Crescente)</MenuItem>
                <MenuItem value="quantidade-decrescente">Quantidade (Decrescente)</MenuItem>
                <MenuItem value="nome-ascendente">Nome (A-Z)</MenuItem>
                <MenuItem value="nome-descendente">Nome (Z-A)</MenuItem>
                <MenuItem value="posicao-ascendente">Posição (A-Z)</MenuItem>
                <MenuItem value="posicao-descendente">Posição (Z-A)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </Box>
          ) : filteredItens.length === 0 ? (
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
                  {filteredItens.map((item) => (
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
        </Box>
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
          style={{ margin: 'auto', marginTop: '2%', width: '150px', padding: '10px', fontSize: '14px' }}
        >
          Exportar para Excel
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default TodosItens;
