import React, { useState } from "react";
import axios from "axios";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";

const AddPatientComponent = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [currentMedication, setCurrentMedication] = useState("");
  const [doctorAssigned, setDoctorAssigned] = useState("");

  const controlQuickly = () => {
    return (
      !name ||
      name.trim() === "" ||
      !phoneNo ||
      phoneNo.trim() === "" ||
      !address ||
      address.trim() === "" ||
      !age ||
      age.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !medicalHistory ||
      medicalHistory.trim() === "" ||
      !currentMedication ||
      currentMedication.trim() === "" ||
      !doctorAssigned ||
      doctorAssigned.trim() === ""
    );
  };

  const saveUser = (e) => {
    if (!controlQuickly()) {
      e.preventDefault();
      const patient = {
        name,
        age: parseInt(age, 10),
        gender,
        address,
        phone: phoneNo,
        email,
        medical_history: medicalHistory,
        current_medication: currentMedication,
        doctor_assigned: doctorAssigned,
      };

      axios.post("https://adt101.pythonanywhere.com/add_patient", patient)
        .then((res) => {
          alertify.success("User added successfully.");
          props.history.push("/patients");
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response) {
            alertify.alert(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error.message);
          }
        });
    } else {
      alertify.alert("Please fill in the required fields.");
    }
  };

  const back = () => {
    props.history.push("/patients");
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <button className="btn btn-danger" onClick={back}>
          Back
        </button>
        <hr />
      </div>
      <div className="col-sm-8">
        <h2 className="text-center">ADD PATIENT</h2>
        <form>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              placeholder="age"
              name="age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              placeholder="address"
              name="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input
              placeholder="Phone number"
              name="phoneNo"
              className="form-control"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              placeholder="Email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Medical History *</label>
            <input
              type="text"
              placeholder="medical history"
              name="medicalHistory"
              className="form-control"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Current Medication *</label>
            <input
              type="text"
              placeholder="current medication"
              name="currentMedication"
              className="form-control"
              value={currentMedication}
              onChange={(e) => setCurrentMedication(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Doctor Assigned *</label>
            <input
              type="text"
              placeholder="doctor assigned"
              name="doctorAssigned"
              className="form-control"
              value={doctorAssigned}
              onChange={(e) => setDoctorAssigned(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender *</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button className="btn btn-success" type="button" onClick={saveUser}>
            Save
          </button>
        </form>
      </div>
      <div className="col"></div>
      <div className="col-lg-3">
        <img
          style={{ height: 200 }}
          src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770"
          alt=""
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

export default AddPatientComponent;
