import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("https://adt101.pythonanywhere.com/patients", {
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); 

        if (data.patients && Array.isArray(data.patients)) {
          setPatients(data.patients);
          console.log("Patients length:", data.patients.length);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alertify.error("Failed to fetch patient data. Please try again later.");
      }
    };

    fetchPatients();
  }, []);

  const handleViewPatient = (patient) => {
    console.log("Viewing patient:", patient);
    setPatient(patient);
  };

  const handleAddPatient = () => {
    history.push("/add-patient");
  };
  const handleEditPatient = () => {
    history.push("/edit-patient");
  };

  const mapPatientId = (patientId) => {
    // Map any patient ID to 1 or 2
    return patientId % 2 === 0 ? 2 : 1;
  };

  const handlePatientSelect = (patientId) => {
    const mappedId = mapPatientId(patientId);
    setSelectedPatientId(mappedId);
    const body = JSON.stringify({ patient_id: mappedId });

    fetch("https://your-api-endpoint.com/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Successfully posted data:", data);
      alertify.success("Successfully posted patient ID.");
    })
    .catch(error => {
      console.error("Error posting data:", error);
      alertify.error("Failed to post patient ID. Please try again later.");
    });
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
          onClick={handleAddPatient}
        >
          Add Patient
        </button>
        <div className="btn-group">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="patientDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              marginLeft: '10px',
              backgroundColor: '#3d9970',
              color: 'white',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            Patient Name
          </button>
          <div className="dropdown-menu" aria-labelledby="patientDropdown">
            {patients.map((patient) => (
              <button
                key={patient.patient_id}
                className="dropdown-item"
                onClick={() => handlePatientSelect(patient.patient_id)}
              >
                {patient.name}
              </button>
            ))}
          </div>
        </div>
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
                <th>Patient ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Age</th>
                {/* <th>Action</th> */}
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
                    <td>{patient.patient_id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.address}</td>
                    <td>{patient.age}</td>
                    {/* <td>
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
                          <button className="dropdown-item" onClick={handleEditPatient}>
                            Edit
                          </button>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item" onClick={""}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </td> */}
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
