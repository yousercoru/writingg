import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EditarCuenta from "../components/Dashboard/EditarCuenta";
import MisConcursos from "../components/Dashboard/MisConcursos";

import { useAuth } from "../context/auth-context";

const Pages = {
  EditarCuenta,
  CambiarPassword: "",
  MisConcursos,
};

function Dashboard(props) {
  const historyParams = useParams();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(
    historyParams.menu ? historyParams.menu : "EditarCuenta"
  );
  const PageComponent = Pages[currentPage] ? Pages[currentPage] : <></>;
  const { currentUser, deleteUser } = useAuth();

  const setPage = (page) => {
    history.push(`/dashboard/${page}`);
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="menu-perfil">
        <img />
        <h3>{"Nombre y Apellido"}</h3>
        <button onClick={() => setPage("EditarCuenta")}>Editar cuenta</button>
        <button>Cambiar contraseña</button>
        <button onClick={() => setPage("MisConcursos")}>Mis concursos</button>
        {currentUser && currentUser.rol == "organizador" && (
          <Link to="/alta-concurso">
            <button>Dar de alta un cuncurso</button>
          </Link>
        )}
        <Link to="/" onClick={() => deleteUser()}>
          <button>Cerrar sesión</button>
        </Link>
      </div>
      <div>
        <PageComponent />
      </div>
    </div>
  );
}

export default Dashboard;
