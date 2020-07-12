import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import { useAuth } from "../context/auth-context";

const MobileNav = ({ currentUser, userLogged, deleteUser }) => {
  const [open, toggle] = useState(false);

  const buttons = document.querySelectorAll("#myLinks a");

  for (const button of buttons) {
    button.addEventListener("click", () => toggle(false));
  }
  return (
    <div className="mobile-container">
      <div className="topnav">
        <a href="#home" className="active">
          <h1 className="logo">
            <Link to="/">
              writingg<span className="writingg-logo">.</span>
            </Link>
          </h1>
        </a>
        <div style={{ display: open ? "block" : "none" }} id="myLinks">
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
                <Link
                  to="/dashboard"
                  className="h-btn-3"
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  Hola {userLogged && userLogged.nombre}
                </Link>

                {currentUser && currentUser.rol === "organizador" && (
                  <Link to="/dashboard/AltaConcurso" className="h-btn-3">
                    Dar de alta un cuncurso
                  </Link>
                )}

                <Link to="/" onClick={() => deleteUser()} className="h-btn-3">
                  Salir
                </Link>
              </>
            )}
          </div>
        </div>
        <a onClick={() => toggle(!open)} className="icon">
          <i className="fa fa-bars"></i>
        </a>
      </div>
    </div>
  );
};

const Desktop = ({ currentUser, userLogged, deleteUser }) => (
  <div className="desktop">
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
      {currentUser && currentUser.rol === "organizador" && (
        <Link to="/dashboard/AltaConcurso" className="h-btn-3">
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
          <Link
            to="/dashboard"
            className="h-btn-3"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Hola {userLogged && userLogged.nombre}
          </Link>

          <Link to="/" onClick={() => deleteUser()} className="h-btn-3">
            Salir
          </Link>
        </>
      )}
    </div>
  </div>
);

export function Header({ onLogout }) {
  const { currentUser, deleteUser, userLogged } = useAuth();

  return (
    <header>
      <MobileNav
        currentUser={currentUser}
        deleteUser={deleteUser}
        userLogged={userLogged}
      />

      <Desktop
        currentUser={currentUser}
        deleteUser={deleteUser}
        userLogged={userLogged}
      />
    </header>
  );
  return <header></header>;
}
