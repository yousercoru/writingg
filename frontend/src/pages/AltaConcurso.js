import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createConcursos } from "../http/concursosService";

export default function AltaConcurso() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const getEditorHTML = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const create = async () => {
    console.log(formState, "state");

    const result = await createConcursos({
      nombreConcurso: "Nombre",
      bases: getEditorHTML(),
    });
  };

  return (
    <div sty>
      <form>
        <input ref={register({ required: "" })} name="nombreConcurso" />
      </form>

      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />

      <button onClick={() => create()}>Crear Concurso</button>
    </div>
  );
}
