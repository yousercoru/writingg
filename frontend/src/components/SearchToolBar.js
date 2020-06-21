import React, { useState } from "react";

const categorias = ["Cuentos", "Ensayos", "Microrrelatos", "Novela", "Poesía"];

function SearchToolBar({ onSearch }) {
  const [params, setParams] = useState({
    keywords: "",
    categoria: "",
    fechas: "",
  });

  console.log(params);

  return (
    <div>
      <div>
        <input
          placeholder="Palabras clave"
          onChange={(e) =>
            setParams((prevParams) => ({
              ...prevParams,
              keywords: e.target.value,
            }))
          }
        />
        {// Revisar esta parte:}
        <select
          value={params.categoria}
          onChange={(e) => {
            setParams((prevParams) => ({
              ...prevParams,
              categoria: e.target ? e.target.value : params.categoria,
            }));
          }}
        >
          {categorias.map((categoria, key) => (
            <option key={key} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <input
          placeholder="Calendario fechas"
          onChange={(e) =>
            setParams((prevParams) => ({
              ...prevParams,
              fechas: e.target.value,
            }))
          }
        />
      </div>
      <button onClick={() => onSearch()}>Buscar</button>
    </div>
  );
}

export default SearchToolBar;
