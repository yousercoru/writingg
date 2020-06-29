import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth-context";

function EditarCuenta(props) {
  const { userLogged } = useAuth();

  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: userLogged ? userLogged : {},
  });

  const handleSave = (userData) => {
    console.log(userData);
  };
  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div>
          <label>Nombre</label>
          <input
            ref={register({
              required: "El nombre es obligatorio",
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
        <div>
          <label>DNI</label>
          <input
            ref={register({
              required: "El DNI/CIF es obligatorio",
              minLength: {
                value: 9,
                message: "DNI: 12345678A | CIF: B12345678",
              },
            })}
            name="dni"
            type="alphanumeric"
            placeholder="Introduce tu DNI o CIF *"
          ></input>
          {errors.dni && (
            <span className="errorMessage">{errors.dni.message}</span>
          )}
        </div>
        <div>
          <label>Email</label>
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
        <button type="submit" className="btn">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default EditarCuenta;
