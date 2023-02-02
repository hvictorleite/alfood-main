import { AppBar, Box, Button, Container, TableContainer, Toolbar, Typography, Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import http from "../../http";
import IRestaurante from "../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get('restaurantes/')
      .then(response => {
        setRestaurantes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const excluir = (restauranteARemover: IRestaurante) => {
    http.delete(`restaurantes/${restauranteARemover.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteARemover.id);
        setRestaurantes(listaRestaurante);
      })
      .catch(error => console.log(error));
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurantes?.map(restaurante => (
                    <TableRow key={restaurante.id}>
                      <TableCell>{restaurante.nome}</TableCell>
                      <TableCell>
                        <RouterLink to={`/admin/restaurantes/${restaurante.id}/`}>[editar]</RouterLink>
                      </TableCell>
                      <TableCell>
                        <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>Deletar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default AdministracaoRestaurantes;