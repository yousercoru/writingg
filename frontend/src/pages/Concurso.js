import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getConcurso } from "../http/concursosService";

// const data = {
//   idconcursos: "95978322-97ec-4389-bb1e-1b445da654f1",
//   users_idusers: "a4cbaa24-8019-4518-a7bd-653364164070",
//   created_at: "2020-06-14T17:58:56.000Z",
//   nombreConcurso: "V concurso jóvenes escritores Estrella Galicia",
//   bases:
//     "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
//   fechaVencimiento: "31/12/2020",
//   primerPremio: "18000",
//   segundoPremio: null,
//   tercerPremio: null,
//   fechaPremiados: "5/01/2021",
//   ganador: null,
//   segundo: null,
//   tercero: null,
//   cartel: null,
//   bases_pdf: null,
//   updated_at: null,
//   deleted_at: null,
//   categoria: "Novela",
//   nextConcursos: [
//     {
//       id: "",
//       nombre: "Concurso 2",
//     },
//     {
//       id: "",
//       nombre: "Concurso 3",
//     },
//   ],
// };

function Concurso() {
  const [data, setData] = useState(null);

  const historyParams = useParams();

  useEffect(() => {
    const getDataConcurso = async () => {
      const result = await getConcurso(historyParams.slugNombreConcurso);

      setData(result.data.data);
    };
    getDataConcurso();

    return () => {};
  }, []);

  const mailTo = () => {
    return `mailto:abc@example.com?subject = Feedback&body = Message`;
  };

  // si no se han cargado los datos
  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div style={{ marginTop: "15em" }}>
      <div className="container-top">
        <div className="first-colunm">
          <div>
            <h1>{data.nombreConcurso}</h1>
          </div>
          <div className="details-container">
            <div>{data.cartel}</div>
            <div>
              <h2>Detalles:</h2>
              <ul className="ul-details">
                <li>
                  <p>Categoría:</p>
                  <p>{data.categoria}</p>
                </li>
                <li>
                  <p>Organizador:</p>
                  <p>{data.users_idusers}</p>
                </li>
                <li>
                  <p>Premio:</p>
                  <p>{data.primerPremio}</p>
                </li>

                {data.segundoPremio && (
                  <li>
                    <p>Segundo premio:</p>
                    <p>{data.segundoPremio}</p>
                  </li>
                )}
                {data.tercerPremio && (
                  <li>
                    <p>Tercer premio:</p>
                    <p>{data.tercerPremio}</p>
                  </li>
                )}
                <li>
                  <p>Fecha cierre:</p>
                  <p>{data.fechaVencimiento}</p>
                </li>
                <li>
                  <p>Entrega premios:</p>
                  <p>{data.fechaPremiados}</p>
                </li>
              </ul>
            </div>
            <div>
              <h2>Bases:</h2>
              <div dangerouslySetInnerHTML={{ __html: data.bases }} />
            </div>
          </div>
        </div>
        <div className="second-column">
          <h4>{data.nombreConcurso}</h4>
          <button className="participar-button">Participar</button>
          <div>
            <span>{data.categoria}</span>
            <span>{data.primerPremio}</span>
            <span>{data.fechaVencimiento}</span>
          </div>
          <div>
            <h4>Compartir</h4>
            <div>
              <a>In</a>
              <a>Fb</a>
              <a>Tw</a>
              <a>Ln</a>
            </div>
          </div>
          <button>
            <a href={mailTo()}>¿Alguna duda? Escribe al organizador</a>
          </button>
        </div>
      </div>
      <div>
        Irá un componente (Últimos concursos publicados: Novela)
        {data.nextConcursos.map((concurso) => (
          <div>
            <img src="" />
            <h4>{concurso.nombre}</h4>
            <p>31/12/2020</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Concurso;
