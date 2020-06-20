import React, { useState } from "react";
import EditarCuenta from "../components/Dashboard/EditarCuenta";

const Pages = {
  EditarCuenta,
  CambiarPassword: "",
  MisConcursos: "",
};

function Dashboard(props) {
  const [currentPage, setCurrentPage] = useState("EditarCuenta");
  const PageComponent = Pages[currentPage] ? Pages[currentPage] : null;

  return (
    <div>
      <div className="menu-perfil">
        <img />
        <h3>{"Nombre y Apellido"}</h3>
        <button onClick={() => setCurrentPage("EditarCuenta")}>
          Editar cuenta
        </button>
        <button>Cambiar contraseña</button>
        <button>Mis concursos</button>
        <button>Cerrar sesión</button>
      </div>
      <div>
        <PageComponent />
      </div>
    </div>
  );
}

export default Dashboard;
