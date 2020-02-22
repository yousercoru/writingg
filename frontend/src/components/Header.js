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
            <Link to="/alta-concurso" className="h-btn-3">
                    Dar de alta un cuncurso
            </Link>
            <Link to="/register" className="h-btn-2">
                    Hazte una cuenta          
            </Link>
            <Link to="/login" className="h-btn-1">
                    Inicia sesión              
            </Link>
            <Link to="/" onClick={onLogout} className="h-btn-3">
                    Salir
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