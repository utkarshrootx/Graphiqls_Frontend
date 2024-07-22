import React, { useState, useEffect } from "react";

import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";

const AddPatientComponent = (props) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("ANKARA");
  const [bornDate, setBornDate] = useState(new Date());
  const [status, setStatus] = useState(1);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //   useEffect(() => {
  //     getAllCities();
  //   }, []);

  //   const getAllCities = () => {
  //     PatientService.getCities().then((res) => {
  //       setCities(res.data);
  //     });
  //   };

  const controlQuickly = () => {
    return (
      name === null ||
      name === "" ||
      name === " " ||
      lastname === null ||
      lastname === "" ||
      lastname === " "
    );
  };

  //   const saveUser = (e) => {
  //     if (!controlQuickly()) {
  //       e.preventDefault();
  //       const patient = {
  //         name,
  //         lastname,
  //         email,
  //         phoneNo,
  //         gender,
  //         city,
  //         bornDate,
  //         status,
  //       };
  //       PatientService.addPatient(patient)
  //         .then((res) => {
  //           setMessage("User added successfully.");
  //           props.history.push("/patients");
  //           alertify.success("Adding patient is ok");
  //         })
  //         .catch((error) => {
  //           console.log(error.response);
  //           if (error.response) {
  //             setErrorMessage(error.response.data.message);
  //             AlertifyService.alert(error.response.data.message);
  //           } else if (error.request) {
  //             console.log(error.request);
  //           } else {
  //             console.log(error.message);
  //           }
  //         });
  //     } else {
  //       AlertifyService.alert(" * işaretli alanları doldurunuz...");
  //     }
  //   };

  //   const back = () => {
  //     props.history.push("/patients");
  //   };

  //   const isWeekday = (date) => {
  //     const day = date.getDay();
  //     return day !== 0 && day !== 6;
  //   };

  return (
    <div className="row">
      <div className="col-sm-12">
        <button className="btn btn-danger" onClick={""}>
          {" "}
          Back{" "}
        </button>
        <hr />
      </div>
      <div className="col-sm-8">
        <h2 className="text-center">ADD PATİENT</h2>
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
            <label>Last Name *</label>
            <input
              placeholder="Last name"
              name="lastname"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
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
            <label>Email:</label>
            <input
              placeholder="Email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Born Date *</label>
            <div className="form-group">
              <DatePicker
                className="form-control"
                showTimeInput
                selected={bornDate}
                onChange={(date) => setBornDate(date)}
                filterDate={""}
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="yyyy/MM/dd h:mm aa"
              />
            </div>
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
          <div className="form-group">
            <label>City *</label>
            <select
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-success" type="button" onClick={""}>
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
