import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {

  const params = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (params.id){
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)}
          id="nome-restaurante" label="Nome do Restaurante" variant="standard" fullWidth required />
        <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
      </Box>
    </Box>
    
  );
}

export default FormularioRestaurante;