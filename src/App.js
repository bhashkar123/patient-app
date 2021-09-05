import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Sidebar from "react-sidebar";
import * as Pages from "./components";
import { DPatients } from "./components/DPatients";
import Covidform from "./Covidform";
import "./App.css";

import "./dgmaterial.css";

import Menu from "./components/common/Menu";
import Menu2 from "./components/common/Menu2";
import TopMenu from "./components/common/TopMenu";
import { CoreContext } from "./context/core-context";
import { Row, Col } from "react-bootstrap";
import { TablePagination } from "@material-ui/core";
import { useForm } from "react-hook-form";

function App() {
  const { register, errors } = useForm();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isAuth = localStorage.getItem("app_isAuth");
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  //const isAuth = true;
  //const coreContext = useContext(CoreContext);

  // axios.defaults.headers.common.AUTHORIZATION = 'Bearer ' + coreContext.jwt;
  // axios.defaults.headers.common.ACCEPT = "application/json, text/plain, */*";
  useEffect(() => {}, [showSidebar]);
  const [style, setStyle] = useState({ marginLeft: "-85px", width: "80%" });
  const changestyle = () => {
    if (style.marginLeft === "-85px") {
      setStyle({ marginLeft: "-234px", width: "90%" });
    } else {
      setStyle({ marginLeft: "-85px", width: "80%" });
    }
  };

  let content = (
    <div>
      {" "}
      {/**/}{" "}
      {isAuth ? (
        <TopMenu
          isAuth={isAuth}
          changestyle={changestyle}
          showSidebar={showSidebar}
        />
      ) : (
        ""
      )}
      <Row>
        {" "}
        {/* <Sidebar
                              sidebar={<b>Sidebar content</b>}
                              open={sidebarOpen}
                              onSetOpen={setSidebarOpen}
                              styles={{ sidebar: { background: "white" } }}
                            >
                              <button onClick={() => setSidebarOpen(true)}>
                                Open sidebar
                              </button> */}
        {isAuth ? (
          <React.Fragment>
            <div className="col-md-2">
              {" "}
              {sidebar === true ? <Menu /> : <Menu2 />}{" "}
            </div>{" "}
            <div style={style}>
              <Router>
                <Switch>
                  <Route exact path="/provider" component={Pages.Provider} />{" "}
                  <Route
                    exact
                    path="/care-coordinator"
                    component={Pages.CareCoordinator}
                  />{" "}
                  <Route exact path="/coach" component={Pages.Coach} />{" "}
                  <Route exact path="/inbox" component={Pages.Inbox} />{" "}
                  <Route exact path="/outbox" component={Pages.Outbox} />{" "}
                  <Route exact path="/settings" component={Pages.Settings} />{" "}
                  <Route exact path="/dashboard" component={Pages.Dashboard} />{" "}
                  <Route exact path="/patients" component={Pages.Patients} />{" "}
                  <Route exact path="/dpatients" component={DPatients} />
                  <Route
                    exact
                    path="/bloodpressure"
                    component={Pages.BloodPressure}
                  />
                  <Route
                    exact
                    path="/bloodglucose"
                    component={Pages.BloodGlucose}
                  />{" "}
                  <Route exact path="/weight" component={Pages.Weight} />{" "}
                  <Route exact path="/logout" component={Pages.Logout} />{" "}
                  <Route exact path="/profile" component={Pages.MyProfile} />{" "}
                  <Route exact path="/thresold" component={Pages.Thresold} />{" "}
                  <Route
                    exact
                    path="/patient-summary/:patient"
                    component={Pages.PatientSummary}
                  />{" "}
                  <Route
                    exact
                    path="/patient-profile/:patient"
                    component={Pages.PatientProfile}
                  />{" "}
                  <Route
                    exact
                    path="/device-info"
                    component={Pages.Deviceinfo}
                  />{" "}
                  <Route exact path="/covid">
                    <Covidform />
                  </Route>{" "}
                  <Redirect exact from="/login" to="/patients" />
                  <Redirect exact from="/" to="/patients" />
                </Switch>{" "}
              </Router>{" "}
            </div>{" "}
          </React.Fragment>
        ) : (
          <div className="col-md-12">
            <Router>
              <Switch>
                <Route path="/login" component={Pages.Login} />{" "}
                <Route path="/sign-up" component={Pages.SignUp} />{" "}
                <Route path="/reset-password" component={Pages.ResetPassword} />{" "}
                <Redirect exact from="/" to="/login" />
              </Switch>{" "}
            </Router>{" "}
          </div>
        )}{" "}
      </Row>{" "}
      {/* </Sidebar> */}{" "}
    </div>
  );

  return (
    <>
      {" "}
      {content}{" "}
      <Router>
        <Switch>
          <Route path="/covid">
            <Covidform />
          </Route>{" "}
        </Switch>{" "}
      </Router>{" "}
    </>
  );
}

export default App;
