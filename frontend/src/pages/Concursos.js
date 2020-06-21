import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getConcursosByCategoria,
  getConcursos,
} from "../http/concursosService";
import SearchToolBar from "../components/SearchToolBar";

function Concursos(props) {
  const [data, setData] = useState(null);
  const [params, setParams] = useState({
    keywords: "",
    categoria: "",
    fechas: "",
  });

  const historyParams = useParams();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const result = await getConcursos(params);

      setData(result.data);
    };
    getData();

    return () => {};
  }, []);

  return (
    <div>
      Concursos
      <SearchToolBar />
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
                <td>{d.fechaVencimiento}</td>
                <td>{d.fechaPremiados}</td>
                <td>{"Nº participantes"}</td>
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
