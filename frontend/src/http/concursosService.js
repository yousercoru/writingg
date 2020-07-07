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

export function addParticipante(idconcursos) {
  return clientApi
    .getClient()
    .post(`/api/concurso-participante/${idconcursos}`);
}

export function deleteParticipante(idconcursos) {
  return clientApi
    .getClient()
    .delete(`/api/concurso-participante/${idconcursos}`);
}

export function addDocToParticipante(idconcursos, formData) {
  return clientApi
    .getClient()
    .post(`/api/concursos/${idconcursos}/obra`, formData);
}

//TODO
export function createConcursos(body) {
  return clientApi.getClient().post(`api/concursos`, body);
}

export function editConcursos(idconcursos, body) {
  return clientApi.getClient().put(`api/concursos/${idconcursos}`, body);
}

export function misConcursosEscritor() {
  return clientApi.getClient().get(`api/concursos-participante`);
}

export function misConcursosOrganizador() {
  return clientApi.getClient().get(`api/concursos-organizador`);
}

export function setRatingConcurso(idconcursos, rating) {
  return clientApi
    .getClient()
    .put(`api/concurso/${idconcursos}/rating-concurso`, { rating });
}

export function setRatingObra(idconcursos, users_idusers, rating) {
  return clientApi
    .getClient()
    .put(`api/concurso/${idconcursos}/${users_idusers}/rating-obra`, {
      rating,
    });
}

export function participantesConcurso(idconcursos) {
  return clientApi
    .getClient()
    .get(`api/concursos/${idconcursos}/participantes-concurso`);
}
