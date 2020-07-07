import React, { useState, useEffect } from "react";
import {
  misConcursosEscritor,
  misConcursosOrganizador,
} from "../../http/concursosService";

import { useHistory } from "react-router-dom";

import { deleteParticipante } from "../../http/concursosService";
import ActivosEscritor from "./MisConcursosTables/ActivosEscritor";
import FinalizadosEscritor from "./MisConcursosTables/FinalizadosEscritor";
import { useAuth } from "../../context/auth-context";
import ActivosOrganizador from "./MisConcursosTables/ActivosOrganizador";
import FinalizadosOrganizador from "./MisConcursosTables/FinalizadosOrganizador";
import EditarConcurso from "./MisConcursosTables/EditarConcurso";
import ParticipantesConcurso from "./MisConcursosTables/ParticipantesConcurso";

function MisConcursos() {
  const [data, setData] = useState(null);

  //se usa para editar un concurso
  const [editSlugConcurso, setEditNombreConcurso] = useState("");
  const [winnerConcurso, setWinnersConcurso] = useState(false);

  //se usa para ver los participantes de un concurso
  const [concursoId, setConcursoId] = useState("");

  const { currentUser } = useAuth();
  const history = useHistory();

  const getDataConcurso = async () => {
    if (currentUser.rol === "organizador") {
      const result = await misConcursosOrganizador();
      setData(result.data);
    }

    if (currentUser.rol === "escritor") {
      const result = await misConcursosEscritor();
      setData(result.data);
    }
  };

  const deleteParticipanteConcurso = async (idConcurso) => {
    const result = await deleteParticipante(idConcurso);

    await getDataConcurso();
  };

  useEffect(() => {
    getDataConcurso();

    return () => {};
  }, []);

  if (concursoId) {
    return (
      <ParticipantesConcurso
        concursoId={concursoId}
        setConcursoId={setConcursoId}
      />
    );
  }

  if (editSlugConcurso) {
    return (
      <EditarConcurso
        slugNombreConcurso={editSlugConcurso}
        setEditNombreConcurso={setEditNombreConcurso}
        winnerConcurso={winnerConcurso}
      />
    );
  }

  return (
    <div>
      {currentUser && currentUser.rol === "escritor" && (
        <>
          <ActivosEscritor
            data={data}
            history={history}
            deleteParticipanteConcurso={deleteParticipanteConcurso}
          />

          <FinalizadosEscritor data={data} history={history} />
        </>
      )}
      {currentUser && currentUser.rol === "organizador" && (
        <>
          <ActivosOrganizador
            data={data}
            history={history}
            setEditNombreConcurso={setEditNombreConcurso}
          />

          <FinalizadosOrganizador
            data={data}
            history={history}
            setEditNombreConcurso={setEditNombreConcurso}
            setWinnersConcurso={setWinnersConcurso}
            setConcursoId={setConcursoId}
          />
        </>
      )}
    </div>
  );
}

export default MisConcursos;
