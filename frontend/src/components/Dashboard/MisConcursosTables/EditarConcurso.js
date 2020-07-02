import React, { useEffect } from "react";
import FormConcurso from "../../FormConcurso";

function EditarConcurso({ slugNombreConcurso, setEditNombreConcurso }) {
  useEffect(() => {}, [slugNombreConcurso]);
  return (
    <div>
      Editar concurso
      <button onClick={() => setEditNombreConcurso("")}>back</button>
      <FormConcurso isNew={false} />
    </div>
  );
}

export default EditarConcurso;
