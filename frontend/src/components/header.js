import React from "react";

export default function Header( { onLogout }) {
  return (
    <header>
        <div className="logo">
        <a href="#">LOGO</a>
        </div>
        <nav>
            <div>
                <a href="#">Dar de alta un concurso</a>
            </div>
            <div>
                <a href="#">Registrarse</a>
            </div>
            <div>
                <a href="#">Iniciar sesión</a>
            </div>
        </nav>
    </header>
  );
}
