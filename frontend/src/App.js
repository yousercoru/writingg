import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { Home } from "./pages/Home";
import { SoyOrganizador } from "./pages/SoyOrganizador";
import { SoyEscritor } from "./pages/SoyEscritor";

import { AuthProvider } from "./context/auth-context";
import { PrivateRoute } from "./components/PrivateRoute";
import AltaConcurso from "./pages/AltaConcurso";
import { Header } from "./components/Header";

// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <SoyEscritor /> */}
      {/* <HomeSlider /> */}
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/alta-concurso">
            <AltaConcurso />
          </Route>

          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/soy-organizador">
            <SoyOrganizador />
          </Route>
          <Route path="/soy-escritor">
            <SoyEscritor />
          </Route>
        </Switch>
      </AuthProvider>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
