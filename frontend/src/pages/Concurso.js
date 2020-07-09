import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import moment from "moment";

import { useAuth } from "../context/auth-context";

import {
  getConcurso,
  addParticipante,
  addDocToParticipante,
  misConcursosEscritor,
} from "../http/concursosService";
import Modal from "../components/Modal";
import MailTo from "../components/MailTo";
import LatestConcursos from "../components/LatestConcursos";

const ModalFirstStep = ({ userLogged, data, onClick, setFile, file }) => (
  <div>
    <div>
      {userLogged && userLogged.nombre} estás a un paso de participar en el
      concurso:
    </div>
    <div>
      <h2>{data.nombreConcurso}</h2>
    </div>
    <div>
      <p>Subir PDF:</p>

      <input type="file" onChange={(e) => setFile(e.target.files)} />
    </div>

    <button onClick={onClick}>Enviar</button>
  </div>
);

const ModalContentSuccess = ({ userLogged }) => (
  <div>
    <div>
      <h2>¡Felicidades!</h2>
      <h3>
        {userLogged && userLogged.nombre} tu inscripción se ha realizado
        correctamente
      </h3>
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

    {/* Poner ruta correctamente*/}
    <Link to="/dashboard/MisConcursos">
      <button>Ir a mis concursos</button>
    </Link>
  </div>
);

const ModalContentError = ({ userLogged }) => (
  <div>
    <div>
      <h2>¡Lo sentimos! Ha habido un problema al tramitar tu solicitud</h2>
      <h3>{userLogged && userLogged.nombre} inténtalo de nuevo más tarde</h3>
    </div>
    <div>
      <h4>¿Sigues teniendo problemas</h4>
      <button>
        <a href={mailTo()}>¿Alguna duda? Escribe al organizador</a>
      </button>
    </div>
  </div>
);

const mailTo = () => {
  return `mailto:abc@example.com?subject = Feedback&body = Message`;
};

function Concurso() {
  const [data, setData] = useState(null);
  const [inscrito, setInscrito] = useState(null);
  const [modalOpen, toggleModal] = useState(false);
  const [modalContent, setModalContent] = useState("ModalFirstStep");

  const [file, setFile] = useState(null);

  const historyParams = useParams();

  const { currentUser, userLogged } = useAuth();

  useEffect(() => {
    const getDataConcurso = async () => {
      const result = await getConcurso(historyParams.slugNombreConcurso);
      const concursoData = result.data.data;

      try {
        const concursos = await misConcursosEscritor();

        const isInscrito = concursos.data.activos.find(
          (concurso) =>
            concurso.concursos_idconcursos === concursoData.idconcursos
        );

        setInscrito(isInscrito);
      } catch (error) {}

      setData(concursoData);
    };
    getDataConcurso();

    return () => {};
  }, []);

  const participar = async () => {
    if (!file) {
      return;
    }

    try {
      const result = await addParticipante(data.idconcursos);

      //nsole.log(result.data);

      const formdata = new FormData();
      formdata.append("document", file[0]);

      console.log(file[0].name);

      const fileResult = await addDocToParticipante(data.idconcursos, formdata);

      console.log(fileResult);
      setModalContent("ModalContentSuccess");
    } catch (error) {
      setModalContent("ModalContentError");
    }
  };

  const allowInscriptions = () => {
    if (data) {
      return (
        !inscrito &&
        currentUser &&
        currentUser.rol !== "organizador" &&
        new Date() < new Date(data.fechaVencimiento)
      );
    }
    return false;
  };

  // si no se han cargado los datos
  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div style={{ overflowY: "scroll", height: "75vh", width: "100%" }}>
      <Modal isModalOpen={modalOpen} onModalClose={() => toggleModal(false)}>
        {modalContent === "ModalFirstStep" && (
          <ModalFirstStep
            data={data}
            userLogged={userLogged}
            setFile={setFile}
            file={file}
            onClick={() => participar()}
          />
        )}

        {modalContent === "ModalContentSuccess" && (
          <ModalContentSuccess userLogged={userLogged} />
        )}

        {modalContent === "ModalContentError" && (
          <ModalContentError userLogged={userLogged} />
        )}
      </Modal>
      <div className="container-top">
        <div className="first-colunm">
          <div>
            <h1>{data.nombreConcurso}</h1>
          </div>
          <div className="details-container">
            <div>
              <img src={data.cartel} />
            </div>
            <div>
              <h2>Detalles:</h2>
              <ul className="ul-details">
                <li>
                  <p>Categoría:</p>
                  <p>{data.categoria}</p>
                </li>
                <li>
                  <p>Organizador:</p>
                  <p>{data.organizador.nombre}</p>
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
                  <p>{moment(data.fechaVencimiento).format("DD/MM/YYYY")}</p>
                </li>
                <li>
                  <p>Entrega premios:</p>
                  <p>{moment(data.fechaPremiados).format("DD/MM/YYYY")}</p>
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
          {allowInscriptions() && (
            <button
              className="participar-button"
              onClick={() => {
                setModalContent("ModalFirstStep");
                toggleModal(true);
              }}
            >
              Participar
            </button>
          )}

          {!currentUser && (
            <button>
              <Link to="/login">Participar</Link>
            </button>
          )}
          <div>
            <span>{data.categoria}</span>
            <span>{data.primerPremio}</span>
            <span>{moment(data.fechaVencimiento).format("DD/MM/YYYY")}</span>
          </div>
          <div>
            <p>Participantes actuales:</p>
            <p>{data.participantes}</p>
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
            <MailTo>¿Alguna duda? Escribe al organizador</MailTo>
          </button>
        </div>
      </div>
      <LatestConcursos data={data.nextConcursos} />
    </div>
  );
}

export default Concurso;
