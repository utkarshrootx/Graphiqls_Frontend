import React, { Component } from "react";

export default class NavbarComponent extends Component {
  render() {
    const navbarStyle = {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
      borderRadius: "15px", // Make the borders circular
      margin: "10px", // Optional: Add some margin around the navbar
      backgroundColor: "#3d9970", // Change navbar color
      color: "white", // Change text color to white
    };

    const navbarInnerStyle = {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    };

    const ulStyle = {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    };

    return (
      <div className="sticky-top">
        <nav className="navbar navbar-expand-lg" style={navbarStyle}>
          <div className="container" style={navbarInnerStyle}>
            <a className="navbar-brand" href="/" style={{ margin: 0, color: 'white' }}>
              Home
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={navbarInnerStyle}>
              <ul className="navbar-nav" style={ulStyle}>
                <li className="nav-item">
                  <a className="nav-link" href="/patients" style={{ color: 'white' }}>
                    Patients
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ color: 'white' }}>
                    Patients
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="/patients">
                      Patients
                    </a>
                    <a className="dropdown-item" href="/add-patient">
                      Add Patient
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
