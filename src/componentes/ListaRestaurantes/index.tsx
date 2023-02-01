import { Button, TextField } from '@mui/material';
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
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca;
    }
    carregarDados(`${uriBaseApi}/restaurantes/`, opcoes);
  };

  return (
    <section className={style.ListaRestaurantes}>
      <form onSubmit={buscaRestaurantes}>
        <TextField onChange={evento => setBusca(evento.target.value)} fullWidth id='buscar-restaurantes' label='Buscar restaurantes...' type='search' variant='standard'/>
        <Button type='submit' variant='outlined'>Buscar</Button>
      </form>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Página Anterior</button>}
      {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>}
    </section>)
}

export default ListaRestaurantes