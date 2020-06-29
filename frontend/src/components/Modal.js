import React, { useState, useMemo } from "react";

import "../css/modal.css";

function Modal({ isModalOpen, onModalClose, children }) {
  return (
    <div class={isModalOpen ? "modal" : "modal-close"}>
      <div class="modal-content">
        <span onClick={() => onModalClose()} class="close">
          &times;
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
