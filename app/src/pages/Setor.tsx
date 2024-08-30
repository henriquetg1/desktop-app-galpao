import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography, createTheme, IconButton, CircularProgress, TextField, InputAdornment, FormControl, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/system';

import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import * as XLSX from "xlsx";

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

// Variantes de animação para o container
const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, type: 'spring' },
  },
};

const ItemPage = () => {
  const [setor, setSetor] = useState<Setor | null>(null);
  const [itens, setItens] = useState<Item[]>([]);
  const [filteredItens, setFilteredItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState(''); // Opção de filtro
  const [searchField, setSearchField] = useState('nome'); // Campo de pesquisa
  const navigate = useNavigate();
  const { setorId } = useParams();

  useEffect(() => {
    setLoading(true);
    getSetor(setorId!)
      .then((data) => {
        setSetor(data);
        return getItensPorSetor(setorId!); // Buscar itens do setor separadamente
      })
      .then((itensData) => {
        setItens(itensData);
        setFilteredItens(itensData); // Inicialmente, filtrar pelos itens completos
        setLoading(false);
      })
      .catch(() => navigate('/404'));
  }, [setorId, navigate]);

  useEffect(() => {
    const searchAndFilter = () => {
      let updatedItens = itens;

      // Aplicar filtro de pesquisa
      if (searchTerm.trim() !== '') {
        updatedItens = updatedItens.filter(item =>
          // @ts-ignore
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

  const handleEditItemClick = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/itens/${itemId}/editar`);
  };

  const handleNavigateNovoItem = () => {
    navigate(`/setores/${setorId}/itens/novo`);
  };

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
      Posição: item.posicao,
      Quantidade: item.quantidade,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData); // Converter dados para planilha
    const workbook = XLSX.utils.book_new(); // Criar novo livro para a planilha
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Itens'); // Adicionar planilha ao livro
    const fileName = setor ? `itens_${setor.nome}.xlsx` : 'itens.xlsx';
    XLSX.writeFile(workbook, fileName); // Exportar para arquivo Excel
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
          Setor: {setor?.nome}
        </Typography>
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 20, lineHeight: 1, marginTop: 5, marginBottom: 2}}
          color="black"
          variant="h4"
          gutterBottom
        >
          Itens:
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
                // @ts-ignore
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
                // @ts-ignore
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
            <Typography variant="body1">Nenhum item encontrado.</Typography>
          ) : (
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Posição</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.nome}</TableCell>
                      <TableCell>{item.posicao}</TableCell>
                      <TableCell>{item.quantidade}</TableCell>
                      <TableCell>
                        <IconButton
                          color="info"
                          onClick={(e) => handleEditItemClick(item.id, e)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
          <br />
          <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateNovoItem}
              style={{ margin: 'auto', marginRight: '1.5%', width: '150px', padding: '10px', fontSize: '14px' }}
            >
              Novo Item
            </Button>
            <Button
            variant="outlined"
            color="info"
            onClick={() => navigate(`/galpoes/${setor?.galpao.id}`)}
            style={{ margin: 'auto', marginLeft: '1.5%', width: '150px', padding: '10px', fontSize: '14px' }}
            >
              Cancelar
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleExportToExcel}
            style={{ margin: 'auto', marginTop: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Exportar para Excel
          </Button>
      </Container>
    </ThemeProvider>
  );
};

export default ItemPage;
