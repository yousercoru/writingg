import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import SelectCategorias from "./SelectCategorias";

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
    <div>
      <div>
        <input
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
      <button onClick={() => search()}>Buscar</button>
    </div>
  );
}

export default SearchToolBar;
