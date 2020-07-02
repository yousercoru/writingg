import React from "react";
import moment from "moment";

function FinalizadosOrganizador({ data, history, deleteParticipanteConcurso }) {
  return (
    <div>
      <h2>Finalizados</h2>
      <table>
        <thead>
          <th>Concurso</th>
          <th>Adjudicación</th>
          <th>Premio</th>
          <th>Premiados</th>
          <th>Participantes</th>
          <th>Valoración de los participantes</th>
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
                <td>{moment(d.fechaPremiados).format("DD/MM/YYYY")}</td>
                <td>{d.primerPremio}</td>
                <td>
                  <button onClick={() => console.log("Ver")}>Ver</button>
                </td>
                <td>{d.participantes}</td>
                <td>{console.log("Valoración de los participantes")}</td>
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

export default FinalizadosOrganizador;
