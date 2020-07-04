import React, { useEffect, useState } from "react";
import FormConcurso from "../../FormConcurso";
import { getConcurso } from "../../../http/concursosService";

function EditarConcurso({ slugNombreConcurso, setEditNombreConcurso }) {
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

  console.log(data, "data");

  return (
    <div>
      Editar concurso
      <button onClick={() => setEditNombreConcurso("")}>back</button>
      {data ? (
        <FormConcurso isNew={false} defaultValues={data} />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default EditarConcurso;
