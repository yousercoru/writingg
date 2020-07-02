import React from "react";
import moment from "moment";
import MailTo from "../../MailTo";

function ActivosEscritor({ data, history, deleteParticipanteConcurso }) {
  return (
    <div>
      <h2>Estoy inscrito en</h2>
      <table>
        <thead>
          <th>Concurso</th>
          <th>Organizador</th>
          <th>Vencimiento</th>
          <th>Adjudicación</th>
          <th>Premio</th>
          <th>Obra</th>
          <th>Contactar organizador</th>
          <th>Eliminar inscripción</th>
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
                <td>{d.organizador}</td>
                <td>{moment(d.fechaVencimiento).format("DD/MM/YYYY")}</td>
                <td>{moment(d.fechaPremiados).format("DD/MM/YYYY")}</td>
                <td>{d.primerPremio}</td>
                <td>
                  <button>
                    <a href={d.obra} target="_blank">
                      Ver
                    </a>
                  </button>
                </td>
                <td>
                  <button>
                    <MailTo
                      mail={d.organizador_email}
                      subject={`[Writingg.] Consulta sobre ${d.nombreConcurso}`}
                    >
                      Contactar
                    </MailTo>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      deleteParticipanteConcurso(d.concursos_idconcursos)
                    }
                  >
                    Eliminar
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
  );
}

export default ActivosEscritor;
