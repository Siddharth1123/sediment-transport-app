// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen       from './components/SplashScreen';
import CaseDetermination  from './components/CaseDetermination';
import CalculatorPage     from './components/CalculatorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                     element={<SplashScreen />} />
        <Route path="/case-determination"   element={<CaseDetermination />} />
        <Route path="/calculator"           element={<CalculatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
