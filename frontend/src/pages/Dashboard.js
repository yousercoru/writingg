import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EditarCuenta from "../components/Dashboard/EditarCuenta";
import MisConcursos from "../components/Dashboard/MisConcursos";
import AltaConcurso from "../pages/AltaConcurso";

import { useAuth } from "../context/auth-context";

import "../css/dashboard.css";

const Pages = {
  EditarCuenta,
  MisConcursos,
  AltaConcurso,
};

function Dashboard(props) {
  const historyParams = useParams();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(
    historyParams.menu ? historyParams.menu : "EditarCuenta"
  );
  const PageComponent = Pages[currentPage] ? Pages[currentPage] : <></>;
  const { currentUser, deleteUser, userLogged } = useAuth();

  const setPage = (page) => {
    history.push(`/dashboard/${page}`);
    setCurrentPage(page);
  };

  return (
    <div className="dashboard">
      <div className="menu-perfil">
        <h2>{userLogged.nombre}</h2>
        <div className="dashboard-buttons">
          <button
            className="dashboard-btn"
            onClick={() => setPage("EditarCuenta")}
          >
            Editar cuenta
          </button>

          <button
            className="dashboard-btn"
            onClick={() => setPage("MisConcursos")}
          >
            Mis concursos
          </button>
          {currentUser && currentUser.rol == "organizador" && (
            <button
              className="dashboard-btn"
              onClick={() => setPage("AltaConcurso")}
            >
              Dar de alta un cuncurso
            </button>
          )}
          <Link to="/" onClick={() => deleteUser()}>
            <button className="dashboard-btn">Cerrar sesión</button>
          </Link>
        </div>
      </div>
      <div className="dashboard-content">
        <PageComponent />
      </div>
    </div>
  );
}

export default Dashboard;
