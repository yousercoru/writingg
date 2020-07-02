import React from "react";

import moment from "moment";

function FinalizadosEscritor({ data, history }) {
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
          <th>Tu valoración</th>
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
                <td>Nombre y apellidos</td>
                <td>Nombre y apellidos</td>
                <td>Nombre y apellidos</td>
                <td>
                  <button>
                    <a href={d.obra} target="_blank">
                      Ver
                    </a>
                  </button>
                </td>
                <td>{console.log("Valoración de tu obra")}</td>
                <td>{console.log("Tu valoración")}</td>
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
