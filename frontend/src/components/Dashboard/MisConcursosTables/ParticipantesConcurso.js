import React, { useState, useEffect } from "react";
import {
  participantesConcurso,
  setRatingObra,
} from "../../../http/concursosService";
import moment from "moment";
import MailTo from "../../MailTo";
import Rating from "react-rating";

function ParticipantesConcurso({ concursoId, setConcursoId }) {
  const [data, setData] = useState(null);
  const getData = async () => {
    const result = await participantesConcurso(concursoId);

    setData(result.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const setRating = async (users_idusers, rating) => {
    const result = await setRatingObra(concursoId, users_idusers, rating);
  };

  console.log(data);

  return (
    <div>
      <button className="dashboard-table-btn" onClick={() => setConcursoId("")}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <h3>Participantes de {data && data.length && data[0].nombreConcurso}</h3>
      <div className="responsive-table">
        <table>
          <thead>
            <th>Nombre</th>
            <th>Fecha de inscripción</th>
            <th>Obra</th>
            <th>Rating de la obra</th>
            <th>Contactar</th>
          </thead>
          <tbody>
            {data ? (
              data.map((d) => (
                <tr>
                  <td>{d.nombre}</td>
                  <td>{moment(d.created_at).format("DD/MM/YYYY")}</td>
                  <td>
                    <button className="dashboard-table-btn">
                      <a href={d.obra} target="_blank">
                        <i className="fas fa-eye"></i>
                      </a>
                    </button>
                  </td>
                  <td>
                    <Rating
                      fractions={1}
                      initialRating={d.ratingOrganizador}
                      emptySymbol="far fa-star"
                      fullSymbol="fas fa-star"
                      onClick={(val) => setRating(d.users_idusers, val)}
                    />
                  </td>
                  <td>
                    <button className="dashboard-table-btn">
                      <MailTo mail={d.email}>
                        <i className="fas fa-paper-plane"></i>
                      </MailTo>
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

export default ParticipantesConcurso;
