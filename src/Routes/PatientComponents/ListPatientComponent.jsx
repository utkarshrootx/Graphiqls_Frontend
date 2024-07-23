import React, { useState, useEffect } from "react";
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from "@material/react-checkbox";
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListPatientComponent.css";
import * as alertify from "alertifyjs";
import Moment from "react-moment";
import PatientDetailModal from "../BasicComponent/PatientDetailModal";

const ListPatientComponent = (props) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("https://adt101.pythonanywhere.com/patients", {
          mode: 'cors', // Add this to handle CORS
          headers: {
            'Access-Control-Allow-Origin': '*', // Add CORS headers
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging: Log the fetched data
        
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        if (error.message.includes("Failed to fetch")) {
          console.error("CORS error:", error);
          alertify.error("CORS error: Failed to fetch patient data. Please check your server CORS configuration.");
        } else {
          console.error("Error fetching data:", error);
          alertify.error("Failed to fetch patient data. Please try again later.");
        }
      }
    };

    fetchPatients();
  }, []);

  const handleViewPatient = (patient) => {
    setPatient(patient);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <button
          className="btn"
          style={{
            backgroundColor: '#3d9970',
            color: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
          onClick={""}
        >
          Add Patient
        </button>
        <hr />
      </div>
      <div className="col-lg-6">
        <div className="form-group">
          <input
            type="text"
            placeholder="Search Patient by choosing any parameter"
            name="searchByName"
            className="form-control"
            onChange={""}
          />
        </div>
        <hr />
      </div>
      <div className="col-lg-6"> {""} </div>
      <div className="col-lg-12">
        <div className="table-responsive-lg">
          <table
            className="table table-bordered table-sm table-dark table-hover"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr
                    className={
                      patient.gender === "Male" ? "bg-default" : "bg-danger"
                    }
                    key={patient.patient_id}
                  >
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.address}</td>
                    <td>{patient.city}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          id="btnGroupDrop1"
                          type="button"
                          className="btn btn-secondary btn-sm dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Actions
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="btnGroupDrop1"
                        >
                          <button
                            className="dropdown-item"
                            onClick={() => handleViewPatient(patient)}
                          >
                            View
                          </button>
                          <div className="dropdown-divider"></div>
                          <button
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#patientModal"
                            onClick={() => handleViewPatient(patient)}
                          >
                            View Quickly
                          </button>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item" onClick={""}>
                            Edit
                          </button>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item" onClick={""}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <PatientDetailModal patient={patient} />
        </div>
      </div>
    </div>
  );
};

export default ListPatientComponent;
