
import React from "react";
import "../css/popupmodel.css"; 

const PopupModal = ({ show, onClose, onLogin }) => {
  if (!show) return null; 

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <p>You need to log in to add cakes to the cart.</p>
        <div className="popup-buttons">
          <button onClick={onLogin}>Go to Login</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
