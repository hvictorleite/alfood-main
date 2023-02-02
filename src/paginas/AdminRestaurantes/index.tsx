import { Button, TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                <Link to={`/admin/restaurantes/${restaurante.id}/`}>[editar]</Link>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdministracaoRestaurantes;