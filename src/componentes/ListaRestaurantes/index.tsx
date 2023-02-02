import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import IPaginacao from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const uriBaseApi = 'http://localhost:8000/api/v1';
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  useEffect(() => {
    // obter restaurantes
    carregarDados(`${uriBaseApi}/restaurantes/`);
  }, []);

  const carregarDados = (endpoint: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(endpoint, opcoes)
      .then(response => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
        setPaginaAnterior(response.data.previous);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const buscaRestaurantes = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const opcoes = {
      params: {} as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca;
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao;
    }
    carregarDados(`${uriBaseApi}/restaurantes/`, opcoes);
  };

  return (
    <section className={style.ListaRestaurantes}>
      <form onSubmit={buscaRestaurantes}>
        <TextField onChange={evento => setBusca(evento.target.value)} id='buscar-restaurantes' label='Buscar restaurantes...' type='search' variant='standard' fullWidth/>
        <FormControl sx={{minWidth: 140}}>
          <InputLabel id='label-ordenar'>Ordenar por</InputLabel>
          <Select
            labelId='odernacao'
            id='select-ordenacao'
            value={ordenacao}
            label='Ordenar Por'
            onChange={evento => setOrdenacao(evento.target.value)}>
            <MenuItem value=''>Nenhum</MenuItem>
            <MenuItem value={'id'}>Id</MenuItem>
            <MenuItem value={'nome'}>Nome</MenuItem>
          </Select>
        </FormControl>

        <Button type='submit' variant='outlined'>Buscar</Button>
      </form>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Página Anterior</button>}
      {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>}
    </section>)
}

export default ListaRestaurantes