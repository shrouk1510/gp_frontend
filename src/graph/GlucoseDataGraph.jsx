import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js directly for auto-registration of components
import "./GlucoseDataGraph.css";
import {
  getAllMedicalRecordTypesRequest,
  getGraphDataRequest,
} from "../lib/api/medical-record";
import toast from "react-hot-toast";

const GlucoseDataGraph = () => {
  const [recordTypes, setRecordTypes] = useState([]);
  const [recordType, setRecordType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [data, setData] = useState(null);

  const handleGenerateGraph = (graphData) => {
    // Sample data generation for demonstration. Replace with actual data collection logic.
    const generatedData = generateData(graphData);

    setData(generatedData);
  };

  const generateData = (graphData) => {
    // Calculate current date and time
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Month is zero-indexed
    const currentDay = ("0" + currentDate.getDate()).slice(-2);
    const currentTime = `${currentYear}-${currentMonth}-${currentDay}`;

    // Generate labels and data from start date to current time
    const labels = [];
    const dataValues = [];
    // let currentDateIter = new Date(startDate);

    graphData.forEach((data) => {
      const label = new Date(data.date).toISOString().split("T")[0];
      const value = data.measurements;
      labels.push(label);
      dataValues.push(value);
    });
    // while (currentDateIter <= currentDate) {
    //   const formattedDate = currentDateIter.toISOString().slice(0, 10); // Format as YYYY-MM-DD
    //   labels.push(formattedDate);

    //   // Replace with actual data retrieval logic based on date
    //   const randomValue = Math.floor(Math.random() * 150) + 50; // Example random data
    //   dataValues.push(randomValue);

    //   currentDateIter.setDate(currentDateIter.getDate() + 1); // Move to next day
    // }
    // console.log(recordTypes, recordType);

    const selectedRecordType = recordTypes?.find(
      (type) => type.typeId === Number(recordType)
    );

    // console.log(selectedRecordType);
    const result = {
      labels: labels,
      datasets: [
        {
          label: selectedRecordType?.type ?? "",
          data: dataValues,
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    };

    // console.log(result);
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const graphData = await getGraphDataRequest({
        recordTypeId: recordType,
        startDate,
      });

      handleGenerateGraph(graphData);
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
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
          <Line data={data} options={{ maintainAspectRatio: false }}/>
        </div>
      )}
    </div>
  );
};

export default GlucoseDataGraph;
