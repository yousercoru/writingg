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
            <main className="container">
                <div className="t-g-e">
                    <h3>¿Te gusta escribir?</h3>
                    <h2>Participa en concursos literarios y gana fantásticos premios</h2>
                    <Link to="/soy-escritor">Más info</Link>
                </div>
            </main> 
            <Footer />
        </React.Fragment>
    );
}