import React from "react";

//components
import Header from "./components/header";
import Footer from "./components/footer";
import Homepage from "./pages/homePage";

// includes
import "./css/index.css";


export default function App() {
  return (
    <main>
      {/*
       - Configurar mis rutas y Providers 
       - Podria añadir componentes comunes de mi aplicación con <Header /> o <Footer /> 
      */}
      {/* <Header/> */}
      <Header/>
      <Homepage/>
      <Footer/>
      
    </main>
  );
}
