import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import '../styles/SetNewPassword.css';

function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Password strength checker function
  const checkPasswordStrength = (pwd) => {
    const minLength = pwd.length > 8;
    const hasLowercase = /[a-z]/.test(pwd);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (minLength && hasLowercase && hasSymbol) {
      return "Strong";
    } else if (minLength && hasLowercase) {
      return "Medium";
    }
    else if (hasSymbol && hasLowercase) {
      return "Medium";
    }
    else {
      return "Weak";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const strength = checkPasswordStrength(password);
    if (strength === "Weak") {
      alert('Please use a stronger password with more than 8 characters, at least 1 lowercase letter, and 1 symbol');
      return;
    }

    console.log('New password set:', { password, confirmPassword });
    // Add logic to update password here (e.g., API call)
    navigate('/reset-confirm');
  };

  const handleBack = () => {
    navigate('/enter-otp');
  };

  const passwordStrength = checkPasswordStrength(password);

  return (
      <div className="newPW-container">
        {/* Left Side - Illustration */}
        <div className="illustration-side">
          <div className="illustration"></div>
        </div>

        {/* Right Side - Set New Password Form */}
        <div className="form-side">
          <div className="newPW-form">
            <button className="back-button" onClick={handleBack}>
              ←
            </button>
            <h2 className="input-title">Set a new password</h2>
            <form onSubmit={handleSubmit}>
              {/* Password Field */}
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      required
                  />
                  <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
                </span>
                </div>
                {password && (
                    <div className={`password-strength strength-${passwordStrength.toLowerCase()}`}>
                      Password Strength: {passwordStrength}
                    </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="input-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="password-wrapper">
                  <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      required
                  />
                  <span className="toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
                </span>
                </div>
              </div>

              <button type="submit" className="updatePW-button">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default SetNewPassword;