import React from "react";

export default function Homepage() {
  return (
    <main>
        <div className="carrusel-escritor">
        <h4>¿Te gusta escribir?</h4>
        <h2>Participa en concursos literarios y gana fantásticos premios</h2>
        <button href="#">Más info</button>
        </div>
        <div className="carrusel-organizador">
        <h4>¿Organizas concursos literarios?</h4>
        <h2>Registra tu concurso y consigue multiplicar la participación</h2>
        <button href="#">Más info</button>
        </div>
        <div className="buscar-por-categoria">
            <h3>Busca por categoría</h3>
            <ul>
                    <li>
                        <a href="#">Novela</a>
                    </li>
                    <li>
                        <a href="#">Cuentos</a>
                    </li>
                    <li>
                        <a href="#">Poesía</a>
                    </li>
                    <li>
                        <a href="#">Microrrelatos</a>
                    </li>
                    <li>
                        <a href="#">Otros</a>
                    </li>
                </ul>
        </div>
        <div className="ultimos-concursos-añadidos">
            <h3>Últimos concursos añadidos</h3>
        </div>
    </main>
  );
}
