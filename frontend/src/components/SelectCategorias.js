import React from "react";

const categorias = ["Cuentos", "Ensayos", "Microrrelatos", "Novela", "Poesia"];

function SelectCategorias({
  onChange,
  selected,
  showAllOptions,
  selectedProps,
}) {
  return (
    <select {...selectedProps} name="categoria" onChange={onChange}>
      {showAllOptions && <option value="">Todas las categorías</option>}
      {categorias.map((categoria, key) => (
        <option
          selected={
            selected && categoria.toUpperCase() === selected.toUpperCase()
          }
          key={key}
          value={categoria}
        >
          {categoria}
        </option>
      ))}
    </select>
  );
}

export default SelectCategorias;
