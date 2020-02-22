import React from "react";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { login } from "../http/authService";
// import { signIn } from "../http/authService";
// import { useAuth } from "../context/auth-context";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import '../css/index.css';


export function Home() {
    // const { 
    //     setError,
    //     setValue
    // } = useForm({
    //     mode: 'onBlur'
    // });

    // const history = useHistory();
    // const { setIsAuthenticated, setCurrentUser } = useAuth();
    
    // const login(formData)
    //         .then(response => {
    //             // setRole(jwt_decode(response.data.token))
    //             setIsAuthenticated(true);
    //             setCurrentUser(response.data);
    //             history.push('/');
    //         })
    //         .catch(error => {
    //             setValue('password', '');
    //             setError('password', 'credentials', 'Tus credenciales no son válidas');
    //         });
    // };

    return (
        <React.Fragment>
            <Header />
            <main /*className="container"*/>
                <div>
                    <div className="presentacion">
                        {/* <div><h4>¿Te gusta escribir? ¿Organizas concursos?</h4></div> */}
                        {/* <div className="slide"><h2>Participa en concursos literarios y gana fantásticos premios</h2></div> */}
                        <div><h3>Crea, escribe, participa y gana fantásticos premios</h3></div>
                        <div><h2>Somos la nueva plataforma de concursos literarios</h2></div>
                        {/* <div clasName="btn-slider"> */}
                        {/* <div clasName="btn-slider"> */}
                            <div clasName="btn-slider"><Link to="/soy-escritor" className="h-btn-4">Soy escritor</Link></div>
                            <div clasName="btn-slider"><Link to="/soy-organizador" className="h-btn-4">Soy organizador</Link></div>
                        {/* </div> */}
                    </div>
                </div>
                <div clasName="t-seccion"><h3>Busca por categoría</h3></div>
                <div className="categorias">
                        <div className="box-categorias">Novela</div>
                        <div className="box-categorias">Cuentos</div>
                        <div className="box-categorias">Poesía</div>
                        <div className="box-categorias">Microrrelatos</div>
                        <div className="box-categorias">Ensayos</div>
                </div>
                {/* <div className="wrapper">
                    <div className="slider">
                        // </div><div className="slide"> //
                            <div className="slide">
                                <div>
                                    <h3>¿Te gusta escribir?</h3>
                                    <h2>Participa en concursos literarios y gana fantásticos premios</h2>
                                    <Link to="/soy-escritor" className="h-btn-4">Más info</Link>
                                </div>
                                <div>
                                    <h3>¿Organizas concursos literarios?</h3>
                                    <h2>Registra tu concurso y consigue multiplicar la participación</h2>
                                    <Link to="/soy-organizador" className="h-btn-4">Más info</Link>
                                </div>
                            </div>
                        </div>
                </div> */}
            </main> 
            <Footer />
        </React.Fragment>
    );
}