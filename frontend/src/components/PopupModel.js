import React from "react";
import "../css/popupmodel.css"; 

// Popup modal component for login prompt
const PopupModal = ({ show, onClose, onLogin }) => {
  if (!show) return null; 

  return (
    <div className="popup-overlay"> 
      <div className="popup-modal"> 
        <p>You need to log in to add cakes to the cart.</p> 
        
        <div className="popup-buttons"> {/* Button container */}
          <button onClick={onLogin}>Go to Login</button> {/* Redirects to login page */}
          <button onClick={onClose}>Close</button> {/* Closes the popup */}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
