import { AppBar, Button, Box, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {

  const params = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (params.id) {
      http.get<IRestaurante>(`restaurantes/${params.id}/`)
        .then(response => {
          setNomeRestaurante(response.data.nome);
        })
        .catch(error => console.log(error));
    }
  }, [params]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (params.id) {
      http.put(`restaurantes/${params.id}/`, { nome: nomeRestaurante })
        .then(() => alert('Restaurante atualizado com sucesso'))
        .catch(error => console.log(error));
    }
    else {
      http.post('restaurantes/', { nome: nomeRestaurante })
        .then(() => alert('Restaurante cadastrado com sucesso'))
        .catch(error => console.log(error));
    }

    console.log('Enviando dados para a API');
    console.log(nomeRestaurante);
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to='/admin/restaurantes'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to='/admin/restaurantes/novo'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
             </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ marginTop: 1 }}>
          <Paper sx={{ padding: 2 }}>
            {/* Conteúdo da página */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
              <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
              <Box component="form" onSubmit={aoSubmeterForm}>
                <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)}
                  id="nome-restaurante" label="Nome do Restaurante" variant="standard" fullWidth required />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default FormularioRestaurante;