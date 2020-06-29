import React, { useState, useEffect } from "react";
import { misConcursos } from "../../http/concursosService";
import moment from "moment";
import { useHistory } from "react-router-dom";
import MailTo from "../MailTo";
import { deleteParticipante } from "../../http/concursosService";
import Activos from "./MisConcursosTables/Activos";
import Finalizados from "./MisConcursosTables/Finalizados";

function MisConcursos() {
  const [data, setData] = useState(null);
  const history = useHistory();

  const getDataConcurso = async () => {
    const result = await misConcursos();

    setData(result.data);
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

  return (
    <div>
      <Activos
        data={data}
        history={history}
        deleteParticipanteConcurso={deleteParticipanteConcurso}
      />

      <Finalizados data={data} history={history} />
    </div>
  );
}

export default MisConcursos;
