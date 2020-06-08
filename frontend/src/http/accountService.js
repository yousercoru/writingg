import axios from "axios";

export function createAccount(registerData) {
  console.log(registerData, "hola");
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/accounts`, registerData);
  }