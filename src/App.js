import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom"; //Router,
import ListPatientComponent from "./Routes/PatientComponents/ListPatientComponent";
import AddPatientComponent from "./Routes/PatientComponents/AddPatientComponent";
import EditPatientComponent from "./Routes/PatientComponents/EditPatientComponent";
import NotFoundComponent from "./NotFound/NotFoundComponent";
import IndexPage2 from "./Routes/IndexPage2";
import { Lines } from "react-preloaders";
import NavbarComponent from "./Navbar/NavbarComponent";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <NavbarComponent />
            <a href="/">
  <img
    style={{ height: "40px", margin: "10px 0" }}
    src={`${process.env.PUBLIC_URL}/graphiqls-high-resolution-logo-transparent.png`}
    alt="Logo"
  />
</a>

            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={ListPatientComponent} />
                <Route path="/patients" component={ListPatientComponent} />
                <Route path="/add-patient" component={AddPatientComponent} />
                <Route path="/edit-patient" component={EditPatientComponent} />
                {/* <Route path="/add-problem" component={ProblemFormComponent} /> */}
                {/* <Route
                  path="/problem/:problemid"
                  component={ViewProblemComponent}
                /> */}
                {/* <Route path="/receipe-form" component={ReceipeFormComponent} /> */}
                <Route path="/notfound" component={NotFoundComponent} />
                <Route path="/de" component={IndexPage2} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>

      <Lines animation="slide" />
    </div>
  );
}

export default App;
