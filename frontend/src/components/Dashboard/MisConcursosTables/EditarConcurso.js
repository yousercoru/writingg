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
      <h3>Editar concurso</h3>
      <button
        className="dashboard-table-btn"
        onClick={() => setEditNombreConcurso("")}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      {winnerConcurso && (
        <p style={{ color: "red" }}>
          Nota: este concurso ya ha vencido. Solo puedes modificar el listado de
          ganadores
        </p>
      )}
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
