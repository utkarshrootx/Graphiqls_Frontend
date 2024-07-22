import React, { useState } from "react";
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditPatientComponent = (props) => {
  const [patientData, setPatientData] = useState({
    patientid: "",
    name: "",
    lastname: "",
    phoneNo: "",
    email: "",
    gender: "Male",
    bornDate: null,
    city: "Ankara",
    status: 1,
    cities: [],
  });

  const editPatient = (e) => {
    e.preventDefault();
    let patient = patientData;
    patient["patientid"] = window.localStorage.getItem("patientId");
  };

  const onChangeData = (type, data) => {
    setPatientData((prevState) => ({
      ...prevState,
      [type]: data,
    }));
  };

  let bornDate = new Date();
  if (patientData.bornDate !== null)
    bornDate = new Date(patientData.bornDate.toString());

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  let { name, lastname, phoneNo, email, gender, city, cities } = patientData;

  return (
    <div className="row">
      <div className="col-lg-7">
        <h2 className="text-center">Edit Patient</h2>
        <hr />
        <form>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => onChangeData("name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Last name"
              name="lastname"
              className="form-control"
              value={lastname}
              onChange={(e) => onChangeData("lastname", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone No:</label>
            <input
              type="text"
              placeholder="phone No"
              name="phoneNo"
              className="form-control"
              value={phoneNo}
              onChange={(e) => onChangeData("phoneNo", e.target.value)}
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
            <label>Born Date:</label>
            {bornDate !== null ? (
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  showTimeInput
                  selected={bornDate}
                  onChange={(e) => onChangeData("bornDate", e)}
                  filterDate={isWeekday}
                  timeIntervals={15}
                  timeFormat="HH:mm"
                  dateFormat="yyyy/MM/dd h:mm aa"
                />
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => onChangeData("gender", e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>City:</label>
            <select
              className="form-control"
              value={city}
              onChange={(e) => onChangeData("city", e.target.value)}>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
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

export default EditPatientComponent;
