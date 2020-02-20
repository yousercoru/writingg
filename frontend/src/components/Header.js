import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

export function Header({ onLogout }) {
  return (
    <header>
        <div>
            <h1>
                <Link to="/">writingg<span className="writingg-logo">.</span></Link>
            </h1>
        </div>
        
        <div>
            <nav>
                <h4>
                    <Link to="/soy-escritor" className="h-categoria">¿Eres escritor?</Link>
                </h4>
                <h4>
                    <Link to="/soy-organizador" className="h-categoria">¿Eres organizador?</Link>
                </h4>
            </nav>
        </div>
        <div>
            <Link to="/alta-concurso">
                <button className="h-btn-3">
                    Dar de alta un cuncurso
                </button>
            </Link>
            <Link to="/account">
                <button className="h-btn-2">
                    Hazte una cuenta
                </button>
            </Link>
            <Link to="/login">
                <button className="h-btn-1">
                    Inicia sesión
                </button>
            </Link>
            <Link to="/" onClick={onLogout}>
                <button className="h-btn-3">
                    Salir
                </button>
            </Link>  
        </div>
    </header>
  );
}