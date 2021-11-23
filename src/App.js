import React, { useState, useEffect,useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import Sidebar from "react-sidebar";
import * as Pages from "./components";
import { DPatients } from "./components/DPatients";
import { BloodPressureAverage } from "./components/BloodPressureAverage";
import { BloodGlucoseAverage } from "./components/BloodGlucoseAverage";

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
import Thankyou from "./component2/Thankyou";
import { WeightAverage } from "./components/WeightAverage";
//import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget-2';
import "react-chat-widget-2/lib/styles.css";
import { Vdeviceinfo } from "./components/Vdevice";
import {io} from "socket.io-client"
const socket = io("http://localhost:8080", {
  transports: ["websocket"]
});

function App() {
  const { register, errors } = useForm();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isAuth = localStorage.getItem("app_isAuth");
  const [sidebar, setSidebar] = useState(true);
  const coreContext = useContext(CoreContext);
  const showSidebar = () => setSidebar(!sidebar);
  const usertype=localStorage.getItem("userType")
  const id=localStorage.getItem('userId');
  
  const getdetail=()=>{
    if(localStorage.getItem("userType")==="patient"){
      coreContext.fetchPatientListfromApi("patient",localStorage.getItem("userId"),true);
      console.log("checckresponse form app",coreContext.patients)

    } 
  }
 var doctorName
 const getdoctor=(name)=>{
  doctorName=name;
 }
  const handleNewUserMessage = (newMessage) => {
    if (usertype==="patient"){
      socket.emit("send-message",`${doctorName} ${localStorage.getItem("userId")}: ${newMessage}`)

    }
    if(usertype==="doctor"){
      socket.emit("send-message",`${localStorage.getItem("userName")}: ${newMessage}`)
    }
    
    
    

  };
  
  useEffect(() => {
    getdetail();
    if(usertype==='patient'){
      socket.on("get-message",(message)=>{
        if(message.includes(doctorName)){
          addResponseMessage(message)  
        }
      })
    }
    if(localStorage.getItem("userType")==='doctor'){
      socket.on("get-message",(message)=>{
        if(message.includes(localStorage.getItem("userName"))){
          addResponseMessage(message)  
        }

        
      })
    }
    // socket.on("get-message",(message)=>{
    //   addResponseMessage(message)
    // })
  }, []);
  //const isAuth = true;
  const renderchat=()=>{
    if(coreContext.patients.length===0){
      return (
        <div
          style={{
            height: 680,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <Loader type="Circles" color="#00BFFF" height={100} width={100} />
        </div>

      )
    }
    if(coreContext.patients.length!==0){
      if(coreContext.patients[0].ProviderName!==undefined && usertype==="patient"){
        getdoctor(coreContext.patients[0].ProviderName);
      }
      
      return(
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      )
    }
  }

  // axios.defaults.headers.common.AUTHORIZATION = 'Bearer ' + coreContext.jwt;
  // axios.defaults.headers.common.ACCEPT = "application/json, text/plain, */*";
  useEffect(() => {}, [showSidebar]);
  const [style, setStyle] = useState("col-md-9 col-8 col-sm-8 p-0");
  const [style1, setStyle1] = useState("col-md-2 col-3 col-sm-3 mr-3");
  const changestyle = () => {
    if (sidebar === false) {
      setStyle("col-md-9 col-8 col-sm-8 p-0");
      setStyle1("col-md-2 col-3 col-sm-3 mr-3");
    } else {
      setStyle("col-lg-10 col-md-10 col-9 col-sm-9");
      setStyle1("col-lg-1 col-md-1 col-2 col-sm-2 mr-1");
    }
  };

  let content = (
    <div>
      {" "}
      {/**/}{" "}
      {isAuth ? (
        <>
        <TopMenu
          isAuth={isAuth}
          changestyle={changestyle}
          showSidebar={showSidebar}
        />
      
        
        
      {renderchat()}
    
        </>
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
            <div className={style1}>
              {" "}
              {sidebar === true ? <Menu /> : <Menu2 />}{" "}
            </div>{" "}
            <div  className={style} style={{marginLeft:"-20px"}}>
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
                    path="/bloodpressureaverage"
                    component={BloodPressureAverage}
                  />
                  <Route
                    exact
                    path="/bloodglucose"
                    component={Pages.BloodGlucose}
                  />{" "}
                  <Route
                    exact
                    path="/bloodglucoseaverage"
                    component={BloodGlucoseAverage}
                  />{" "}
                  <Route
                    exact
                    path="/weightaverage"
                    component={WeightAverage}
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
                  <Route exact path="/verifieddevices">
                    <Vdeviceinfo />
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
          <Route exact path="/covid">
            <Covidform />
          </Route>{" "}
          <Route exact path="/thankyou">
            <Thankyou />
          </Route>{" "}

        </Switch>{" "}
      </Router>{" "}
    </>
  );
}

export default App;
