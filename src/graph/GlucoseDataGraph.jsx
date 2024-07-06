import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js directly for auto-registration of components
import './GlucoseDataGraph.css';

const GlucoseDataGraph = () => {
  const [startDate, setStartDate] = useState('');
  const [data, setData] = useState(null);

  const handleGenerateGraph = () => {
    // Sample data generation for demonstration. Replace with actual data collection logic.
    const generatedData = generateData(startDate);

    setData(generatedData);
  };

  const generateData = (startDate) => {
    // Calculate current date and time
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month is zero-indexed
    const currentDay = ('0' + currentDate.getDate()).slice(-2);
    const currentTime = `${currentYear}-${currentMonth}-${currentDay}`;

    // Generate labels and data from start date to current time
    const labels = [];
    const dataValues = [];
    let currentDateIter = new Date(startDate);

    while (currentDateIter <= currentDate) {
      const formattedDate = currentDateIter.toISOString().slice(0, 10); // Format as YYYY-MM-DD
      labels.push(formattedDate);

      // Replace with actual data retrieval logic based on date
      const randomValue = Math.floor(Math.random() * 150) + 50; // Example random data
      dataValues.push(randomValue);

      currentDateIter.setDate(currentDateIter.getDate() + 1); // Move to next day
    }

    return {
      labels: labels,
      datasets: [
        {
          
          data: dataValues,
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };
  };

  return (
    <div className="graph-container">
      <h1 className="title">Glucose Data Graph</h1>
      <form
        className="graph-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateGraph();
        }}
      >
        <label className="form-label">
          Start Date:
          <input
            type="date"
            className="form-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-button">
          Generate Graph
        </button>
      </form>
      {data && (
        <div className="chart">
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export default GlucoseDataGraph;
