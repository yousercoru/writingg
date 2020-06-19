import React from "react";
import jwt from "jsonwebtoken";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { login } from "../http/authService";
import { createAccount } from "../http/accountService";
// import { signIn } from "../http/authService";
import { useAuth } from "../context/auth-context";
// import { Header } from "../components/Header";

// import '../css/forms.css';

export function Register() {
  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const history = useHistory();
  const { setRol, setCurrentUser } = useAuth();

  const handleLogin = (registerData) => {
    console.log(registerData);
    return (
      createAccount(registerData)
        // login(registerData)
        .then((response) => {
          setRol(jwt(response.data.token));
          // setIsAuthenticated(true);
          setCurrentUser(response.data);
          history.push("/");
        })
        .catch((error) => {
          setValue("password", "");
          setError(
            "password",
            "credentials",
            "Tus credenciales no son válidas"
          );
        })
    );
  };

  return (
    <React.Fragment>
      {/* <Header /> */}
      <main className="centered-container">
        {/* <img src="writingg-logo-192.png" alt="Writingg.com" /> */}
        <h1>
          writingg<span className="writingg-logo">.</span>
        </h1>
        <h4 className="p-t-md">
          Escribe, participa y gana fantásticos premios
        </h4>
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <div
            className={`form-control ${
              errors.nombre ? "ko" : formState.touched.nombre && "ok"
            }`}
          >
            <input
              ref={register({
                required: "El nombre es obligatoria",
                minLength: {
                  value: 6,
                  message:
                    "Introduce al menos 6 caracteres. Ej.: Alberto López Sánchez o Ayto. de Oleiros",
                },
              })}
              name="nombre"
              type="text"
              placeholder="Nombre *"
            ></input>
            {errors.nombre && (
              <span className="errorMessage">{errors.nombre.message}</span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.dni ? "ko" : formState.touched.dni && "ok"
            }`}
          >
            <input
              ref={register({
                required: "El DNI/CIF es obligatoria",
                minLength: {
                  value: 9,
                  message: "DNI: 12345678A | CIF: B12345678",
                },
              })}
              name="dni"
              type="alphanumeric"
              placeholder="Introduce tu DNI o CIF *"
            ></input>
            {errors.nombre && (
              <span className="errorMessage">{errors.nombre.message}</span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.email ? "ko" : formState.touched.email && "ok"
            }`}
          >
            <input
              ref={register({
                required: "El email es obligatorio",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "El email no es válido",
                },
              })}
              name="email"
              type="email"
              placeholder="Escribir e-mail *"
            ></input>
            {errors.email && (
              <span className="errorMessage">{errors.email.message}</span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.pasword ? "ko" : formState.touched.pasword && "ok"
            }`}
          >
            <input
              ref={register({
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Introduce una contraseña con al menos 6 caracteres",
                },
              })}
              name="password"
              type="password"
              placeholder="Introduce tu contraseña *"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.tipoCuenta ? "ko" : formState.touched.tipoCuenta && "ok"
            }`}
          >
            <label>Selecciona un tipo de cuenta</label>
            <select
              name="rol"
              ref={register({
                required: "Elige entre escritor u organizador",
              })}
              // name="tipoCuenta"
              // type="select"
              // placeholder="Selecciona un tipo de cuenta"
            >
              <option value="Escritor">Escritor</option>
              <option value="Organizador">Organizador</option>
            </select>
            {errors.tipoCuenta && (
              <span className="errorMessage">{errors.tipoCuenta.message}</span>
            )}
          </div>
          <div className="btn-container">
            {/* REVISAR. Nos falta hacia donde apunta */}
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              Regístrate
            </button>
            <div className="m-t-lg">
              <Link to="/">Volver</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
