import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EnterOTP.css';

function EnterOTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, '');
    if (digit.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
    // Add logic to verify OTP here (e.g., API call)
    navigate('/set-new-password'); // Navigate to SetNewPassword page
  };

  const handleBack = () => {
    navigate('/forgot-password');
  };

  const handleResend = () => {
    console.log('Resending email...');
  };

  return (
    <div className="otp-container">
      <div className="illustration-side">
        </div>


      <div className="form-side">
        <div className="otp-form">
          <button className="back-button" onClick={handleBack}>
            ←
          </button>
          <h2 className="otp-title">Check your email</h2>
          <p className="otp-description">
            Enter OTP sent to your email
          </p>
          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  maxLength="1"
                  className="otp-input"
                  required
                />
              ))}
            </div>
            <button type="submit" className="verify-button">
              Verify
            </button>
          </form>
          <p className="resend-email">
            Haven't got the email yet?{' '}
            <span onClick={handleResend} className="resend-link">
              Resend email
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EnterOTP;