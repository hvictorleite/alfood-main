import axios from 'axios';
import { useEffect, useState } from 'react';
import IPaginacao from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const uriBaseApi = 'http://localhost:8000/api/v1';
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  useEffect(() => {
    // obter restaurantes
    carregarDados(`${uriBaseApi}/restaurantes/`);
  }, []);

  const carregarDados = (endpoint: string) => {
    axios.get<IPaginacao<IRestaurante>>(endpoint)
      .then(response => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
        setPaginaAnterior(response.data.previous);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Página Anterior</button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>}
  </section>)
}

export default ListaRestaurantes