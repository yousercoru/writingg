import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchToolBar from "../components/SearchToolBar";

import "../css/index.css";
import { getConcursos, getConcursosLatest } from "../http/concursosService";
import LatestConcursos from "../components/LatestConcursos";

export function Home() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const result = await getConcursosLatest();

    setData(result.data);
  };

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  return (
    <React.Fragment>
      <main>
        <div>
          <div className="presentacion">
            <div>
              <h3>Crea, escribe, participa y gana fantásticos premios</h3>
            </div>
            <div>
              <h2>Cientos de concursos literarios a tu alcance</h2>
            </div>
            <SearchToolBar />
          </div>
        </div>
        <div className="titulo-seccion">
          <h3>Busca por categoría</h3>
        </div>
        <div className="categorias">
          <Link to="/concursos/novela" className="box-categorias novela">
            <p>Novela</p>
          </Link>
          <Link to="/concursos/cuentos" className="box-categorias cuentos">
            <p>Cuentos</p>
          </Link>
          <Link to="/concursos/poesia" className="box-categorias poesia">
            <p>Poesía</p>
          </Link>
          <Link
            to="/concursos/microrrelatos"
            className="box-categorias microrrelatos"
          >
            <p>Microrrelatos</p>
          </Link>
          <Link to="/concursos/ensayos" className="box-categorias ensayos">
            <p>Ensayos</p>
          </Link>
        </div>

        <div className="latest-concursos-home">
          <LatestConcursos data={data} title="Últimos concursos publicados" />
        </div>
      </main>
    </React.Fragment>
  );
}
