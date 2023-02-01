import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {

    const uriBaseApi = 'http://localhost:8000/api/v2';
    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        axios.post(uriBaseApi + '/restaurantes/', {nome: nomeRestaurante})
          .then(() => alert('Restaurante cadastrado com sucesso'))
          .catch(error => console.log(error));

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