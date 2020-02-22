import React from "react";
// import { Link } from "react-router-dom";
import "../css/footer.css";

export function Footer() {
  return (
    <footer>
        <div>
            <p className="footer">© Writingg 2020 Todos los derechos reservados</p>
        </div>
        <div>
            <a className="footer" href="http://linkedin.com/">Linkedin</a>
            <a className="footer" href="http://facebook.com/">Facebook</a>
            <a className="footer" href="http://twitter.com/">Twitter</a>
            <a className="footer" href="http://instagram.com/">Instagram</a>
        </div>
    </footer>
  );
}