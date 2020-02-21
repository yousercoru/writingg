import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider } from './context/auth-context';
import { PrivateRoute } from './components/PrivateRoute';
import { Homepage } from "./pages/Homepage";
import { SoyOrganizador } from './pages/SoyOrganizador';
import { SoyEscritor } from './pages/SoyEscritor';


// import logo from './logo.svg';
import './styles.css';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
          <Route path="/soy-organizador">
            <SoyOrganizador />
          </Route>
          <Route path="/soy-escritor">
            <SoyEscritor />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
