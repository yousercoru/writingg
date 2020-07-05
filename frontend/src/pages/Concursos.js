import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  getConcursosByCategoria,
  getConcursos,
} from "../http/concursosService";

import SearchToolBar from "../components/SearchToolBar";

import moment from "moment";

function useQuery() {
  const search = useLocation().search;
  if (!search) {
    return {};
  }

  return JSON.parse(
    '{"' +
      decodeURI(search.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

function Concursos(props) {
  const [data, setData] = useState(null);
  const [params, setParams] = useState({
    keywords: "",
    categoria: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const historyParams = useParams();
  const query = useQuery();

  const history = useHistory();

  const getData = async (p) => {
    const result = await getConcursos(p);

    setData(result.data);
  };

  const search = async (p) => {
    setParams(p);
    await getData(p);
  };

  useEffect(() => {
    getData({ ...params, ...historyParams, ...query });

    return () => {};
  }, []);

  return (
    <div>
      Concursos
      <SearchToolBar
        defaultParams={{ ...historyParams, ...query }}
        onSearch={search}
      />
      <table>
        <thead>
          <th>Concurso</th>
          <th>Organizador</th>
          <th>Categoría</th>
          <th>Vencimiento</th>
          <th>Adjudicación</th>
          <th>Participación</th>
          <th>Premio</th>
        </thead>
        <tbody>
          {data ? (
            data.map((d) => (
              <tr>
                <td
                  onClick={() =>
                    history.push(`/concurso/${d.slugNombreConcurso}`)
                  }
                >
                  {d.nombreConcurso}
                </td>
                <td>{d.users_idusers}</td>
                <td>{d.categoria}</td>
                <td>{moment(d.fechaVencimiento).format("DD/MM/YYYY")}</td>
                <td>{moment(d.fechaPremiados).format("DD/MM/YYYY")}</td>
                <td>{d.participantes}</td>
                <td>{d.primerPremio}</td>
              </tr>
            ))
          ) : (
            <div>loading...</div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Concursos;
