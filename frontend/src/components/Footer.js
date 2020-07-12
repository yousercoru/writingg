import React from "react";

import SocialMedia from "./SocialMedia";
import "../css/footer.css";

export function Footer() {
  return (
    <footer>
      <div>
        <p className="footer">© Writingg 2020 Todos los derechos reservados</p>
      </div>
      <div className="redes-sociales">
        <SocialMedia />
      </div>
    </footer>
  );
}
