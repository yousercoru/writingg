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
        }
        return response;
      },
      function (error) {
        if (
          error.response.status === 401 &&
          !error.config.url.includes("/auth")
        ) {
          localStorage.removeItem("currentUser");
        }

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
