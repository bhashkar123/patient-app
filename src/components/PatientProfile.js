/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { CoreContext } from "../context/core-context";
import {
  GenderMale,
  GenderFemale,
  PencilSquare,
  CaretDown,
} from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import { Button, Form } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import Loader from "react-loader-spinner";

import { useStopwatch } from "react-timer-hook";
import Dropdown from "react-dropdown";
import { Line } from "react-chartjs-2";
const Moment = require("moment");

const PatientProfile = (props) => {
  const coreContext = useContext(CoreContext);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [showNotesTextBox, setShowNotesTextBox] = useState(false);
  const [bp, setBp] = useState("--");
  const [bs, setBs] = useState("--");
  const [data1, setData1] = useState([]);
  const [label1, setLabel1] = useState([]);
  const [data2, setData2] = useState([]);
  const [label2, setLabel2] = useState([]);
  const [data3, setData3] = useState([]);
  const [label3, setLabel3] = useState([]);
  const [data4, setData4] = useState([]);
  const [label4, setLabel4] = useState([]);

  const [message, setMessage] = useState("");
  const [threadMobile, setThreadMobile] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const fetchThreadMessages = () => {
    //   alert(coreContext.patient.mobile_phone);
    //coreContext.fetchThreadMessages('thread', coreContext.patient.mobile_phone);
  };

  useEffect(fetchThreadMessages, [coreContext.patient.mobile_phone]);

  const fetchPatient = () => {
    const userType = localStorage.getItem("userType");
    //  coreContext.fetchPatient(patientId);
    //const patientId =userId.split("_").pop();
    let patientId = localStorage.getItem("userId");
    localStorage.setItem("userId", patientId);
    console.log("sahila arora", patientId);

    // Chart Data
    coreContext.fetchBgChartData(patientId, userType);
    coreContext.fetchBpChartData(patientId, userType);
    coreContext.fetchWSChartData(patientId, userType);

    coreContext.fetchBgData(patientId, userType);
    // coreContext.fetchBloodPressure(patientId, username, usertype);
    const patient = JSON.parse(localStorage.getItem("app_patient"));

    let userName = localStorage.getItem("userName");
    if (patient != undefined) {
      if (patient.ehrId !== undefined) {
        patientId = patient.ehrId;
        userType = "patient";
        userName = patient.name;
      }
    }

    if (patientId !== undefined) {
      coreContext.fetchDeviceData(
        patientId,
        userName,
        userType,
        "Blood Pressure",
        undefined
      );
      coreContext.fetchDeviceData(
        patientId,
        userName,
        userType,
        "Weight",
        undefined
      );
    }

    if (coreContext.bgChartData.length > 0)
      setBs(coreContext.bgChartData[0].gSI1PK); //assuming retrieve bg sort by date desc
    if (coreContext.bpChartData.length > 0)
      setBp(coreContext.bpChartData[0].pulse); //assuming retrieve bp sort by date desc
    const d1 = [];
    const l1 = [];
    const d2 = [];
    const l2 = [];
    const d3 = [];
    const l3 = [];
    const d4 = [];
    const l4 = [];

    if (coreContext.bgChartData.length > 0) {
      coreContext.bgChartData.forEach((e1) => {
        d1.push([e1.daterecorded, e1.gSI1PK]);
      });

      setData1(d1);
    }

    // if (coreContext.bpChartData.length > 0) {
    //     coreContext.bpChartData.forEach(e1 => {
    //         d2.push([e1.measurementDateTime, e1.pulse]);
    //     });

    //     setData2(d2);
    // }

    if (coreContext.bpChartData.length > 0) {
      // Sorting has been fixed.
      const sortedArray = coreContext.bpChartData.sort(
        (a, b) =>
          new Moment(a.measurementDateTime) - new Moment(b.measurementDateTime)
      );
      console.log(sortedArray);
      sortedArray.forEach((e1, index) => {
        console.log(e1.measurementDateTime);
        d2.push(Math.round(e1.diastolic));
        l2.push(e1.measurementDateTime);
      });
      setData2(d2);
      setLabel2(l2);
    }

    if (coreContext.wsChartData.length > 0) {
      // Sorting has been fixed.
      const sortedArray = coreContext.wsChartData.sort(
        (a, b) =>
          new Moment(a.measurementDateTime) - new Moment(b.measurementDateTime)
      );
      console.log(sortedArray);
      sortedArray.forEach((e1, index) => {
        console.log(e1.measurementDateTime);
        d3.push(Math.round(e1.weight));
        l3.push(e1.measurementDateTime);
      });
      setData3(d3);
      setLabel3(l3);
    }

    if (coreContext.weightData.length > 0) {
      // Sorting has been fixed.
      const sortedArray = coreContext.weightData.sort(
        (a, b) =>
          new Moment(a.measurementDateTime) - new Moment(b.measurementDateTime)
      );
      console.log(sortedArray);
      sortedArray.forEach((e1, index) => {
        console.log(e1.measurementDateTime);
        d4.push(Math.round(e1.bmi));
        l4.push(e1.measurementDateTime);
      });
      setData4(d4);
      setLabel4(l4);
    }

    //setData4(d4);
  };
  const fetchuser = () => {
    let userId = localStorage.getItem("userId");
    if (userId.includes("PATIENT")) {
      userId = userId.split("_").pop();
    }
    coreContext.fetchPatientListfromApi("patient", userId);
  };
  useEffect(fetchPatient, [coreContext.wsChartData.length]);
  useEffect(fetchPatient, [coreContext.bpChartData.length]);
  useEffect(coreContext.checkLocalAuth, []);
  useEffect(fetchuser, []);
  //useEffect(coreContext.fetchPatientListfromApi(localStorage.getItem("userType"), localStorage.getItem("userId")), []);

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const renderVitalDataBG = () => {
    if (coreContext.bgData.length > 0) {
      return coreContext.bgData.map((bg, index) => {
        return (
          <tr>
            <td>{bg.username}</td>
            <td>{bg.reading}</td>
            <td>{bg.meal}</td>
            <td>{bg.timeSlots}</td>
            <td>{bg.date_recorded}</td>
            <td>{bg.reading_id}</td>
            <td>{bg.battery}</td>
          </tr>
        );
      });
    }
  };

  const renderVitalDataBP = () => {
    if (coreContext.bpData.length > 0) {
      return coreContext.bpData.map((bp, index) => {
        return (
          <tr>
            <td>{bp.username}</td>
            <td>{bp.systolic}</td>
            <td>{bp.diastolic}</td>
            <td>{bp.pulse}</td>
            <td>{bp.timeSlots}</td>
            <td>{bp.measurementDateTime}</td>
            <td>{bp.batteryVoltage}</td>
            <td>{bp.signalStrength}</td>
            <td>{bp.actionTaken}</td>
          </tr>
        );
      });
    }
  };

  const renderVitalDataW = () => {
    if (coreContext.weightData.length > 0) {
      return coreContext.weightData.map((wsData, index) => {
        return (
          <tr>
            <td>{wsData.username}</td>
            <td>{wsData.weight}</td>
            <td>{wsData.timeSlots}</td>
            <td>{wsData.measurementDateTime}</td>
            <td>{wsData.deviceid}</td>
            <td>{wsData.batteryVoltage}</td>
            <td>{wsData.signalStrength}</td>
          </tr>
        );
      });
    }
  };

  const renderThreads = () => {
    if (coreContext.threads.length > 0) {
      return coreContext.threads.map((message) => {
        return (
          <div
            style={{ fontWeight: "bold", lineHeight: 1 }}
            className="card-body">
            <span
              className={
                message.direction === "inbound" ? "float-left" : "float-right"
              }>
              {message.body}
            </span>
            <br />
            <span
              className={
                message.direction === "inbound" ? "float-left" : "float-right"
              }
              style={{ fontSize: 8 }}>
              Time : {message.date}
            </span>
          </div>
        );
      });
    }
  };

  const onSendMessage = () => {
    axios
      .post("send-sms", { mobilePhone: threadMobile, message })
      .then((response) => {
        const status = response.data.status;
        if (status.trim() === "success") {
          //coreContext.fetchMessages();
          //coreContext.fetchThreadMessages('from', threadMobile);
        }
      })
      .catch(() => alert("Message Sending failed"));
  };

  const renderTopDetails = () => {
    if (coreContext.patients.length === 0) {
      return (
        <div
          style={{
            height: 50,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <Loader type="Circles" color="#00BFFF" height={50} width={50} />
        </div>
      );
    }
    if (coreContext.patients.length > 0) {
      const userName = localStorage.getItem("userName");
      console.log("checking one patient detail", coreContext.patients);

      return (
        <div className="row">
          <div className="col-md-3" style={{ fontWeight: "bold" }}>
            {userName}
          </div>
          <div className="col-md-3" style={{ fontWeight: "bold" }}>
            {"DOB : " + coreContext.patients[0].dob}
          </div>
          <div className="col-md-2" style={{ fontWeight: "bold" }}>
            {coreContext.patients[0].gender === "Male" ? (
              <GenderMale />
            ) : (
              <GenderFemale />
            )}
            {coreContext.patients[0].gender}
          </div>
          <div className="col-md-4" style={{ fontWeight: "bold" }}>
            EHR ID : {coreContext.patients[0].ehrId}
          </div>
        </div>
      );
    }
  };

  const renderAddModifyFlags = () => {
    if (coreContext.patient)
      return (
        <div className="row">
          <div className="col-md-3">
            Flags : <PencilSquare />
          </div>
        </div>
      );
  };

  const renderAddNotes = () => {
    if (coreContext.patient)
      return (
        <div className="card" style={{ backgroundColor: "#b8b133" }}>
          <div className="card-body" onClick={() => setShowNotesTextBox(true)}>
            {" "}
            {showNotesTextBox ? (
              <input
                type="text"
                className="form-control"
                placeholder="Enter notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            ) : (
              "Click here to add some notes for the patient"
            )}{" "}
          </div>
        </div>
      );
  };

  const renderExpandCollapse = () => {
    if (coreContext.patient)
      return (
        <div className="row">
          <div className="col-md-3">
            {" "}
            <a href="#">Expand All</a>
          </div>
          <div className="col-md-3">
            {" "}
            <a href="#">Collapse All</a>
          </div>
        </div>
      );
  };

  const renderPatientinformation = () => {
    const height = localStorage.getItem("height");
    const weight = localStorage.getItem("weight");
    if (coreContext.patient)
      return (
        <div
          className="row"
          style={{ marginLeft: "10px", backgroundColor: "white" }}>
          <MDBCard className="border row col-md-12">
            <MDBCardBody>
              <MDBCardTitle>Patient Information</MDBCardTitle>
              <MDBCardText>
                <div>
                  <b style={{ paddingRight: "10px" }}>Height:</b>
                  {height}
                </div>
                <div>
                  <b style={{ paddingRight: "10px" }}>Weight:</b>
                  {weight}
                </div>
                <div>
                  <b style={{ paddingRight: "10px" }}>BMI :</b> {weight}
                </div>
                <hr />
                <div>
                  <b style={{ paddingRight: "10px" }}>Blood Pressure:</b>
                  {bp}
                </div>
                <div>
                  <b style={{ paddingRight: "10px" }}>Blood Sugar:</b>
                  {bs}
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          {/* <MDBCard class="border row col-md-6">
                    <MDBCardBody>
                        <MDBCardTitle>Care Team</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                <b style={{ paddingRight: '10px' }}>Provider Name:</b>TBD
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Care Coordinator:</b>TBD
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Coach     :</b>  TBD
                            </div>
                        </MDBCardText>

                    </MDBCardBody>
                </MDBCard> */}
        </div>
      );
  };

  const renderTabs = () => {
    if (coreContext.patient)
      return (
        <Tabs>
          <TabList>
            {/* <Tab onClick={pause}>Clinical Data</Tab> */}
            <Tab onClick={pause}>Billing</Tab>
            <Tab onClick={pause}>Documents</Tab>
          </TabList>
          <TabPanel>
            <div className="card">
              <h4 className="card-header">Billing</h4>
              <div className="card-body">
                Status Filter <br />
                <select name="" id="">
                  <option value="">Ready to Bill</option>
                </select>
                <br />
                <br />
                <table className="table table-bordered table-sm mt-4">
                  <th>EHR ID</th>
                  <th>Date of Service</th>
                  <th>Type</th>
                  <th>Note</th>
                  <th>Provider</th>
                  <th>Care Manager</th>
                  <th>POS</th>
                  <th>TC Claim</th>
                  <th>Actions</th>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="card">
              <h4 className="card-header">Document</h4>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">Document Type</div>
                  <div className="col-md-3">Date Range</div>
                  <div className="col-md-3">Search</div>
                  <div className="col-md-3">Upload File</div>
                </div>
                <br /> <br />
                <table className="table table-bordered table-sm mt-4">
                  <th>Document Type</th>
                  <th>Document Description</th>
                  <th>Document Date</th>
                  <th>Actions</th>
                </table>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      );
  };

  return (
    <div className="card">
      <div onClick={() => setShowNotesTextBox(false)} className="card-header">
        {renderTopDetails()}
      </div>
      {/* <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderAddModifyFlags()}</div> */}
      {/* <div className="card-header">{renderAddNotes()}</div> */}

      <div className="row">
        <div className="col-md-4">
          {/* <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderExpandCollapse()}</div> */}
          <div
            onClick={() => setShowNotesTextBox(false)}
            className="card-header">
            {renderPatientinformation()}{" "}
          </div>
        </div>
        <div className="col-md-8">
          <div
            style={{ fontSize: 12 }}
            className="card shadow p-3 mb-2 mt-3 bg-white rounded">
            <div style={{ height: "140px", overflowY: "auto" }}>
              {renderThreads()}
            </div>

            <div>
              <Form.Label>Send a reply</Form.Label>
              <Form.Control
                autoFocus
                size="sm"
                as="textarea"
                rows={2}
                onChange={(e) => onSendMessage(e.target.value)}
                value={message}
                placeholder="Enter your message"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Line
                data={{
                  labels: label1,
                  datasets: [
                    {
                      label: "Glucose",
                      data: data1,
                      fill: false,
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    },
                  ],
                }}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Line
                data={{
                  labels: label2,
                  datasets: [
                    {
                      label: "Blood Pressure",
                      data: data2,
                      fill: false,
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    },
                  ],
                }}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Line
                data={{
                  labels: label3,
                  datasets: [
                    {
                      label: "Weight",
                      data: data3,
                      fill: false,
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    },
                  ],
                }}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Line
                data={{
                  labels: label3,
                  datasets: [
                    {
                      label: "BMI",
                      data: data4,
                      fill: false,
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    },
                  ],
                }}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="row card-header"
        onClick={() => setShowNotesTextBox(false)}>
        <div className="col-md-12">{renderTabs()}</div>{" "}
      </div>
    </div>
  );
};

export { PatientProfile };
