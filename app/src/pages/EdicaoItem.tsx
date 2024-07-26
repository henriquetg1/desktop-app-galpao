import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar, Alert } from '@mui/material';
import { updateItem, deleteItem } from '../services/itemService';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';

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

const EdicaoItem: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [posicao, setPosicao] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);
  const [setorId, setSetorId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const response = await fetch(`http://localhost:8080/itens/${itemId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setNome(data.nome);
      setPosicao(data.posicao);
      setQuantidade(data.quantidade);
      setSetorId(data.setor.id);
    } catch (error) {
      console.error('Failed to load item', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!nome || !posicao || quantidade < 0) {
      setError('Todos os campos devem ser preenchidos corretamente. Quantidade não pode ser negativa.');
      return;
    }
    try {
      await updateItem(itemId, { nome, posicao, quantidade });
      navigate(`/setores/${setorId}`);
    } catch (error) {
      console.error('Failed to update item', error);
      setError('Falha ao atualizar o item.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(itemId);
      navigate(`/setores/${setorId}`);
    } catch (error) {
      console.error('Failed to delete item', error);
      setError('Falha ao excluir o item.');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 25, lineHeight: 2 }}
          color="black"
          variant="h2"
          gutterBottom
        >
          Edição de Item
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ marginBottom: 10 }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Posição"
            variant="outlined"
            fullWidth
            value={posicao}
            onChange={(e) => setPosicao(e.target.value)}
            style={{ marginBottom: 10 }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
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
            onClick={handleSave}
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
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 20, lineHeight: 1, marginTop: 5 }}
          color="black"
          variant="h4"
          gutterBottom
        >
          Deseja excluir este galpão?
        </Typography>
        <Button
          variant="contained"
          color="warning"
          onClick={handleClickOpen}
          style={{ marginTop: 20, width: '150px', padding: '10px', fontSize: '14px' }}
        >
          Excluir
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Excluir item"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja excluir este item? A exclusão é irreversível.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="info">Cancelar</Button>
            <Button onClick={handleDelete} color="warning" autoFocus>Excluir</Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={'error'} sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default EdicaoItem;
