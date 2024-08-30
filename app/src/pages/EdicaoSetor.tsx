import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { Setor, updateSetor, deleteSetor } from '../services/setorService';
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

const EdicaoSetor: React.FC = () => {
    const [nome, setNome] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const navigate = useNavigate();
    const { idSetor } = useParams<{ idSetor: string }>(); // Usar o id do setor na URL
    const { id } = useParams(); // Usar o id do galpão na URL

    useEffect(() => {
        loadSetor();
    }, []);

    async function loadSetor() {
        fetch(`http://localhost:8080/setores/${idSetor}`, { // Usar idSetor aqui
            method: 'GET',
        }).then(response => {
            return response.json();
        }).then((data: Setor) => {
            setNome(data.nome);
        });
    }

    const handleSave = async () => {
        if (!nome) {
            setSnackbarMessage('O campo nome deve ser preenchido.');
            setSnackbarOpen(true);
            return;
        }
        // @ts-ignore
        await updateSetor(idSetor, { nome }); // Usar idSetor aqui
        navigate(`/galpoes/${id}`); // Redirecionar para a lista de galpões
    };

    const handleDelete = async () => {
        // @ts-ignore
        await deleteSetor(idSetor); // Usar idSetor aqui
        navigate(`/galpoes/${id}`); // Redirecionar para a lista de galpões
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                    Edição de Setor
                </Typography>
                <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
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
                        onClick={() => navigate(`/galpoes/${id}`)}
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
                    Deseja excluir este setor?
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
                            Tem certeza que deseja excluir este setor? A exclusão é irreversível e todos os itens associados a ele serão perdidos.
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
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default EdicaoSetor;
