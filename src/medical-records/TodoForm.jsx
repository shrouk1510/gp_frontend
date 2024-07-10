import React, { useState, useEffect } from "react";
import "./records.css";
import toast from "react-hot-toast";
import {
  updateMedicalRecordRequest,
  uploadMedicalRecordRequest,
} from "../lib/api/medical-record";
import { formatDate } from "../lib/helpers/date-formatter";
import { useMedicalRecordStore } from "../hooks/use-medical-record-store";

const GLUCOSE_TYPE_ID = 1;

const TodoForm = ({ setViewTable, setWarningMessage, initialRecord }) => {
  const { addMedicalRecord, updateMedicalRecord } = useMedicalRecordStore();
  const [type, setType] = useState(
    initialRecord ? initialRecord.recordTypeId : ""
  );
  const [measurement, setMeasurement] = useState(
    initialRecord ? initialRecord.measurements : ""
  );
  const [notes, setNotes] = useState(
    initialRecord ? [initialRecord.note] : [""]
  );
  const [date, setDate] = useState(
    initialRecord ? formatDate(initialRecord.date) : ""
  );

  useEffect(() => {
    if (initialRecord) {
      setType(initialRecord.type);
      setMeasurement(initialRecord.measurements);
      setNotes([initialRecord.note]);
      setDate(formatDate(initialRecord.date));
    }
  }, [initialRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(measurement)) {
      toast.error("Please enter a valid number for the measurement.");
      return;
    }
    const measurementValue = parseFloat(measurement);

    try {
      let warning = "";
      if (measurementValue < 70) {
        warning =
          "Your blood glucose level is low. Consume fast-acting carbohydrates to raise blood sugar quickly. If experiencing symptoms like shakiness, sweating, or confusion, seek medical attention.";
      } else if (measurementValue >= 70 && measurementValue < 100) {
        warning =
          "Your blood glucose level is within the normal range. If you're diabetic, consult your doctor to see if this is a normal range for you and if any adjustments to medication are needed.";
      } else if (measurementValue >= 100 && measurementValue < 126) {
        warning =
          "Your blood glucose level indicates prediabetes. Lifestyle changes are crucial to prevent progression. Consider diet modifications, increased physical activity, and regular blood sugar monitoring.";
      } else if (measurementValue >= 126 && measurementValue < 200) {
        warning =
          "Your blood glucose level is high, especially after fasting. Monitor blood sugar more frequently and contact your doctor to discuss possible medication adjustments.";
      } else if (measurementValue >= 200 && measurementValue < 300) {
        warning =
          "Your blood glucose level is very high, especially after a meal. Contact your doctor immediately to discuss medication adjustments.";
      } else {
        warning =
          "Your blood glucose level is dangerously high. Seek immediate medical attention. Do not wait.";
      }

      if (!initialRecord) {
        const newRecord = await uploadMedicalRecordRequest({
          recordTypeId: GLUCOSE_TYPE_ID,
          measurements: measurementValue,
          note: notes.length > 0 ? notes[0] : "",
          date,
        });

        // const newRecord = {
        //   recordId: 2,
        //   type,
        //   measurements: measurementValue,
        //   note: notes.length > 0 ? notes[0] : "",
        //   date,
        // };

        addMedicalRecord(newRecord);
        toast.success("Medical record added");

        // if (warning) {
        setWarningMessage(newRecord?.advice || warning);
        // }
      } else {
        const updatedRecord = await updateMedicalRecordRequest({
          recordId: initialRecord.recordId,
          recordTypeId: GLUCOSE_TYPE_ID,
          measurements: measurementValue,
          note: notes.length > 0 ? notes[0] : "",
          date,
        });

        // const updatedRecord = {
        //   recordId: 2,
        //   recordTypeId: GLUCOSE_TYPE_ID,
        //   measurements: measurementValue,
        //   note: notes?.length > 0 ? notes[0] : "",
        //   date,
        //   advice: null,
        // };

        updateMedicalRecord(updatedRecord);

        setWarningMessage(updatedRecord?.advice || warning);

        toast.success("Medical record updated");
      }

      // Reset form fields
      setType("");
      setMeasurement("");
      setNotes([""]);
      setDate("");
      setViewTable(true); // Switch to table view after submission
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

  const handleNoteChange = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  //   const addNoteField = () => {
  //     setNotes([...notes, ""]);
  //   };

  const removeNoteField = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div className="uu">
      <div className="todo-form-container">
        
        <div className="headeer">
          <div className="texxt">Upload Glucose Measure</div>
          <div className="underliney"></div>
        </div>

        <form className="qq" onSubmit={handleSubmit}>
          <div className="form-g">
            <label htmlFor="measurement">Measurement:</label>
            <input
              type="number"
              id="measurement"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
              required
            />
          </div>
          <div className="form-gr">
            <label htmlFor="notes">Notes:</label>
            {notes?.map((note, index) => (
              <div key={index} className="note-container">
                <textarea
                  id={`note-${index}`}
                  value={note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeNoteField(index)}
                  className="remove-note-button"
                >
                  <span role="img" aria-label="bin">
                    🗑️
                  </span>
                </button>
              </div>
            ))}
          </div>
          {/* <div className="form-gro">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div> */}
          <button type="submit" className="submit-record">
            {!initialRecord ? "Upload" : "Edit"}
          </button>
        </form>
        <button
          type="button"
          className="submit-record"
          style={{
            width: "80%",
          }}
          onClick={() => setViewTable(true)}
        >
          show records
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
