import React, { useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { clientApi } from "../http/apis";
import { getAuthUser } from "../http/authService";

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
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  const setUserAndToken = async (data) => {
    //decodificar el token
    try {
      const userData = jwt.decode(data.accessToken);

      //colocar el token en el estado
      setCurrentUser(userData);

      //colocar token en toda la aplicacion
      clientApi.setToken(data.accessToken);

      //obtener datos del usuario
      const result = await getAuthUser();

      setUserLogged(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setToken = async (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));

    await setUserAndToken(data);
    setIsUserLoaded(true);
  };

  const deleteUser = () => {
    localStorage.removeItem("currentUser");
    clientApi.setToken(null);

    setCurrentUser(null);
  };

  //componente se inicia se ejecuta
  useEffect(() => {
    const getData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));

      await setUserAndToken(storedUser);

      setIsUserLoaded(true);
    };

    getData();
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
        isUserLoaded,
        userLogged,
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
