import React from "react";

import moment from "moment";

import Rating from "react-rating";
import { setRatingConcurso } from "../../../http/concursosService";

function FinalizadosEscritor({ data, history }) {
  const setRating = async (idconcursos, rating) => {
    const result = await setRatingConcurso(idconcursos, rating);
  };
  if (data && data.finalizados.length == 0) {
    return <></>;
  }
  return (
    <div>
      <h2>Concursos finalizados en los que he participado</h2>
      <table>
        <thead>
          <th>Concurso</th>
          <th>Organizador</th>
          <th>Ganador</th>
          <th>Segundo</th>
          <th>Tercero</th>
          <th>Obra</th>
          <th>Valoración de tu obra</th>
          <th>¿Qué te ha parecido el concurso?</th>
        </thead>
        <tbody>
          {data && data.finalizados ? (
            data.finalizados.map((d) => (
              <tr>
                <td
                  onClick={() =>
                    history.push(`/concurso/${d.slugNombreConcurso}`)
                  }
                >
                  {d.nombreConcurso}
                </td>
                <td>{d.organizador}</td>
                <td>{d.ganador}</td>
                <td>{d.segundo ? d.segundo : "-"}</td>
                <td>{d.tercero ? d.tercero : "-"}</td>
                <td>
                  <button>
                    <a href={d.obra} target="_blank">
                      Ver
                    </a>
                  </button>
                </td>
                <td>
                  {d.ratingOrganizador ? (
                    <Rating
                      fractions={1}
                      initialRating={d.ratingOrganizador}
                      emptySymbol="far fa-star"
                      fullSymbol="fas fa-star"
                      readonly
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <Rating
                    fractions={1}
                    initialRating={d.ratingParticipante}
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star"
                    onClick={(val) => setRating(d.concursos_idconcursos, val)}
                  />
                </td>
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

export default FinalizadosEscritor;
