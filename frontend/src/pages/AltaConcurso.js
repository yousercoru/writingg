import React, { useState } from "react";

import FormConcurso from "../components/FormConcurso";

export default function AltaConcurso() {
  return (
    <div>
      <h1>Nuevo concurso</h1>

      <FormConcurso isNew />
    </div>
  );
}
