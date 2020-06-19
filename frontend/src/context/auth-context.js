import React, { useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { clientApi } from "../http/apis";

// 1) Creamos el contexto
const AuthContext = React.createContext();

// Recuperamos el token del localStorage ya que si el usuario
// refresca la página del navegador necesito iniciar la aplicación
// con un estado autenticado

// 2) Creamos el custom Provider
export function AuthProvider({ children }) {
  // 2.1) Creamos Estados
  // En caso de que trabaje con roles deberia decodificar el token para obtener el role inicial

  // const [isAuthenticated, setIsAuthenticated] = useState(storedUser !== null);
  // const [currentUser, setCurrentUser] = useState(storedUser);

  // 2.2) Definiremos los métodos para modificar el estado si lo quiero hacer aqui
  // Tambien puede retornar las funciones modificadoras de estado y hacerlo desde los componentes

  // const [accessToken, setAccessToken] = useState(storedUser && storedUser.accessToken);
  // const [rol, setRol] = useState(userData && userData.role);
  // const [currentUserId, setCurrentUserId] = useState(userData && userData.userId);

  const [currentUser, setCurrentUser] = useState(null);

  const setUserAndToken = (data) => {
    //decodificar el token
    const userData = jwt.decode(data.accessToken);

    //colocar el token en el estado
    setCurrentUser(userData);

    //colocar token en toda la aplicacion
    clientApi.setToken(data.accessToken);
  };

  const setToken = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));

    setUserAndToken(data);
  };

  const deleteUser = () => {
    localStorage.removeItem("currentUser");
    clientApi.setToken(null);

    setCurrentUser(null);
  };

  //componente se inicia se ejecuta
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    setUserAndToken(storedUser);
  }, []);

  // 2.3) Devolvemos el Context
  // Si usara roles puedo devolver el role actual del usuario en lugar de isAuthenticated
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: currentUser != null,
        currentUser,
        setCurrentUser,
        setToken,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  // return (
  //   <AuthContext.Provider
  //     value={{
  //       isAuthenticated,
  //       setIsAuthenticated,
  //       currentUser,
  //       setCurrentUser
  //     }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );
}

// 3) Crear el custom hook
// Es lo que usaré en los componentes para acceder al value del contexto
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
