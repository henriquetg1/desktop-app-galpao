import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Galpao, updateGalpao, deleteGalpao } from '../services/galpaoService';
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

const EdicaoGalpao: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadGalpao();
  }, []);

  async function loadGalpao() {
    fetch(`http://localhost:8080/galpoes/${id}`, {
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then((data: Galpao) => {
      setNome(data.nome);
      setEndereco(data.endereco);
    });
  }

  const handleSave = async () => {
    await updateGalpao(id, { nome, endereco });
    navigate('/galpoes');
  };

  const handleDelete = async () => {
    await deleteGalpao(id);
    navigate('/galpoes');
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          Edição de Galpão
        </Typography>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Endereço"
          variant="outlined"
          fullWidth
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          style={{ marginBottom: 20 }}
        />
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
            onClick={() => navigate('/galpoes')}
            style={{ margin: 'auto', marginLeft: '3%', width: '150px', padding: '10px', fontSize: '14px' }}
          >
            Cancelar
          </Button>
        </Box>
        <Typography
          sx={{ display: 'block', fontWeight: 'bold', fontSize: 20, lineHeight: 1, marginTop: 5}}
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
          <DialogTitle id="alert-dialog-title">{"Confirmação de Exclusão"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja excluir este galpão?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="info">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleDelete();
                handleClose();
              }}
              color="warning"
              autoFocus
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default EdicaoGalpao;
