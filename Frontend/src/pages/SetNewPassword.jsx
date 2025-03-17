import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SetNewPassword.css';

function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('New password set:', { password, confirmPassword });
    // Add logic to update password here (e.g., API call)
    navigate('/reset-confirm'); // Navigate to ResetConfirm page
  };

  const handleBack = () => {
    navigate('/enter-otp'); // Navigate back to the enter OTP page
  };

  return (
    <div className="login-container">
      {/* Left Side - Illustration */}
      <div className="illustration-side">
        <div className="illustration">
          {/* Placeholder for the illustration */}
        </div>
      </div>

      {/* Right Side - Set New Password Form */}
      <div className="form-side">
        <div className="login-form">
          <button className="back-button" onClick={handleBack}>
            ←
          </button>
          <h2 className="login-title">Set a new password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;