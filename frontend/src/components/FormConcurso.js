import React, { useState, useMemo } from "react";

import { useForm } from "react-hook-form";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import SelectCategorias from "../components/SelectCategorias";

import { createConcursos } from "../http/concursosService";

import htmlToDraft from "html-to-draftjs";

import moment from "moment";

function FormConcurso({ isNew, defaultValues }) {
  const getEditorDefaultState = () => {
    if (isNew) {
      return EditorState.createEmpty();
    }

    if (!isNew && defaultValues.bases) {
      return EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(defaultValues.bases))
      );
    }

    return EditorState.createEmpty();
  };
  const [editorState, setEditorState] = useState(getEditorDefaultState());
  const { register, errors, getValues } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues
      ? {
          nombreConcurso: defaultValues.nombreConcurso,
          categoria: defaultValues.categoria,
          fechaVencimiento: moment(defaultValues.fechaVencimiento).format(
            "YYYY-MM-DD"
          ),
          // //cartel: defaultValues.cartel,
          // // bases_pdf: defaultValues.bases_pdf,
          primerPremio: defaultValues.primerPremio,
          segundoPremio: defaultValues.segundoPremio,
          tercerPremio: defaultValues.tercerPremio,
          fechaPremiados: moment(defaultValues.fechaPremiados).format(
            "YYYY-MM-DD"
          ),
        }
      : {},
  });

  console.log(defaultValues, "default");

  const getEditorHTML = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const save = () => {
    if (isNew) {
      return create();
    }

    edit();
  };

  const create = async () => {
    const formValues = getValues();
    const data = {
      ...formValues,
      bases: getEditorHTML(),
      cartel: formValues.cartel[0],
      bases_pdf: formValues.bases_pdf[0],
    };
    const formdata = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formdata.append(key, value);
    });

    const result = await createConcursos(formdata);
  };

  const edit = async () => {};

  return (
    <div>
      <form>
        <div>
          <label>Nombre del concurso *</label>
          <input type="text" name="nombreConcurso" ref={register({})} />
        </div>
        <div>
          <label>Categoría *</label>
          <SelectCategorias selectedProps={{ ref: register({}) }} />
        </div>
        <div>
          <label>Fecha de vencimiento *</label>
          <input
            type="date"
            name="fechaVencimiento"
            ref={register({ required: "Campo obligatorio" })}
          />
        </div>
        <div>
          <label>Cartel</label>
          <input
            type="file"
            name="cartel"
            ref={register({ required: "Campo obligatorio" })}
          />
        </div>
        <div>
          <label>Subir PDF de las bases</label>
          <input type="file" name="bases_pdf" ref={register()} />
        </div>
        <h2>Premios</h2>
        <div>
          <label>1er premio *</label>
          <input
            type="text"
            name="primerPremio"
            ref={register({ required: "Campo obligatorio" })}
          />
        </div>
        <div>
          <label>2º premio</label>
          <input type="text" name="segundoPremio" ref={register()} />
        </div>
        <div>
          <label>3er premio</label>
          <input type="text" name="tercerPremio" ref={register()} />
        </div>
        <div>
          <label>Fecha entrega de premios *</label>
          <input
            type="date"
            name="fechaPremiados"
            ref={register({ required: "Campo obligatorio" })}
          />
        </div>

        {false && (
          <>
            <div>
              <label>Ganador</label>
              <input type="text" name="ganador" ref={register()} />
            </div>
            <div>
              <label>Segundo</label>
              <input type="text" name="ganador" ref={register()} />
            </div>
            <div>
              <label>Tercero</label>
              <input type="text" name="ganador" ref={register()} />
            </div>
          </>
        )}
      </form>

      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />

      <button onClick={() => save()}>
        {isNew ? "Crear concurso" : "Guardar concurso"}
      </button>
    </div>
  );
}

export default FormConcurso;