import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js directly for auto-registration of components
import "./GlucoseDataGraph.css";
import {
  getAllMedicalRecordTypesRequest,
  getGraphDataRequest,
} from "../lib/api/medical-record";

const GlucoseDataGraph = () => {
  const [recordTypes, setRecordTypes] = useState([]);
  const [recordType, setRecordType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [data, setData] = useState(null);

  const handleGenerateGraph = () => {
    // Sample data generation for demonstration. Replace with actual data collection logic.
    const generatedData = {
      labels: ["2023-07-01", "2023-07-02", "2023-07-03", "2023-07-04"],
      datasets: [
        {
          label: recordType,
          data: [75, 80, 65, 90], // Replace with actual data
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    };
    setData(generatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getGraphDataRequest({
        recordTypeId: recordType,
        startDate,
      });
      
    } catch (error) {}
    handleGenerateGraph();
  };

  useEffect(() => {
    const fetchRecordTypes = async () => {
      const recordTypes = await getAllMedicalRecordTypesRequest();
      setRecordTypes(recordTypes);
    };
    fetchRecordTypes();
  }, []);

  return (
    <div className="graph-container">
      <h1 className="title">Data Graph</h1>
      <form className="graph-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Record Type:
          <select
            required
            className="form-input"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
          >
            <option value="" disabled>
              Select a type
            </option>
            {recordTypes.map((type) => (
              <option key={type.typeId} value={type.typeId}>
                {type.type}
              </option>
            ))}
            {/* <option value="Glucose Measures">Glucose Measures</option>
            <option value="Insulin Levels">Insulin Levels</option>
            <option value="Carbohydrates">Carbohydrates</option> */}
          </select>
        </label>
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
