import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { login } from "../http/authService";
// import { signIn } from "../http/authService";
// import { useAuth } from "../context/auth-context";

// import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
      <main /*className="container"*/>
        <div>
          <div className="presentacion">
            {/* <div><h4>¿Te gusta escribir? ¿Organizas concursos?</h4></div> */}
            {/* <div className="slide"><h2>Participa en concursos literarios y gana fantásticos premios</h2></div> */}
            <div>
              <h3>Crea, escribe, participa y gana fantásticos premios</h3>
            </div>
            <div>
              <h2>Somos la nueva plataforma de concursos literarios</h2>
            </div>
            <SearchToolBar />
            {/* <div clasName="btn-slider"> */}
            {/* <div clasName="btn-slider"> */}
            <div clasName="btn-slider">
              <Link to="/soy-escritor" className="h-btn-4">
                Soy escritor
              </Link>
            </div>
            <div clasName="btn-slider">
              <Link to="/soy-organizador" className="h-btn-4">
                Soy organizador
              </Link>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div clasName="t-seccion">
          <h3>Busca por categoría</h3>
        </div>
        <div className="categorias">
          <div className="box-categorias novela">
            <Link to="/concursos/novela">Novela</Link>
          </div>
          <div className="box-categorias cuentos">
            <Link to="/concursos/cuentos">Cuentos</Link>
          </div>
          <div className="box-categorias poesia">
            <Link to="/concursos/poesia">Poesía</Link>
          </div>
          <div className="box-categorias microrrelatos">
            <Link to="/concursos/microrrelatos">Microrrelatos</Link>
          </div>
          <div className="box-categorias ensayos">
            <Link to="/concursos/ensayos">Ensayos</Link>
          </div>
        </div>
        <LatestConcursos data={data} />
      </main>
      <Footer />
    </React.Fragment>
  );
}
