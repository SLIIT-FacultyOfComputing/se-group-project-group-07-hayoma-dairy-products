import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResetConfirm.css';

function ResetConfirm() {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate('/'); // Navigate back to the login page
  };

  return (
    <div className="confirm-container">
      {/* Left Side - Illustration */}
      <div className="illustration-side">
      </div>

      {/* Right Side - Confirmation Message */}
      <div className="form-side">
        <div className="dialogue-background">
          <div className="confirmation-content">
            <div className="checkmark-icon">✔</div>
            <h2 className="confirmation-title">Your Password Updated</h2>
            <p className="confirmation-message">Successfully!</p>
            <button className="ok-button" onClick={handleOk}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetConfirm;