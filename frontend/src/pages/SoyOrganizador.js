import React from "react";
// import { Link, useHistory } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { login } from "../http/authService";
// import { signIn } from "../http/authService";
// import { useAuth } from "../context/auth-context";
import { Header } from "../components/Header";
import background from '../img/background.jpg';



export function SoyOrganizador() {
    // const { 
    //     handleSubmit,
    //     register,
    //     errors,
    //     formState,
    //     setError,
    //     setValue
    // } = useForm({
    //     mode: 'onBlur'
    // });

    // const history = useHistory();
    // const { setIsAuthenticated, setCurrentUser } = useAuth();
    
    // const handleLogin = formData => {
    //     // return signIn(formData)
    //     login(formData)
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
            <div  styles={{ backgroundImage:`url(${background})` }}>
                <h1>This is the background</h1>
            </div>
        </React.Fragment>
    );
}