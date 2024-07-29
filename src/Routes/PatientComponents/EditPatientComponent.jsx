import React, { useState, useEffect } from "react";
import "alertifyjs/build/css/alertify.css";
import * as alertify from "alertifyjs";

const EditPatientComponent = (props) => {
  const [patientData, setPatientData] = useState({
    patient_id: "",
    name: "",
    age: "",
    address: "",
    phone: "",
    email: "",
    medical_history: "",
    current_medication: "",
    doctor_assigned: "",
    gender: "Male",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      const patientId = window.localStorage.getItem("patientId");
      if (patientId) {
        try {
          const response = await fetch(`https://adt101.pythonanywhere.com/patients/${patientId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            setPatientData(data);
          } else {
            alertify.error("Failed to fetch patient data.");
          }
        } catch (error) {
          console.error("Error fetching patient data:", error);
          alertify.error("An error occurred. Please try again later.");
        }
      }
    };

    fetchPatientData();
  }, []);

  const editPatient = async (e) => {
    e.preventDefault();
    const patientId = window.localStorage.getItem("patientId");
    try {
      const response = await fetch(`https://adt101.pythonanywhere.com/edit_patient/${patientId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      });

      if (response.ok) {
        alertify.success("Patient updated successfully.");
      } else {
        alertify.error("Failed to update patient.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alertify.error("An error occurred. Please try again later.");
    }
  };

  const onChangeData = (type, data) => {
    setPatientData((prevState) => ({
      ...prevState,
      [type]: data,
    }));
  };

  let { name, age, address, phone, email, medical_history, current_medication, doctor_assigned, gender } = patientData;

  return (
    <div className="row">
      <div className="col-lg-7">
        <h2 className="text-center">Edit Patient</h2>
        <hr />
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => onChangeData("name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              placeholder="Age"
              name="age"
              className="form-control"
              value={age}
              onChange={(e) => onChangeData("age", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="form-control"
              value={address}
              onChange={(e) => onChangeData("address", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => onChangeData("phone", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => onChangeData("email", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Medical History:</label>
            <input
              type="text"
              placeholder="Medical History"
              name="medical_history"
              className="form-control"
              value={medical_history}
              onChange={(e) => onChangeData("medical_history", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Current Medication:</label>
            <input
              type="text"
              placeholder="Current Medication"
              name="current_medication"
              className="form-control"
              value={current_medication}
              onChange={(e) => onChangeData("current_medication", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Doctor Assigned:</label>
            <input
              type="text"
              placeholder="Doctor Assigned"
              name="doctor_assigned"
              className="form-control"
              value={doctor_assigned}
              onChange={(e) => onChangeData("doctor_assigned", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => onChangeData("gender", e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button className="btn btn-success" onClick={editPatient}>
            Update
          </button>
        </form>
      </div>
      <div className="col"></div>
      <div className="col-lg-4">
        <img
          style={{ margin: "20px 0", height: 300 }}
          src="https://www.shareicon.net/data/512x512/2016/02/26/725010_document_512x512.png"
          alt="Document"
        />
      </div>
      <div className="col-sm-12">
        <hr />
        <hr />
        <hr />
      </div>
    </div>
  );
};

export default EditPatientComponent;
