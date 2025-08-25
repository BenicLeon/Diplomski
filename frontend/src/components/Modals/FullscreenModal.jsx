
import React from "react";
import "../../css/fullscreenModal.css"; 

const FullscreenModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fullscreen-modal-overlay">
      <div className="fullscreen-modal-content">
        <button className="fullscreen-modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default FullscreenModal;
