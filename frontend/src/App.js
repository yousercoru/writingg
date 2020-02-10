import React from "react";

//components
import Header from "./components/headerComponent/header";
import Footer from "./components/footerComponent/footer";
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
      <Header/>
      <Homepage/>
      <Footer/>
      
    </main>
  );
}
