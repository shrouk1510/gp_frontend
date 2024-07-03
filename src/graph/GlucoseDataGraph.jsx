import React from 'react';
import './GlucoseDataGraph.css';

const GlucoseDataGraph = () => {
  return (
    <div className="graph-container">
      <h1 className="title">Data Graph</h1>
      <form className="graph-form">
        <label className="form-label">
          Record Type:
          <select required className="form-input">
          <option value=""disabled selected>Select a type</option>
            <option value="type1">Glucose Measures</option>
            <option value="type2">Insulin Levels</option>
            <option value="type3">Carbohydrates</option>
          </select>
        </label>
        <label className="form-label">
          Start Date:
          <input type="date" className="form-input" />
        </label>
        <button type="button" className="submit-button">Generate Graph</button>
      </form>
    </div>
  );
};

export default GlucoseDataGraph;
