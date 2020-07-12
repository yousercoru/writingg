import React from "react";
import { useHistory } from "react-router-dom";

import "../css/latest-concursos.css";

function LatestConcursos({ data, title }) {
  const history = useHistory();
  return (
    <div className="latest-main">
      <div className="latest-titulo">
        <h3>{title}</h3>
      </div>
      <div className="latest">
        {data &&
          data.map((concurso) => (
            <div
              className="box"
              onClick={() => {
                history.push({
                  pathname: `/concurso/${concurso.slugNombreConcurso}#`,
                  state: { v: new Date().getTime() },
                });
                window.location.reload();
              }}
            >
              <div className="box-img">
                <img
                  src={
                    concurso.cartel
                      ? concurso.cartel
                      : "https://picsum.photos/id/1073/200/300"
                  }
                />
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
