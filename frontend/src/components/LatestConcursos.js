import React from "react";
import { useHistory } from "react-router-dom";

function LatestConcursos({ data }) {
  const history = useHistory();
  return (
    <div className="latest-main">
      <h3>Últimos concursos publicados</h3>
      <div className="latest">
        {data &&
          data.map((concurso) => (
            <div
              className="box"
              onClick={() =>
                history.push({
                  pathname: `/concurso/${concurso.slugNombreConcurso}`,
                  state: { v: new Date().getTime() },
                })
              }
            >
              <div className="box-img">
                <img src={concurso.cartel} />
              </div>
              <div className="box-content">
                <h4>{concurso.nombreConcurso}</h4>
                <p>{concurso.primerPremio}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LatestConcursos;
