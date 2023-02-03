import { Button, Box, TextField, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioPrato = () => {

  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<{tags: ITag[]}>('tags/')
      .then(response => setTags(response.data.tags))
      .catch(error => console.log(error));

    http.get<IRestaurante[]>('restaurantes/')
      .then(response => setRestaurantes(response.data))
      .catch(error => console.log(error));
  }, []);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    }
    else setImagem(null);
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();
    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if (imagem)
      formData.append('imagem', imagem);

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    .then(() => alert('Prato cadastrado com sucesso!'))
    .catch(error => console.log(error));

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={evento => setNomePrato(evento.target.value)}
          id="nome-prato" label="Nome do Prato" variant="standard" fullWidth required />
        <TextField value={descricao} onChange={evento => setDescricao(evento.target.value)}
          id="descricao-prato" label="Descrição" variant="standard" fullWidth required />
        {/* Select para Tags */}
        <FormControl margin="dense" fullWidth>
          <InputLabel id='label-ordenar'>Tag</InputLabel>
          <Select
            labelId='tag'
            id='select-tag'
            value={tag}
            label='Tag'
            onChange={evento => setTag(evento.target.value)}>
            {tags.map(tag =>
              <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
            )}
          </Select>
        </FormControl>
        {/*  */}
        {/* Select para Restaurantes */}
        <FormControl margin="dense" fullWidth>
          <InputLabel id='label-ordenar'>Restaurante</InputLabel>
          <Select
            labelId='restaurante'
            id='select-restaurante'
            value={restaurante}
            label='Restaurante'
            onChange={evento => setRestaurante(evento.target.value)}>
            {restaurantes.map(restaurante =>
              <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>
            )}
          </Select>
        </FormControl>
        {/*  */}
        {/* Input de imagem */}
        <input type='file' onChange={selecionarArquivo} />
        {/*  */}
        <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
      </Box>
    </Box>
  );
}

export default FormularioPrato;