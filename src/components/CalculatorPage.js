import React, { useState } from 'react';
import { useLocation }      from 'react-router-dom';
import './CalculatorPage.css';

const CalculatorPage = () => {
  // get caseNum, particleType, reNumber from navigation state
  const { caseNum, particleType, reNumber } = useLocation().state || {};

  // shared inputs (all start empty)
  const [g,  setG]  = useState('');
  const [Ps, setPs] = useState('');
  const [Pf, setPf] = useState('');
  const [d,  setD]  = useState('');
  const [u,  setU]  = useState('');
  const [h,  setH]  = useState('');
  const [Vf, setVf] = useState('');
  // extra for case 2&3:
  const [Cd, setCd] = useState('');

  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    // parse floats
    const gVal  = parseFloat(g),
          PsVal = parseFloat(Ps),
          PfVal = parseFloat(Pf),
          dVal  = parseFloat(d),
          uVal  = parseFloat(u),
          hVal  = parseFloat(h),
          VfVal = parseFloat(Vf),
          CdVal = parseFloat(Cd);

    // check every required field
    const missing = [];
    if (isNaN(gVal))  missing.push('g');
    if (isNaN(PsVal)) missing.push('Ps');
    if (isNaN(PfVal)) missing.push('Pf');
    if (isNaN(dVal))  missing.push('d');
    if (isNaN(uVal))  missing.push('μ');
    if (isNaN(hVal))  missing.push('h');
    if (isNaN(VfVal)) missing.push('Vf');
    if ((caseNum === 2 || caseNum === 3) && isNaN(CdVal))
      missing.push('Cd');

    if (missing.length) {
      alert(
        'Please enter valid numbers for: ' +
        missing.join(', ')
      );
      return;
    }

    // compute settling velocity
    let Vs;
    if (caseNum === 1) {
      Vs = (gVal * (PsVal - PfVal) * dVal * dVal) / (18 * uVal);
    } else {
      Vs = Math.sqrt(
        (4 * gVal * (PsVal - PfVal) * dVal) /
        (3 * CdVal * PfVal)
      );
    }

    const tCalc = hVal / Vs;
    const xCalc = VfVal * tCalc;

    setResults({ Vs, tCalc, xCalc });
  };

  return (
    <div className="calc-container">
      <h1>Prediction of Settling</h1>
      <p>
        <strong>Particle:</strong> {particleType} |
        <strong> Re:</strong> {reNumber}
      </p>

      {/* Shared inputs */}
      {[
        { label: 'Acceleration due to gravity (g)',    state: g,    setState: setG,  note: '(m/s²)' },
        { label: 'Particle density (Ps)',              state: Ps,   setState: setPs, note: '(kg/m³)' },
        { label: 'Fluid density (Pf)',                 state: Pf,   setState: setPf, note: '(kg/m³)', extraNote: 'e.g. 1000 for water' },
        { label: 'Particle diameter (d)',              state: d,    setState: setD,  note: '(m)' },
        { label: 'Dynamic viscosity (μ)',              state: u,    setState: setU,  note: '(Pa·s)' },
        { label: 'Canal depth/height (h)',              state: h,    setState: setH,  note: '(m)' },
        { label: 'Flow velocity of canal (Vf)',        state: Vf,   setState: setVf,note: '(m/s)' },
      ].map(({ label, state, setState, note, extraNote }) => (
        <div className="input-group" key={label}>
          <label>{label}:</label>
          <input
            type="number"
            step="any"
            value={state}
            onChange={e => setState(e.target.value)}
            placeholder={note}
          />
          {extraNote && <small className="field-note">{extraNote}</small>}
        </div>
      ))}

      {/* Drag-coefficient reference for Case 2 & 3 */}
      {(caseNum === 2 || caseNum === 3) && (
        <div className="drag-section">
          <h2>Drag Coefficient Reference</h2>
          <table className="drag-table">
            <thead>
              <tr>
                <th>Re</th>
                <th>Flow Regime</th>
                <th>Cd Formula / Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt; 0.1</td>
                <td>Stokes’ Law</td>
                <td>Cd = 24 / Re</td>
              </tr>
              <tr>
                <td>0.1 – 1</td>
                <td>Intermediate Laminar</td>
                <td>
                  Cd = (24 / Re)·(1 + 0.15·Re<sup>0.687</sup>)
                </td>
              </tr>
              <tr>
                <td>1 – 1000</td>
                <td>Transition Flow</td>
                <td>Cd = 24·Re<sup>−0.6</sup> (empirical)</td>
              </tr>
              <tr>
                <td>1000 – 10<sup>5</sup></td>
                <td>Turbulent Flow</td>
                <td>Cd ≈ 0.47</td>
              </tr>
              <tr>
                <td>&gt; 10<sup>5</sup></td>
                <td>Fully Turbulent</td>
                <td>Cd ≈ 0.2 – 0.4</td>
              </tr>
            </tbody>
          </table>
          <p className="field-note">
            (Use this table to pick your Cd based on Re)
          </p>

          <div className="input-group">
            <label>Drag Coefficient (Cd):</label>
            <input
              type="number"
              step="any"
              value={Cd}
              onChange={e => setCd(e.target.value)}
              placeholder="e.g. 0.47"
            />
          </div>
        </div>
      )}

      <button className="calc-btn" onClick={handleCalculate}>
        Calculate
      </button>

      {results && (
        <div className="results">
          <h2>Formula Summary</h2>

          {caseNum === 1 ? (
            <>
              <p>
                <code>
                  Vs = [g·(Ps−Pf)·d²] / (18·μ) = {results.Vs.toFixed(4)} m/s
                </code>
              </p>
            </>
          ) : (
            <>
              <p>
                <code>
                  Vs = √[4·g·d·(Ps−Pf) / (3·Cd·Pf)] = {results.Vs.toFixed(4)} m/s
                </code>
              </p>
            </>
          )}

          <p>
            <code>
              t = h / Vs = {results.tCalc.toFixed(4)} s
            </code>
          </p>
          <p>
            <code>
              x = Vf · t = {results.xCalc.toFixed(4)} m
            </code>
          </p>

          <div className="final-stmt">
            The <strong>{particleType}</strong> particle of diameter{' '}
            <strong>{d}</strong> m, (Re = <strong>{reNumber}</strong>), will
            settle approximately <strong>{results.xCalc.toFixed(4)}</strong> m
            after <strong>{results.tCalc.toFixed(4)}</strong> s under these
            conditions.
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;
