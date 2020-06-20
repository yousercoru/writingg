import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import { useAuth } from "../context/auth-context";

export function Header({ onLogout }) {
  const { currentUser, deleteUser, userLogged } = useAuth();

  return (
    <header>
      <div>
        <h1>
          <Link to="/" className="h-categoria">
            writingg<span className="writingg-logo">.</span>
          </Link>
        </h1>
      </div>

      <div>
        <h4>
          <Link to="/soy-escritor" className="h-categoria">
            ¿Eres escritor?
          </Link>
        </h4>
      </div>
      <div>
        <h4>
          <Link to="/soy-organizador" className="h-categoria">
            ¿Eres organizador?
          </Link>
        </h4>
      </div>
      <div>
        {currentUser && currentUser.rol == "organizador" && (
          <Link to="/alta-concurso" className="h-btn-3">
            Dar de alta un cuncurso
          </Link>
        )}

        {!currentUser ? (
          <>
            <Link to="/register" className="h-btn-2">
              Hazte una cuenta
            </Link>
            <Link to="/login" className="h-btn-1">
              Inicia sesión
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="h-btn-3">
              Hola {userLogged && userLogged.nombre}
            </Link>
            {/* <ul className="perfil-header">
                <li>
                  <a href="">Submenu1</a>
                </li>
                <li>
                  <a href="">Submenu2</a>
                </li>
                <li>
                  <a href="">Submenu3</a>
                </li>
              </ul> */}

            <Link to="/" onClick={() => deleteUser()} className="h-btn-3">
              Salir
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
