import axios from "axios";
import { clientApi } from "./apis";

// export function createConcursos() {
//     return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/concursos`, concurso);
// }

// export function searchConcursos() {
//     return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/concursos/search`);
// }

// export function getConcursos() {
//     return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/concursos`);
// }

export function getConcurso(slugNombreConcurso) {
  return clientApi.getClient().get(`api/concurso/${slugNombreConcurso}`);
}

export function getConcursos(params) {
  return clientApi.getClient().get(`api/concursos`, { params });
}

export function getConcursosByCategoria(categoria) {
  return clientApi.getClient().get(`api/concursos/${categoria}`);
}

//TODO
export function createConcursos(body) {
  return clientApi.getClient().post(`api/concursos`, body);
}
