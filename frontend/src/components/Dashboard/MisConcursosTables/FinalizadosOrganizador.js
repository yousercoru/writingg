import React from "react";
import moment from "moment";
import Rating from "react-rating";

function FinalizadosOrganizador({
  data,
  history,
  setEditNombreConcurso,
  setWinnersConcurso,
  setConcursoId,
}) {
  return (
    <div className="margin-top50">
      <h3>Finalizados</h3>
      <div className="responsive-table">
        <table>
          <thead>
            <th>Concurso</th>
            <th>Adjudicación</th>
            <th>Premio</th>
            <th>Premiados</th>
            <th>Participantes</th>
            <th>Ver participantes y obras</th>
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
                    <button
                      className="dashboard-table-btn"
                      onClick={() => {
                        setEditNombreConcurso(d.slugNombreConcurso);
                        setWinnersConcurso(true);
                        history.push(`/dashboard/MisConcursos#premiados`);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                  <td>{d.participantes}</td>
                  <td>
                    <button
                      className="dashboard-table-btn"
                      onClick={() => {
                        setConcursoId(d.idconcursos);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                  <td>
                    {d.avgRatingConcurso ? (
                      <Rating
                        fractions={2}
                        initialRating={d.avgRatingConcurso}
                        emptySymbol="far fa-star"
                        fullSymbol="fas fa-star"
                        readonly
                      />
                    ) : (
                      "-"
                    )}
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

export default FinalizadosOrganizador;
