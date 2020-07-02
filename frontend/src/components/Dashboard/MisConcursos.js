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

function MisConcursos() {
  const [data, setData] = useState(null);
  const [editSlugConcurso, setEditNombreConcurso] = useState("");

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

  console.log(data);

  if (editSlugConcurso) {
    return (
      <EditarConcurso
        slugNombreConcurso={editSlugConcurso}
        setEditNombreConcurso={setEditNombreConcurso}
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

          <FinalizadosOrganizador data={data} history={history} />
        </>
      )}
    </div>
  );
}

export default MisConcursos;
