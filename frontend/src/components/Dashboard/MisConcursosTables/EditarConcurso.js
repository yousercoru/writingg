import React, { useEffect, useState } from "react";
import FormConcurso from "../../FormConcurso";
import { getConcurso } from "../../../http/concursosService";

function EditarConcurso({
  slugNombreConcurso,
  setEditNombreConcurso,
  winnerConcurso,
}) {
  const [data, setData] = useState(null);
  const getData = async () => {
    const result = await getConcurso(slugNombreConcurso);

    const concursoData = result.data.data;

    delete concursoData.nextConcursos;
    delete concursoData.organizador;

    setData(result.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      Editar concurso
      <button onClick={() => setEditNombreConcurso("")}>back</button>
      {data ? (
        <FormConcurso
          isNew={false}
          defaultValues={data}
          setWinners={winnerConcurso}
        />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default EditarConcurso;
