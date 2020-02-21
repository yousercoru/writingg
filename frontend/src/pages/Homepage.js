import React from "react";
import { BrowserRouter }from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { login } from "../http/authService";
// import { signIn } from "../http/authService";
// import { useAuth } from "../context/auth-context";
import { Header } from "../components/Header";


export function Homepage() {
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
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        </React.Fragment>
    );
}