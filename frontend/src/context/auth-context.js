import React, { useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { clientApi } from "../http/apis";
import { getAuthUser } from "../http/authService";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  const setUserAndToken = async (data) => {
    try {
      const userData = jwt.decode(data.accessToken);

      setCurrentUser(userData);

      clientApi.setToken(data.accessToken);

      const result = await getAuthUser();

      setUserLogged(result.data.data);
    } catch (error) {
      deleteUser();
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

  useEffect(() => {
    const getData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));

      await setUserAndToken(storedUser);

      setIsUserLoaded(true);
    };

    getData();
  }, []);

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
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
