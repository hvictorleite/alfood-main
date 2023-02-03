import { Button, TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get('pratos/')
      .then(response => {
        setPratos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const excluir = (pratoARemover: IPrato) => {
    http.delete(`pratos/${pratoARemover.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoARemover.id);
        setPratos(listaPratos);
      })
      .catch(error => console.log(error));
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos?.map(prato => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell><a href={prato.imagem} target='_blank' rel='noreferrer'>[Ver imagem]</a></TableCell>
              <TableCell>
                <RouterLink to={`/admin/pratos/${prato.id}/`}>[editar]</RouterLink>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(prato)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdministracaoPratos;