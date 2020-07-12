import React from "react";
import moment from "moment";

function ActivosOrganizador({ data, history, setEditNombreConcurso }) {
  return (
    <div>
      <h3>En curso</h3>
      <div className="responsive-table">
        <table>
          <thead>
            <th>Concurso</th>
            <th>Vencimiento</th>
            <th>Adjudicación</th>
            <th>Premio</th>
            <th>Participantes</th>
            <th>Editar concurso</th>
          </thead>
          <tbody>
            {data && data.activos ? (
              data.activos.map((d) => (
                <tr>
                  <td
                    onClick={() =>
                      history.push(`/concurso/${d.slugNombreConcurso}`)
                    }
                  >
                    {d.nombreConcurso}
                  </td>
                  <td>{moment(d.fechaVencimiento).format("DD/MM/YYYY")}</td>
                  <td>{moment(d.fechaPremiados).format("DD/MM/YYYY")}</td>
                  <td>{d.primerPremio}</td>
                  <td>{d.participantes}</td>
                  <td>
                    <button
                      className="dashboard-table-btn"
                      onClick={() =>
                        setEditNombreConcurso(d.slugNombreConcurso)
                      }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>loading...</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivosOrganizador;
