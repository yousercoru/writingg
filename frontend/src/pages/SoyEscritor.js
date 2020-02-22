import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/auth-context";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// import tuto1 from "../img/tutorial/tuto-1.png";


export function SoyEscritor() {
    // const { setCurrentUser, setIsAuthenticated } = useAuth();
    // const history = useHistory();
    return (
        <React.Fragment>
            <Header />
            <main className="container">
                <div className="p-t-md">
                    <h1>Soy escritor</h1>
                </div>
                <div className="p-t-md">
                    <h2>¿Cómo participar en los concursos?</h2>
                    {/* <Link to="/register">Regístrate</Link> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>1. Regístrate en la plataforma como usuario escritor</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>2. Accede al catálogo de concursos vigente</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>3. Selecciona el concurso que más te interesa y lee sus bases</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>4. Clica en el botón participar y sube tu obra</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>5. ¡Listo! Ya estás inscrito. Si tienes alguna duda puedes contactar con el organizador vía e-mail</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>6. En tu área privada podrás ver el histórico de concursos en los que has participado</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div className="tutorial p-t-md">
                    <p>7. Una vez llegue la fecha de entrega de premios, el organizador del concurso subirá el resultado final y podrás conocer si has sido ganador o no</p>
                    {/* <img src={tuto1} /> */}
                </div>
                <div>
                    <h4 className="p-t-md">¿A qué estás esperando? Seguro que tienes muchas historias que escribir</h4>
                    <h4 className="p-t-md">¡Bienvenido a writingg.!</h4>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
}