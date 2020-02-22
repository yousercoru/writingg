import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/auth-context";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// import tuto1 from "../img/tutorial/tuto-1.png";


export function SoyOrganizador() {
    // const { setCurrentUser, setIsAuthenticated } = useAuth();
    // const history = useHistory();
    return (
        <React.Fragment>
            <Header />
            <main className="container">
                <div className="p-t-md">
                    <h1>Quiero organizar un concurso</h1>
                </div>
                <div className="p-t-md">
                    <h2>¿Cómo dar de alta un concurso?</h2>
                    {/* <Link to="/register">Regístrate</Link> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>1. Regístrate en la plataforma como usuario organizador</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>2. Inicia sesión con tu cuenta y clica en "Dar de alta un concurso"</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>3. Accederás directamente al formulario de creación dentro de tu panel de control</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>4. Rellena el formulario con toda la información requerida. No te olvides de incluir las bases del concurso, datos de contacto o enlaces para más información</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>5. Publica el concurso. ¡Hurra! Ya puedes comenzar a recibir inscripciones de los participantes</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>6. Una vez finalizada la fecha de participación podrás revisar todas las obras de los participantes y deliverar con tu jurado quienes son los ganadores</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>7. Por último, publica el resultado del concurso. Así los participantes podrán saber si han sido ganadores</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div>
                    <h4 className="p-t-md">¿A qué estás esperando? Da de alta tu primer concurso</h4>
                    <h4 className="p-t-md">¡Bienvenido a writingg.!</h4>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
}