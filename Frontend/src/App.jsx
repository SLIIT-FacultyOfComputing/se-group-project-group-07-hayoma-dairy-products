import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import EnterOTP from './pages/EnterOTP';
import SetNewPassword from './pages/SetNewPassword';
import ResetConfirm from './pages/ResetConfirm'; // Import the new component



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/reset-confirm" element={<ResetConfirm />} /> {/* New route */}

      </Routes>
    </Router>
  );
}

export default App;