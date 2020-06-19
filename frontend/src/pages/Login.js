import React /*, {useState}*/ from "react";
import jwt from "jsonwebtoken";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../http/authService";
// import { signIn } from "../http/authService";
import { useAuth } from "../context/auth-context";
// import { Header } from "../components/Header";

export function Login() {
  const {
    handleSubmit,
    register,
    errors,
    // watch,
    formState,
    setError,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const history = useHistory();
  const { setToken } = useAuth();

  const handleLogin = (formData) => {
    return login(formData)
      .then((response) => {
        setToken(response.data);
        history.push("/");
      })
      .catch((error) => {
        setValue("password", "");
        setError("password", "credentials", "Tus credenciales no son válidas");
      });
  };

  return (
    <React.Fragment>
      {/* <Header /> */}
      <main className="centered-container">
        <h1>
          writingg<span className="writingg-logo">.</span>
        </h1>
        <h4 className="p-t-md">Hoy es un gran día para leer y escribir</h4>
        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit(handleLogin)} /*noValidate*/>
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
              placeholder="Escribir e-mail"
            ></input>
            {errors.mail && (
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
              placeholder="Introduce tu contraseña"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>
          <div className="btn-container">
            {/* REVISAR. No falta hacia donde apunta */}
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              Acceder
            </button>
            <div className="m-t-lg">
              <Link to="/register">¿No estás registrado? Crea una cuenta</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
