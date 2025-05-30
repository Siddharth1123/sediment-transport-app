// src/components/SplashScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/calculator'),50000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1><strong>Walchand Institute Of Technology,Solapur</strong></h1>
      <img src="/college-logo.png" alt="College Logo" className="logo" />
      <p>Presents:</p>
      <h2><strong>Prediction of Sediment Transport in Irrigation Canal</strong></h2>

      <div className="team-list">
        <h3>Done By:</h3>
        <ul>
          <li>Prasanna Bhadange</li>
          <li>Pruthvijeet Sarawade</li>
          <li>Ritesh Bande</li>
          <li>Malleshwari Sindam</li>
          <li>Aishwarya Nagur</li>
          <li>Ajinkya Pawar</li>
        </ul>
      </div>

      <p>Special thanks to <strong>Siddharth Jain</strong></p>
      <p>Under guidance of <strong>Prof. Sachin Deshmukh</strong> </p>

      <button onClick={() => navigate('/case-determination')}>Start</button>
    </div>
  );
};

export default SplashScreen;
