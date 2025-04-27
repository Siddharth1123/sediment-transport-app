import React, { useState } from 'react';
import './CaseDetermination.css';
// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
const CaseDetermination = () => {
  const navigate = useNavigate(); 
  const [particleType, setParticleType] = useState('');
  const [reNumber, setReNumber] = useState('');
  const [caseText, setCaseText] = useState('');
  const [caseNum, setCaseNum]       = useState(null);
  const handleDone = () => {
    const Re = parseFloat(reNumber);
    let txt = '';

    if (isNaN(Re)) {
      txt = 'Please enter a valid Reynolds number.';
      setCaseNum(null);
    } else if (Re < 1) {
      setCaseNum(1);
      txt = `Case 1:
      
• As Re < 1, viscous force dominates, and particles will settle down very slowly.
• Stokes' law is used to find the settling velocity.
• Stokes’ law applies when flow is very slow (laminar).`;
    } else if (Re >= 1 && Re <= 1000) {
      setCaseNum(2);
      txt = `Case 2:
• As 1 ≤ Re ≤ 1000, both viscous and inertia forces influence settling.
• Use empirical transitional‐flow formulae (e.g. Rubey’s Equation).
• Neither pure Stokes’ nor Newton’s law is accurate in this range.`;
    } else /* Re > 1000 */ {
      setCaseNum(3);
      txt = `Case 3:
• As Re > 1000, inertia forces dominate.
• Larger particles settle quickly with a turbulent wake.
• Newton’s law (turbulent‐flow regime) applies.`;
    }

    setCaseText(txt);
  };

  return (
    <div className="case-container">
      <h1><strong>Case Determination</strong></h1>

      <div className="input-group">
        <label>Type of Particle:</label>
        <input
          type="text"
          value={particleType}
          onChange={e => setParticleType(e.target.value)}
          placeholder="e.g. Fine Sand"
        />
      </div>

      <div className="input-group">
        <label>Enter the value of Re:</label>
        <input
          type="number"
          step="any"
          value={reNumber}
          onChange={e => setReNumber(e.target.value)}
          placeholder="e.g. 0.03"
        />
        <small>Re: Reynolds Number</small>
      </div>

      <div className="table-wrapper">
        <h2>Standard Values for Different Particle Sizes</h2>
        <table className="guidance-table">
          <thead>
            <tr>
              <th>Particle Type</th>
              <th>Diameter d (mm)</th>
              <th>ρ<sub>s</sub> (kg/m³)</th>
              <th>Reynolds Number</th>
              <th>Flow Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Clay</td>         <td>0.0001</td><td>2650</td><td>&lt;0.01</td>  <td>Stokes' Law</td></tr>
            <tr><td>Clay</td>         <td>0.0005</td><td>2650</td><td>&lt;0.05</td>  <td>Stokes' Law</td></tr>
            <tr><td>Silt</td>         <td>0.001</td> <td>2650</td><td>&lt;0.1</td>   <td>Stokes' Law</td></tr>
            <tr><td>Silt</td>         <td>0.002</td> <td>2650</td><td>0.1–0.2</td><td>Stokes' Law</td></tr>
            <tr><td>Silt</td>         <td>0.005</td> <td>2650</td><td>0.2–0.5</td><td>Stokes' Law</td></tr>
            <tr><td>Fine Sand</td>    <td>0.01</td>  <td>2650</td><td>0.5–1</td>  <td>Stokes' Law</td></tr>
            <tr><td>Fine Sand</td>    <td>0.02</td>  <td>2650</td><td>1–2</td>    <td>Stokes' Law</td></tr>
            <tr><td>Fine Sand</td>    <td>0.05</td>  <td>2650</td><td>2–5</td>    <td>Stokes' Law</td></tr>
            <tr><td>Medium Sand</td>  <td>0.1</td>   <td>2650</td><td>5–10</td>   <td>Transition Flow</td></tr>
            <tr><td>Medium Sand</td>  <td>0.2</td>   <td>2650</td><td>10–20</td>  <td>Transition Flow</td></tr>
            <tr><td>Medium Sand</td>  <td>0.3</td>   <td>2650</td><td>20–30</td>  <td>Transition Flow</td></tr>
            <tr><td>Coarse Sand</td>  <td>0.5</td>   <td>2650</td><td>30–50</td>  <td>Transition Flow</td></tr>
            <tr><td>Coarse Sand</td>  <td>0.75</td>  <td>2650</td><td>50–100</td> <td>Transition Flow</td></tr>
            <tr><td>Coarse Sand</td>  <td>1.0</td>   <td>2650</td><td>100–200</td><td>Transition Flow</td></tr>
            <tr><td>Fine Gravel</td>  <td>2.0</td>   <td>2650</td><td>200–500</td> <td>Transition to Newton’s Law</td></tr>
            <tr><td>Fine Gravel</td>  <td>5.0</td>   <td>2650</td><td>500–2000</td><td>Transition to Newton’s Law</td></tr>
            <tr><td>Coarse Gravel</td><td>10</td>    <td>2650</td><td>5000</td>   <td>Newton’s Law</td></tr>
            <tr><td>Coarse Gravel</td><td>20</td>    <td>2650</td><td>10<sup>4</sup></td><td>Newton’s Law</td></tr>
            <tr><td>Coarse Gravel</td><td>50</td>    <td>2650</td><td>10<sup>5</sup></td><td>Newton’s Law</td></tr>
            <tr><td>Pebbles</td>       <td>100</td>   <td>2650</td><td>10<sup>6</sup></td><td>Newton’s Law</td></tr>
          </tbody>
        </table>
        <p className="note">(use this table to fill the Reynolds Number)</p>
      </div>

      <button className="done-btn" onClick={handleDone}>Done</button>

      {caseText && (
        <div className="case-result">
          <pre>{caseText}</pre>
        </div>
      )}

       {/* Next button, bottom-right */}
       {caseText && (
        <button
                  className="next-btn"
                  onClick={() =>
                    navigate('/calculator', {
                      state: { caseNum, particleType, reNumber }
                    })
                  }
                >
                  Next
                </button>
      )}
    </div>
  );
};

export default CaseDetermination;
