import React, { useState, useEffect } from "react";
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from "@material/react-checkbox";
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListPatientComponent.css";
// import Modal from 'react-modal';
import * as alertify from "alertifyjs";
import Moment from "react-moment";
import PatientDetailModal from "../BasicComponent/PatientDetailModal";

const items = ["Name", "Lastname", "Email", "City"];

let filterArray = [];
let checked = {
  name: false,
  lastname: false,
  email: false,
  city: false,
};
let filterAllPatients;

const ListPatientComponent = (props) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  return (
    <div className="row">
      <div className="col-lg-12">
        <button className="btn btn-warning" onClick={""}>
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
            style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Born Date</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  className={
                    patient.gender === "Male" ? "bg-default" : "bg-danger"
                  }
                  key={patient.patientid}>
                  <td>
                    {patient.name} {patient.lastname}
                  </td>
                  <td>{patient.email}</td>
                  <td>
                    {patient.bornDate !== null ? (
                      <Moment format="YYYY/MM/DD HH:mm">
                        {patient.bornDate}
                      </Moment>
                    ) : null}
                  </td>
                  <td>{patient.city}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        id="btnGroupDrop1"
                        type="button"
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        {" "}
                        Actions{" "}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="btnGroupDrop1">
                        <button className="dropdown-item" onClick={""}>
                          {" "}
                          View{" "}
                        </button>
                        <div className="dropdown-divider"></div>
                        <button
                          className="dropdown-item"
                          data-toggle="modal"
                          data-target="#patientModal"
                          onClick={""}>
                          {" "}
                          View Quickly{" "}
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={""}>
                          {" "}
                          Edit
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={""}>
                          {" "}
                          Delete{" "}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PatientDetailModal patient={patient} />
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ListPatientComponent;
