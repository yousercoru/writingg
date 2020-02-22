import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

export function Header({ onLogout }) {
  return (
    <header>
        <div>
            <h1>
                <Link to="/" className="h-categoria">writingg<span className="writingg-logo">.</span></Link>
            </h1>
        </div>
        
        <div>
            <h4>
                <Link to="/soy-escritor" className="h-categoria">¿Eres escritor?</Link>
            </h4>
        </div>
        <div>
            <h4>
                <Link to="/soy-organizador" className="h-categoria">¿Eres organizador?</Link>
            </h4>
        </div>
        <div>
            <Link to="/alta-concurso">
                <a className="h-btn-3" href="/alta-concurso">
                    Dar de alta un cuncurso
                </a>
            </Link>
            <Link to="/register">
                <a className="h-btn-2" href="/register">
                    Hazte una cuenta
                </a>
            </Link>
            <Link to="/login">
                <a className="h-btn-1" href="/login">
                    Inicia sesión
                </a>
            </Link>
            <Link to="/" onClick={onLogout}>
                <a className="h-btn-3" href="/">
                    Salir
                </a>
            </Link>  
            {/* <nav>
                <div>
                    <Link to="/">Dar de alta un cuncurso</Link>
                </div>
                <div>
                    <Link to="/register">Hazte una cuenta</Link>
                </div>
                <div>
                    <Link to="/login">Inicia sesión</Link>
                </div>
                <div>
                    <Link to="/" onClick={onLogout}>Salir</Link>
                </div>
            </nav>   */}
        </div>
    </header>
  );
}