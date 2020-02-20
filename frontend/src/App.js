import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider } from './context/auth-context';
import { PrivateRoute } from './components/PrivateRoute';


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
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
