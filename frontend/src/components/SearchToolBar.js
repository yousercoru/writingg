import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import SelectCategorias from "./SelectCategorias";
import "../css/search-toolbar.css";

const categorias = ["Cuentos", "Ensayos", "Microrrelatos", "Novela", "Poesia"];

function SearchToolBar({ onSearch, defaultParams }) {
  const history = useHistory();

  const [params, setParams] = useState({
    keywords: "",
    categoria: "",
    fechaInicio: "",
    fechaFin: "",
    ...defaultParams,
  });

  const onChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  //default search
  const search = () => {
    if (onSearch) {
      onSearch(params);
    }

    history.push(
      `/concursos?keywords=${params.keywords}&categoria=${params.categoria}&fechaInicio=${params.fechaInicio}&fechaFin=${params.fechaFin}`
    );
  };

  return (
    <div className="search-toolbar">
      <div className="search-toolbar-inputs">
        <input
          className="keywords"
          name="keywords"
          placeholder="Palabras clave"
          value={params.keywords}
          onChange={onChange}
        />

        <SelectCategorias
          onChange={onChange}
          selected={params.categoria}
          showAllOptions
        />

        <input
          name="fechaInicio"
          value={params.fechaInicio}
          type="date"
          onChange={onChange}
        />

        <input
          name="fechaFin"
          value={params.fechaFin}
          type="date"
          onChange={onChange}
        />
      </div>
      <button className="h-btn-search" onClick={() => search()}>
        Buscar
      </button>
    </div>
  );
}

export default SearchToolBar;
