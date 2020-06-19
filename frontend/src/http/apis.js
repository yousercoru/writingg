import axios from "axios";

let headers = {
  Accept: ["application/json"],
  "Content-Type": "application/json",
};

const default_config = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers,
};

const timeout = 5000;

class ClientAPI {
  constructor() {
    this.client = axios.create({
      ...default_config,
      timeout,
      headers: {
        ...headers,
      },
    });
  }

  setToken(token) {
    this.client = axios.create({
      ...default_config,
      timeout,
      headers: {
        authorization: `Bearer ${token}`,
        ...headers,
      },
    });
  }

  addMiddleWare() {
    this.client.interceptors.response.use(
      function (response) {
        console.log("RESPONSE INTERCEPTOR:", response);
        if (response.data.accessToken) {
          //localStorage.setItem("currentUser", JSON.stringify(response.data));
          //token = response.data.accessToken;
        }
        return response;
      },
      function (error) {
        // En caso de que el token expire (401)
        // y no sea el endpoint de login (que tambien devuelve 401 cuando las credenciales son invalidas)
        // Entonces redirijo a la URL de login y limpio el localStorage
        if (
          error.response.status === 401 &&
          !error.config.url.includes("/auth")
        ) {
          localStorage.removeItem("currentUser");
          window.location.href = "/";
        }
        // Siempre devolver el error de esta forma, a través de Promise.reject
        return Promise.reject(error);
      }
    );
  }

  getClient() {
    this.addMiddleWare();
    return this.client;
  }
}

const clientApi = new ClientAPI();

export { clientApi };
