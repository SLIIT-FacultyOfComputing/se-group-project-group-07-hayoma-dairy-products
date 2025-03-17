import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted for OTP:', email);
    // Add logic to send OTP here (e.g., API call)
    navigate('/enter-otp'); // Correct navigation to EnterOTP page
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the login page
  };

  return (
    <div className="login-container">
      {/* Left Side - Illustration */}
      <div className="illustration-side">
        <div className="illustration">
          {/* Placeholder for the illustration */}
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="form-side">
        <div className="login-form">
          <button className="back-button" onClick={handleBack}>
            ←
          </button>
          <h2 className="login-title">Forgot Password</h2>
          <p className="forgot-password-description">
            Please enter your email to send OTP
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="login-button">
              SEND OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;