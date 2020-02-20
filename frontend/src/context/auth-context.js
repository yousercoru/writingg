import React, { useContext, useState } from 'react';
// import jwt_decode from 'jwt-decode';

// 1) Creamos el contexto
const AuthContext = React.createContext();

// Recuperamos el token del localStorage ya que si el usuario
// refresca la página del navegador necesito iniciar la aplicación
// con un estado autenticado
const storedUser = JSON.parse(localStorage.getItem('currentUser'));

// 2) Creamos el custom Provider
export function AuthProvider({ children }) {
  // 2.1) Creamos Estados
  // En caso de que trabaje con roles deberia decodificar el token para obtener el role inicial
  // const [rol, setRol] = useState(jwt_decode(storedUser.token));
  // const [isAuthenticated, setIsAuthenticated] = useState(storedUser !== null);
  const [currentUser, setCurrentUser] = useState(storedUser);

  // 2.2) Definiremos los métodos para modificar el estado si lo quiero hacer aqui
  // Tambien puede retornar las funciones modificadoras de estado y hacerlo desde los componentes

  // 2.3) Devolvemos el Context
  // Si usara roles puedo devolver el role actual del usuario en lugar de isAuthenticated
  return (
    <AuthContext.Provider
      value={{ /*rol, setRol, */currentUser, setCurrentUser }}
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
