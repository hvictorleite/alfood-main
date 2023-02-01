import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {

  const uriBaseApi = 'http://localhost:8000/api/v2';
  const params = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (params.id){
      axios.get<IRestaurante>(`${uriBaseApi}/restaurantes/${params.id}/`)
        .then(response => {
          setNomeRestaurante(response.data.nome);
        })
        .catch(error => console.log(error));
    }
  }, [params]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (params.id) {
      axios.put(`${uriBaseApi} + '/restaurantes/${params.id}`, { nome: nomeRestaurante })
      .then(() => alert('Restaurante atualizado com sucesso'))
      .catch(error => console.log(error));
    }
    else {
      axios.post(uriBaseApi + '/restaurantes/', { nome: nomeRestaurante })
      .then(() => alert('Restaurante cadastrado com sucesso'))
      .catch(error => console.log(error));
    }

    console.log('Enviando dados para a API');
    console.log(nomeRestaurante);
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)}
        id="standart-basic" label="Nome do Restaurante" variant="standard" />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  );
}

export default FormularioRestaurante;