import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createAccount } from "../http/accountService";

import { useAuth } from "../context/auth-context";
import Modal from "../components/Modal";

export function Register() {
  const [modalConfirm, toggleModalConfirm] = useState(false);

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
    return createAccount(registerData)
      .then((response) => {
        toggleModalConfirm(true);
      })
      .catch((error) => {});
  };

  return (
    <React.Fragment>
      <Modal
        isModalOpen={modalConfirm}
        onModalClose={() => toggleModalConfirm(false)}
      >
        <div>
          <div>Registro correcto. Ya puedes acceder a tu cuenta</div>
          <button onClick={() => history.push("/login")}>Ir a login</button>
        </div>
      </Modal>

      <main className="centered-container">
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
            >
              <option value="escritor">Escritor</option>
              <option value="organizador">Organizador</option>
            </select>
            {errors.tipoCuenta && (
              <span className="errorMessage">{errors.tipoCuenta.message}</span>
            )}
          </div>
          <div className="btn-container">
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
