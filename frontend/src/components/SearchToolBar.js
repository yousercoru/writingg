import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

const categorias = ["Cuentos", "Ensayos", "Microrrelatos", "Novela", "Poesia"];

function SearchToolBar({ onSearch, defaultParams }) {
  const history = useHistory();
  const [params, setParams] = useState({
    keywords: "",
    categoria: "",
    fechas: "",
    ...defaultParams,
  });

  const onChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  //default search
  const search = () => {
    if (onSearch) {
      return onSearch(params);
    }

    history.push(
      `/concursos?keywords=${params.keywords}&categoria=${params.categoria}&fechas=${params.fechas}`
    );
  };

  return (
    <div>
      <div>
        <input
          name="keywords"
          placeholder="Palabras clave"
          onChange={onChange}
        />

        <select name="categoria" onChange={onChange}>
          <option value="">Todas las categorías</option>
          {categorias.map((categoria, key) => (
            <option
              selected={
                params.categoria &&
                categoria.toUpperCase() === params.categoria.toUpperCase()
              }
              key={key}
              value={categoria}
            >
              {categoria}
            </option>
          ))}
        </select>
        <input
          name="fechas"
          placeholder="Calendario fechas"
          onChange={onChange}
        />
      </div>
      <button onClick={() => search()}>Buscar</button>
    </div>
  );
}

export default SearchToolBar;
