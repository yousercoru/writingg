import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import { useAuth } from "../context/auth-context";

export function Header({ onLogout }) {
  const { currentUser, deleteUser } = useAuth();
  console.log(currentUser, "user");

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
            <Link to="/" onClick={onLogout} className="h-btn-3">
              Perfil
            </Link>
            <Link to="/" onClick={() => deleteUser()} className="h-btn-3">
              Salir
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
