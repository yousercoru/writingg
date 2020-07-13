import React, { useState, useMemo } from "react";

import { useForm } from "react-hook-form";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import SelectCategorias from "../components/SelectCategorias";

import { createConcursos, editConcursos } from "../http/concursosService";

import htmlToDraft from "html-to-draftjs";

import moment from "moment";
import Modal from "./Modal";

function FormConcurso({ isNew, defaultValues, setWinners }) {
  const [showModal, toggleModal] = useState(false);

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

          primerPremio: defaultValues.primerPremio,
          segundoPremio: defaultValues.segundoPremio,
          tercerPremio: defaultValues.tercerPremio,
          fechaPremiados: moment(defaultValues.fechaPremiados).format(
            "YYYY-MM-DD"
          ),
          ganador: defaultValues.ganador,
          segundo: defaultValues.segundo,
          tercero: defaultValues.tercero,
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

    toggleModal(true);
  };

  const generateFormData = () => {
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

    return formdata;
  };

  const create = async () => {
    const formdata = generateFormData();

    const result = await createConcursos(formdata);
    toggleModal(true);
  };

  const edit = async () => {
    const formdata = generateFormData();

    const result = await editConcursos(defaultValues.idconcursos, formdata);
  };

  return (
    <div className="form-concurso">
      <Modal
        isModalOpen={showModal}
        onModalClose={() => {
          toggleModal(false);
          window.location.reload();
        }}
      >
        <div>Tus cambios se han guardado correctamente</div>
      </Modal>
      <form>
        {!setWinners && (
          <>
            <div className="form-group">
              <label>Nombre del concurso *</label>
              <input
                type="text"
                disabled={setWinners}
                name="nombreConcurso"
                ref={register({})}
              />
            </div>
            <div className="form-group">
              <label>Categoría *</label>
              <SelectCategorias
                selectedProps={{ ref: register({}), disabled: setWinners }}
              />
            </div>
            <div className="form-group">
              <label>Fecha de vencimiento *</label>
              <input
                type="date"
                disabled={setWinners}
                name="fechaVencimiento"
                ref={register({ required: "Campo obligatorio" })}
              />
            </div>
            <div className="form-group">
              <label>Cartel</label>
              <input
                type="file"
                disabled={setWinners}
                name="cartel"
                ref={register({ required: "Campo obligatorio" })}
              />
            </div>
            <div className="form-group">
              <label>Subir PDF de las bases</label>
              <input
                disabled={setWinners}
                type="file"
                name="bases_pdf"
                ref={register()}
              />
            </div>
            <h2>Premios</h2>
            <div className="form-group">
              <label>1er premio *</label>
              <input
                type="text"
                disabled={setWinners}
                name="primerPremio"
                ref={register({ required: "Campo obligatorio" })}
              />
            </div>
            <div className="form-group">
              <label>2º premio</label>
              <input
                type="text"
                disabled={setWinners}
                name="segundoPremio"
                ref={register()}
              />
            </div>
            <div className="form-group">
              <label>3er premio</label>
              <input
                type="text"
                disabled={setWinners}
                name="tercerPremio"
                ref={register()}
              />
            </div>
            <div className="form-group">
              <label>Fecha entrega de premios *</label>
              <input
                type="date"
                disabled={setWinners}
                name="fechaPremiados"
                ref={register({ required: "Campo obligatorio" })}
              />
            </div>
          </>
        )}

        {setWinners && (
          <>
            <h3 id="premiados">Premiados {defaultValues.nombreConcurso}</h3>
            <div className="form-group">
              <label>Ganador</label>
              <input type="text" name="ganador" ref={register()} />
            </div>
            <div className="form-group">
              <label>Segundo</label>
              <input type="text" name="segundo" ref={register()} />
            </div>
            <div className="form-group">
              <label>Tercero</label>
              <input type="text" name="tercero" ref={register()} />
            </div>
          </>
        )}
      </form>

      {!setWinners && (
        <Editor
          editorState={editorState}
          readOnly={setWinners}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />
      )}

      <button className="dashboard-btn" onClick={() => save()}>
        {isNew ? "Crear concurso" : "Guardar concurso"}
      </button>
    </div>
  );
}

export default FormConcurso;
