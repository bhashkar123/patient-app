/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState, useMemo } from "react";
import axios from "axios";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { CoreContext } from "../context/core-context";
import Loader from "react-loader-spinner";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Bar, Line, Scatter, Bubble, Stacked } from "react-chartjs-2";

import {
  GenderMale,
  GenderFemale,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import { ButtonGroup, Button, Form, Modal, TabPane } from "react-bootstrap";
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
import Input from "./common/Input";
import { useStopwatch } from "react-timer-hook";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import IonRangeSlider from "react-ion-slider";

import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@material-ui/data-grid";

import { Weight } from "./Weight";
import { BloodGlucose } from "./BloodGlucose";
import { BloodPressure } from "./BloodPressure";
import { BloodPressureAverage } from "./BloodPressureAverage";
import { BloodGlucoseAverage } from "./BloodGlucoseAverage";
import { WeightAverage } from "./WeightAverage";
import Moment from "moment";
import context from "react-bootstrap/esm/AccordionContext";
import { Thresold } from "./Thresold";
import Alert from "./common/Alert";
import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox": {
      display: "block",
      pointerEvents: "none",
      disabled: "disabled",
    },
  },
}));

const PatientSummary = (props) => {
  const classes = useStyles();

  const coreContext = useContext(CoreContext);
  const handleModalClose = () => setShowModal(false);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [showNotesTextBox, setShowNotesTextBox] = useState(false);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [bgMin, setBgMin] = useState(0);
  const [bgMax, setBgMax] = useState(0);
  const [bmiMin, setBmiMin] = useState(0);
  const [bmiMax, setBmiMax] = useState(0);
  const [PatientId, setPatientId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [t1, sett1] = useState("");
  const [tlvalue, setTlValue] = React.useState("00:00:00");
  const [from, setfrom] = useState(new Date());
  const [to, setto] = useState(new Date());
  const [slider, setslider] = useState(30);
  const [Days, setDays] = useState();
  const [tddata, settddata] = useState([]);
  const [pointcolor, setpointcolor] = useState([]);

  const marks = [
    {
      value: 0,
      label: "Today",
    },
    {
      value: 15,
      label: "Yesterday",
    },
    {
      value: 30,
      label: "Last 7 days",
    },
    {
      value: 45,
      label: "Last 30 days",
    },
    {
      value: 60,
      label: "Last 60 days",
    },
    {
      value: 75,
      label: "Last 90 days",
    },
    {
      value: 100,
      label: "custom",
    },
  ];

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  const [tlvalueseconds, setTlvalueseconds] = React.useState("00:00:00");

  const [diastolicMin, setDiastolicMin] = useState(0);
  const [diastolicMax, setDiastolicMax] = useState(0);

  const [systolicMin, setSystolicMin] = useState(0);
  const [systolicMax, setSystolicMax] = useState(0);
  const myst = {
    backgroundColor: "#34a0ca ",
    marginRight: "20px",
    width: "50px",
  };
  const myst1 = {
    backgroundColor: "#34a0ca ",
    marginRight: "350px",
    marginBottom: "9px",
    width: "130px",
  };
  const myst2 = {
    backgroundColor: "orange",
    marginRight: "350px",
    marginBottom: "9px",
    width: "130px",
  };
  const myst3 = {
    backgroundColor: "orange",
    marginRight: "20px",
    width: "50px",
  };

  const [weightMin, setWeightMin] = useState(0);
  const [weightMax, setWeightMax] = useState(0);

  const [patient, setPatient] = useState("");
  const [patientId, setpatientId] = useState("");
  const [message, setMessage] = useState("");
  const [threadMobile, setThreadMobile] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [thData, setThData] = useState([]);
  const [timerLogs, setTimerLog] = useState([]);
  const [taskType, setTaskType] = useState();
  const [performedBy, setPerformedBy] = useState("");
  const [performedOn, setPerformedOn] = useState("");
  const [endDT, setendDT] = useState("");
  const [startDT, setstartDT] = useState(date);
  const [totalLogtime, settotalLogtime] = useState(0);
  const [currTimeLog, setCurrentTimeLog] = useState("");
  const [timevalue, settimevalue] = useState("");
  const [efforts, setEfforts] = useState(0);

  const greeting = "Welcome to React";
  const [Prompt, setDirty, setPristine] = Alert();

  let [provider, setProvider] = useState("");
  let [coach, setCoach] = useState("");
  let [coordinator, setCoordinator] = useState("");

  const fetchCareCoordinator = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchCareCoordinator();
  };
  useEffect(fetchCareCoordinator, []);

  const fetchProviders = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchProviders();
  };
  useEffect(fetchProviders, [coreContext.providerData.length]);
  const fetchCoach = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchCoach();
  };

  useEffect(fetchCoach, []);

  const tt = [
    ...coreContext.providerData,
    ...coreContext.ccData,
    ...coreContext.coachData,
  ];

  const fetchPatient = () => {
    const patientId = atob(props.match.params.patient);
    console.log("checking patient id from summry page", patientId);
    const usertype = localStorage.getItem("userType");
    setUserType(localStorage.getItem("userType"));
    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("userName"));
    setpatientId(patientId);

    setPerformedBy(userName);
    console.log(coreContext.patient.notes, "coreContext.patient.notes");
    coreContext.patient.notes != undefined &&
      setNotes(coreContext.patient.notes);
    //setTaskType("Care Coordination")
    //let patientData = JSON.parse(localStorage.getItem('app_patient'));

    //setPatient(patientData);
    coreContext.fetchPatientListfromApi("patient", patientId);

    //coreContext.fetchThresold("ADMIN_PATIENT_" + patientId, userType);

    coreContext.fetchTimeLog("PATIENT_" + patientId);
    //console.log("PATIENT_" + patientId)

    //coreContext.fetchTaskTimerUser();

    coreContext.fetchDeviceData("PATIENT_" + patientId, userName, userType);
    /// setting default value
    // if (coreContext.thresoldData.length === 0) {
    //   let thdata = {};
    //   const thDatas = [];
    //   thdata.Element_value = "Blood Glucose";
    //   thdata.bg_low = 0;
    //   thdata.bg_high = 0;
    //   thDatas.push(thdata);

    //   thdata = {};
    //   thdata.Element_value = "BMI";
    //   thdata.bmi_low = 0;
    //   thdata.bmi_high = 0;
    //   thDatas.push(thdata);

    //   thdata = {};
    //   thdata.Element_value = "Diastolic";
    //   thdata.diastolic_low = 0;
    //   thdata.diastolic_high = 0;
    //   thDatas.push(thdata);

    //   thdata = {};
    //   thdata.Element_value = "Systolic";
    //   thdata.systolic_high = 0;
    //   thdata.systolic_low = 0;
    //   thDatas.push(thdata);

    //   thdata = {};
    //   thdata.Element_value = "Weight";
    //   thdata.weight_low = 0;
    //   thdata.weight_high = 10;
    //   thDatas.push(thdata);
    //   setThData(thDatas);
    // } else {
    //   setThData(coreContext.thresoldData);

    //   var bgdata = coreContext.thresoldData.filter(
    //     (a) => a.Element_value === "Blood Glucose"
    //   );

    //   if (bgdata.length > 0) {
    //     setBgMin(bgdata[0].bg_low);
    //     setBgMax(bgdata[0].bg_high);
    //   } else {
    //     setBgMin(0);
    //     setBgMax(0);
    //   }

    //   var bpdata = coreContext.thresoldData.filter(
    //     (a) => a.Element_value === "BMI"
    //   );
    //   if (bpdata.length > 0) {
    //     setBmiMin(bpdata[0].bmi_low);
    //     setBmiMax(bpdata[0].bmi_high);
    //   } else {
    //     setBmiMin(0);
    //     setBmiMax(0);
    //   }

    //   var dialostic = coreContext.thresoldData.filter(
    //     (a) => a.Element_value === "DIASTOLIC"
    //   );

    //   if (dialostic.length > 0) {
    //     setDiastolicMin(dialostic[0].diastolic_low);
    //     setDiastolicMax(dialostic[0].diastolic_high);
    //   } else {
    //     setDiastolicMin(0);
    //     setDiastolicMax(0);
    //   }

    //   var systolic = coreContext.thresoldData.filter(
    //     (a) => a.Element_value === "SYSTOLIC"
    //   );
    //   if (systolic.length > 0) {
    //     setSystolicMin(systolic[0].systolic_low);
    //     setSystolicMax(systolic[0].systolic_high);
    //   } else {
    //     setSystolicMin(0);
    //     setSystolicMax(0);
    //   }

    //   var weight = coreContext.thresoldData.filter(
    //     (a) => a.Element_value === "Weight"
    //   );

    //   if (weight.length > 0) {
    //     setWeightMin(weight[0].weight_low);
    //     setWeightMax(weight[0].weight_high);
    //   } else {
    //     setWeightMin(0);
    //     setWeightMax(0);
    //   }
    // }
  };
  const fetchtime =()=>{
    coreContext.fetchTimeLog("PATIENT_" + patientId)
  }

  const pateientvalue = useMemo(() => fetchPatient, []);
  useEffect(pateientvalue, []);

  // useEffect(fetchPatient, [coreContext.patient.notes]);
  useEffect(
    () => setNotes(coreContext.patient.notes),
    [coreContext.patient.notes]
  );
const checkthresoldvalue=()=>{

if(coreContext.thresoldData.filter((curr)=>curr.Element_value==="Blood Glucose").length===0){
  return "150";
}
else {
  let ttt=coreContext.thresoldData.filter((curr)=>curr.Element_value==="Blood Glucose")
  console.log("functionvalue",coreContext.thresoldData.filter((curr)=>curr.Element_value==="Blood Glucose")[0].bg_high)
return String(ttt[0].bg_high)
}
  }

 

  const checkthresoldMinvalue = () => {
    if (
      coreContext.thresoldData.filter(
        (curr) => curr.Element_value === "Blood Glucose"
      ).length === 0
    ) {
      return "20";
    } else {
      console.log(
        "functionvalue",
        coreContext.thresoldData.filter(
          (curr) => curr.Element_value === "Blood Glucose"
        )[0].bg_high
      );
      return String(
        coreContext.thresoldData.filter(
          (curr) => curr.Element_value === "Blood Glucose"
        )[0].bg_low
      );
    }
  };

  //const tvalue=checkthresoldvalue();
  const tvalue = useMemo(() => checkthresoldvalue(), [JSON.stringify(coreContext.thresoldData)]);
  //const tMinvalue=checkthresoldMinvalue();
  const tMinvalue = useMemo(() => checkthresoldMinvalue(), [JSON.stringify(coreContext.thresoldData)]);

  //alert(tvalue)
  //alert(alert(checkthresoldvalue()))
  //alert(checkthresoldvalue())

  const renderDates = () => {
    return (
      <>
        <div className="col-sm-12">
          <label>From:</label>
          <DatePicker
            selected={from}
            onChange={(e) => {
              setfrom(e);
              setslider(100);
            }}
            value={from}
          />
          <label className="ml-3">To:</label>
          <DatePicker
            selected={to}
            onChange={(e) => {
              setto(e);
              setslider(100);
            }}
            value={to}
          />
        </div>
      </>
    );
  };
  const fetchbp = () => {
    coreContext.fetchBloodPressure(localStorage.getItem("ehrId"), "patient");
  };
  const fetchbg = () => {
    coreContext.fetchBloodGlucose(localStorage.getItem("ehrId"), "patient");
  };
  const fetchTd = () => {
    coreContext.fetchThresold(
      "ADMIN_" + localStorage.getItem("ehrId"),
      "patient"
    );
  };
  useEffect(fetchbp, [coreContext.bloodpressureData.length]);
  useEffect(fetchbg, [coreContext.bloodglucoseData.length]);
  useEffect(fetchTd, [JSON.stringify(coreContext.thresoldData)]);

  const fetchsliderdays = () => {
    var SliderDays;
    if (slider === 0) {
      SliderDays = 0;
    }
    if (slider === 15) {
      SliderDays = 1;
    }
    if (slider === 30) {
      SliderDays = 7;
    }
    if (slider === 45) {
      SliderDays = 30;
    }
    if (slider === 60) {
      SliderDays = 60;
    }
    if (slider === 75) {
      SliderDays = 90;
    }
    if (slider === 100) {
      SliderDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
    }
    return SliderDays;
  };

  const renderslider = () => {
    return (
      <>
        <Box className="col-12">
          <Slider
            aria-label="Restricted values"
            step={null}
            //valueLabelDisplay="auto"
            marks={marks}
            value={slider}
            onChange={(e) => {
              setslider(e.target.value);
              setfrom(new Date());
              //alert(new Date(new Date().setDate(from.getDate() -slider)));
              //alert(new Date())
              //setto(new Date())
            }}
          />
          {/* {console.log("check slider value", slider)} */}
        </Box>
      </>
    );
  };
  useEffect(() => {
    setfrom(
      new Date(new Date().setDate(new Date().getDate() - fetchsliderdays()))
    );
  }, [slider]);

  const getbpdata = (index) => {
    if (coreContext.bloodpressureData.length == 0) {
      return (
        <>
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
        </>
      );
    }
    console.log(
      coreContext.bloodpressureData[0].UserName,
      "coreContext.bloodpressureData[0].UserName"
    );
    if (
      coreContext.bloodpressureData.length > 0 &&
      coreContext.bloodpressureData[0].UserName !== "undefined"
    ) {
      if (to.getDate() !== from.getDate()) {
        console.log(
          coreContext.bloodpressureData,
          "coreContext.bloodpressureData"
        );
        var finaldata = coreContext.bloodpressureData.filter(
          (date) => date.CreatedDate >= from && date.CreatedDate <= to
        );
      } else {
        var SliderDays;
        if (slider === 0) {
          SliderDays = 0;
        }
        if (slider === 15) {
          SliderDays = 1;
        }
        if (slider === 30) {
          SliderDays = 7;
        }
        if (slider === 45) {
          SliderDays = 30;
        }
        if (slider === 60) {
          SliderDays = 60;
        }
        if (slider === 75) {
          SliderDays = 90;
        }
        if (slider === 100) {
          SliderDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
        }
        let today = new Date();
        let bfr = new Date().setDate(today.getDate() - SliderDays-1);

        var finaldata = coreContext.bloodpressureData.filter(
          (date) => date.CreatedDate >= new Date(bfr)
        );
      }
      console.log("finaldaata", finaldata);
      {
      }
      let Systolic = [];
      let diastolic = [];
      let labels = [];
      let pulse = [];
      let dates = [];
      finaldata.map((curr) => {
        Systolic.push(Number(curr.systolic));
        diastolic.push(Number(curr.diastolic));
        labels.push(Moment(curr.CreatedDate).format("MM-DD-YYYY hh:mm A"));
        pulse.push(curr.Pulse);
        dates.push(Moment(curr.CreatedDate).format("MM-DD-YYYY"));
      });
      console.log(labels, "labels date");

      let uniquedates = dates.filter(function (item, pos) {
        return dates.indexOf(item) == pos;
      });
      let sorteddates = uniquedates.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b) - new Date(a);
      });

      let avgsys = Systolic.reduce((a, b) => a + b, 0) / finaldata.length;
      let avgdia = diastolic.reduce((a, b) => a + b, 0) / finaldata.length;

      let daydfrnc;
      if (slider === 100) {
        daydfrnc = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
      } else {
        daydfrnc = SliderDays;
      }

      if (index === 3) {
        return (
          <>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: "#656565", color: "white" }}>
                  <th scope="col">Date</th>
                  <th scope="col">Blood Pressure(mmHG)</th>
                  <th scope="col">Pulse(bpm)</th>
                </tr>
              </thead>
              <tbody>
                {sorteddates.map((curr) => {
                  return (
                    <>
                      <tr
                        className="text-dark"
                        style={{ backgroundColor: "#a3a3a6" }}
                        scope="row">
                        <td colSpan="3">{curr}</td>
                      </tr>
                      {finaldata
                        .filter(
                          (item) =>
                            Moment(item.CreatedDate).format("MM-DD-YYYY") ===
                            curr
                        )
                        .map((curr1) => {
                          return (
                            <>
                              <tr scope="row">
                                <td>
                                  {Moment(curr1.CreatedDate).format("hh:mm A")}
                                </td>
                                <td>
                                  {curr1.systolic}/{curr1.diastolic}
                                </td>
                                <td>{curr1.Pulse}</td>
                              </tr>
                            </>
                          );
                        })}
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      }
      console.log(
        "hfh sort date",
        labels.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b) - new Date(a);
        })
      );
      if (index === 2) {
        //var labels =[1,2,3,4,5];
        // console.log(Systolic , "2 Systolic")
        // console.log(diastolic , "2 diastolic")
        // console.log(pulse , "2 pulse")
        // console.log(labels,"labels")
        let Systolicgrap = [];
        let diastolicgrap = [];
        let labelsgrap = [];
        let pulsegrap = [];
        // Systolic.push(Number(curr.systolic));
        // diastolic.push(Number(curr.diastolic));
        // labels.push(Moment(curr.CreatedDate).format("MM-DD-YYYY hh:mm A"));
        // pulse.push(curr.Pulse);
        // dates.push(Moment(curr.CreatedDate).format("MM-DD-YYYY"));
        var sortData = finaldata.sort(function (a, b) {
          return (
            new Date(Moment(a.CreatedDate).format("MM-DD-YYYY hh:mm A")) -
            new Date(Moment(b.CreatedDate).format("MM-DD-YYYY hh:mm A"))
          );
        });
        console.log(sortData, "dataAA");

        sortData.map((curr) => {
          Systolicgrap.push(Number(curr.systolic));
          diastolicgrap.push(Number(curr.diastolic));
          labelsgrap.push(
            Moment(curr.CreatedDate).format("MM-DD-YYYY hh:mm A")
          );
          pulsegrap.push(curr.Pulse);
        });

        const data = {
          // labels: labels.sort(function (a, b) {

          //   return new Date(a) - new Date(b);
          labels: labelsgrap,
          datasets: [
            {
              label: "Systolic",
              data: Systolicgrap,
              fill: false,
              backgroundColor: ["Blue"],
              borderColor: ["Blue"],
              pointRadius: 10,
              pointStyle: "triangle",
              pointBackgroundColor: "blue",

              tension: 0,
              //borderColor:["white"],
            },
            {
              label: "Diastolic",
              data: diastolicgrap,
              fill: false,
              backgroundColor: ["green"],
              borderColor: ["green"],
              radius: 10,
              pointBackgroundColor: "green",
              //pointRadius: 8,
              pointStyle: "square",
              tension: 0,
              //borderColor:["white"],
            },
            {
              label: "Pulse",
              data: pulsegrap,
              fill: false,
              backgroundColor: ["orange"],
              borderColor: ["orange"],
              pointStyle: "rectRot",
              pointBackgroundColor: "orange",
              pointRadius: 10,
              tension: 0,

              //borderColor:["white"],
            },
          ],
        };

        return (
          <>
            <nav
              className="navbar navbar-expand-lg text-light bg-dark mt-1"
              style={{ height: "34px" }}>
              <h6>Reading By Dates</h6>
            </nav>
            <Line
              data={data}
              options={{
                tooltips: {
                  mode: "index",
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </>
        );
      }
      if (index === 1) {
        return (
          <>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard1 mb-1 text-light"
                style={myst3}>
                {" "}
                Total Readings
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst2}>
                {finaldata.length}
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Average Reading per day
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {/* {Math.round(
                  Math.round((finaldata.length / daydfrnc) * 10) / 10
                )} */}
                {console.log(daydfrnc, "daydfrncutkarsh")}
                {/* {
                (finaldata.length > 0 && daydfrnc != 'undefined') ?
                Math.round(Number(
                  Math.round(Number(finaldata.length / daydfrnc) * 10) / 10)
                ): "0"
                } */}
                {isNaN(
                  Math.round(
                    Number(
                      Math.round(Number(finaldata.length / daydfrnc) * 10) / 10
                    )
                  )
                )
                  ? "0"
                  : Math.round(
                      Number(
                        Math.round(Number(finaldata.length / daydfrnc) * 10) /
                          10
                      )
                    )}
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Average Systolic
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {/* {console.log(isNaN(avgsys),"avgsys")} */}
                {isNaN(avgsys) ? "0" : Number(Math.round(avgsys))} mm HG
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Average Diastolic
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {console.log(avgdia, "avgdia")}
                {isNaN(avgdia) ? "0 " : Number(Math.round(avgsys))}
                mm HG
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Lowest Systolic
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {console.log(Systolic, "Systolic")}
                {Systolic.length > 0 ? Math.min(...Systolic) : "0"} mm HG
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Highest Diastolic
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {diastolic.length > 0 ? Number(Math.max(...diastolic)) : "0"} mm
                HG
              </div>
            </div>
          </>
        );
      }
    } else {
      return <h1>no data found</h1>;
    }
  };
  // const getbpdata1 = useMemo(() => getbpdata(1), []);
  // const getbpdata3 = useMemo(() => getbpdata(3), []);
  // const getbpdata2 = useMemo(() => getbpdata(2), []);

  const renderBloodGlucose = (index) => {
    if (coreContext.bloodglucoseData.length == 0) {
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
      );
    }

    if (
      coreContext.bloodglucoseData.length > 0 &&
      coreContext.bloodglucoseData[0].UserName !== "undefined"
    ) {
      if (slider === 100) {
        var finalbgdata = coreContext.bloodglucoseData.filter(
          (date) => date.CreatedDate >= from && date.CreatedDate <= to
        );
      } else {
        var SliderDays;
        if (slider === 0) {
          SliderDays = 0;
        }
        if (slider === 15) {
          SliderDays = 1;
        }
        if (slider === 30) {
          SliderDays = 7;
        }
        if (slider === 45) {
          SliderDays = 30;
        }
        if (slider === 60) {
          SliderDays = 60;
        }
        if (slider === 75) {
          SliderDays = 90;
        }
        if (slider === 100) {
          SliderDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
        }
        let today = new Date();
        let bfr = new Date().setDate(today.getDate() - SliderDays-1);

        var finalbgdata = coreContext.bloodglucoseData.filter(
          (date) => date.CreatedDate >= new Date(bfr)
        );
      }
      let bg = [];
      let bgbefore = [];
      let bgafter = [];
      let labels = [];
      let thrshold = [];
      let thresholdmin = [];
      let cdate = [];
      let uniquedates = [];
      let sorteddates = [];
      let pcolorb = [];
      console.log(finalbgdata, "finalbgdataglocouse");
      // for graph
      // let labelsgrap = [];
      // let bgbeforegraph = [];
      // let bgaftergrapph = [];
      // let thrsholdgraph = [];
      // let thresholdmingraph = [];

      // finalbgdata.map((curr)=>{

      // })

      var sortData = finalbgdata.sort(function (a, b) {
        return (
          new Date(Moment(a.CreatedDate).format("MM-DD-YYYY hh:mm A")) -
          new Date(Moment(b.CreatedDate).format("MM-DD-YYYY hh:mm A"))
        );
      });

      finalbgdata.map((curr) => {
        bg.push(Number(curr.bloodglucosemgdl));
        labels.push(Moment(curr.CreatedDate).format("MM-DD-YYYY hh:mm A"));
        cdate.push(Moment(curr.CreatedDate).format("MM-DD-YYYY"));
        thrshold.push(tvalue);
        thresholdmin.push(tMinvalue);
        uniquedates = cdate.filter(function (item, pos) {
          return cdate.indexOf(item) == pos;
        });
        sorteddates = uniquedates.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b) - new Date(a);
        });
        console.log(sorteddates,"check sorteddates")
        if (curr.meal === "Before Meal") {
          bgbefore.push(curr.bloodglucosemgdl);
          if (
            Number(curr.bloodglucosemgdl) < Number(tvalue) &&
            Number(curr.bloodglucosemgdl) > Number(tMinvalue)
          ) {
            pcolorb.push("green");
          } else if (Number(curr.bloodglucosemgdl) > Number(tvalue)) {
            pcolorb.push("red");
          } else {
            pcolorb.push("blue");
          }
        }
        if (curr.meal === "After Meal") {
          bgafter.push(curr.bloodglucosemgdl);
        }
      });
      let avgbg = bg.reduce((a, b) => a + b, 0) / finalbgdata.length;
      let daydfrnc;
      if (slider === 100) {
        daydfrnc = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
      } else {
        daydfrnc = SliderDays;
      }
      if (index === 2) {
        //var labels =[1,2,3,4,5];
        const data = {
          labels: labels,

          datasets: [
            {
              label: "Before Meal",
              data: bgbefore,
              backgroundColor: ["Blue"],
              borderColor: ["Blue"],
              fill: false,
              pointRadius: 10,
              pointStyle: "triangle",
              pointBackgroundColor: pcolorb,
            },
            {
              label: "After Meal",
              data: bgafter,
              fill: false,
              backgroundColor: ["orange"],
              borderColor: ["orange"],
              pointRadius: 10,
              pointStyle: "square",
              pointBackgroundColor: "orange",
            },
            {
              label: "Max Value",
              data: thrshold,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["red"],
              borderColor: ["red"],
              fill: false,
              borderWidth: 6,
            },
            {
              label: "Min Value",
              data: thresholdmin,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["#036bfc"],
              borderColor: ["#036bfc"],
              fill: false,
              borderWidth: 3,
            },
            {
              label: "In range Boundaries",
              backgroundColor: ["green"],
            },
            {
              label: "Above range Boundaries",
              backgroundColor: ["red"],
            },
            {
              label: "Below range Boundaries",
              backgroundColor: ["Blue"],
            },
            // {
            //   label: 'Pulse',
            //   data: pulse,
            //   backgroundColor:["orange"],
            //   //borderColor:["white"],
            // }
          ],
        };
        const filterarray = [];

        return (
          <>
            <nav
              className="navbar navbar-expand-lg text-light bg-dark mt-1"
              style={{ height: "34px" }}>
              <h6>Reading By Dates</h6>
            </nav>
            <Line
              data={data}
              options={{
                tooltips: {
                  mode: "index",
                },

                legend: {
                  display: true,
                  position: "bottom",
                },

                responsive: true,
                scales: {
                  xAxes: [
                    {
                      id: "x",
                      //type: 'time',
                      display: true,
                      title: {
                        display: true,
                        text: "Date",
                      },

                      ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                          if (
                            filterarray.includes(
                              Moment(value).format("YYYY-MM-DD")
                            ) !== true
                          ) {
                            filterarray.push(
                              Moment(value).format("YYYY-MM-DD")
                            );
                          } else {
                            filterarray.push("0");
                          }
                          return filterarray[index] !== "0"
                            ? Moment(value).format("MM-DD")
                            : "";
                        },
                      },
                    },
                  ],
                },
                plugins: {
                  autocolors: false,
                  annotation: {
                    annotations: {
                      line1: {
                        type: "line",
                        yMin: 60,
                        yMax: 60,
                        borderColor: "rgb(255, 99, 132)",
                        borderWidth: 2,
                      },
                    },
                  },
                },
              }}
            />
          </>
        );
      }
      if (index === 3) {
        return (
          <>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: "#656565", color: "white" }}>
                  <th scope="col"></th>
                  <th scope="col" colspan="2">
                    <h6>Morning</h6> 12AM to 10AM
                  </th>
                  <th scope="col" colspan="2">
                    <h6>Afternoon</h6> 10AM to 3PM
                  </th>
                  <th scope="col" colspan="2">
                    <h6>Evening</h6> 3PM to 9PM
                  </th>
                  <th scope="col" colspan="2">
                    <h6>Night</h6> 9PM to 12AM
                  </th>
                </tr>
                <tr>
                  <td>Date</td>

                  <td>Before Meal</td>
                  <td>After Meal</td>
                  <td>Before Meal</td>
                  <td>After Meal</td>
                  <td>Before Meal</td>
                  <td>After Meal</td>
                  <td>Before Meal</td>
                  <td>After Meal</td>
                </tr>
              </thead>
              <tbody>
                {sorteddates.map((curr) => {
                  const filtereddarta = finalbgdata.filter(
                    (item) =>
                      Moment(item.CreatedDate).format("MM-DD-YYYY") === curr
                  );
                        console.log("fileterd data",filtereddarta)
                  let dataBMAM = {
                    morningbm: "",
                    morningam: "",
                    noonbm: "",
                    noonam: "",
                    eveningbm: "",
                    eveningam: "",
                    nightbm: "",
                    nightam: "",
                    morningbmtime: "",
                    morningamtime: "",
                    noonbmtime: "",
                    noonamtime: "",
                    eveningbmtime: "",
                    eveningamtime: "",
                    nightbmtime: "",
                    nightamtime: "",
                  };
                  filtereddarta.map((curr) => {
                    if (Number(Moment(curr.CreatedDate).format("HH")) < 10) {
                      if (curr.meal === "Before Meal") {
                        dataBMAM.morningbm = curr.bloodglucosemgdl;
                        dataBMAM.morningbmtime = Moment(curr.CreatedDate).format("hh:mm A")
                        console.log("check date from app",Moment(curr.CreatedDate).format("hh:mm"))
                      } else {
                        dataBMAM.morningam = curr.bloodglucosemgdl;
                        dataBMAM.morningamtime = Moment(curr.CreatedDate).format("hh:mm A")
                      }
                    }
                    if (
                      Number(Moment(curr.CreatedDate).format("HH")) > 10 &&
                      Number(Moment(curr.CreatedDate).format("HH")) < 15
                    ) {
                      if (curr.meal === "Before Meal") {
                        dataBMAM.noonbm = curr.bloodglucosemgdl;
                        dataBMAM.noonbmtime = Moment(curr.CreatedDate).format("hh:mm A")
                      } else {
                        dataBMAM.noonam = curr.bloodglucosemgdl;
                        dataBMAM.noonamtime = Moment(curr.CreatedDate).format("hh:mm A")
                      }
                    }
                    if (
                      Number(Moment(curr.CreatedDate).format("HH")) > 15 &&
                      Number(Moment(curr.CreatedDate).format("HH")) < 21
                    ) {
                      if (curr.meal === "Before Meal") {
                        dataBMAM.eveningbm = curr.bloodglucosemgdl;
                        dataBMAM.eveningbmtime = Moment(curr.CreatedDate).format("hh:mm A")
                      } else {
                        dataBMAM.eveningam = curr.bloodglucosemgdl;
                        dataBMAM.eveningamtime = Moment(curr.CreatedDate).format("hh:mm A")
                      }
                    }
                    if (Number(Moment(curr.CreatedDate).format("HH")) >= 21) {
                      if (curr.meal === "Before Meal") {
                        dataBMAM.nightbm = curr.bloodglucosemgdl;
                        dataBMAM.nightbmtime = Moment(curr.CreatedDate).format("hh:mm A")
                      } else {
                        dataBMAM.nightam = curr.bloodglucosemgdl;
                        dataBMAM.nightamtime = Moment(curr.CreatedDate).format("hh:mm A")
                      }
                    }
                  });

                  return (
                    <>
                      <tr>
                        <td rowspan="2">{curr}</td>
                        <td style={{ backgroundColor: (dataBMAM.morningbm < tvalue && dataBMAM.morningbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.morningbm !== "" && dataBMAM.morningbm > tvalue) ? "#f6a683" : "grey" }}><p>{dataBMAM.morningbm}<br />{dataBMAM.morningbmtime}</p></td>
                        <td style={{ backgroundColor: (dataBMAM.morningam < tvalue && dataBMAM.morningam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.morningam !== "" && dataBMAM.morningam > tvalue) ? "#f6a683" : "grey" }}>{dataBMAM.morningam}<br />{dataBMAM.noonamtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.noonbm < tvalue && dataBMAM.noonbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.noonbm !== "" && dataBMAM.noonbm > 150) ? "#f6a683" : "grey" }}>{dataBMAM.noonbm}<br />{dataBMAM.noonbmtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.noonam < tvalue && dataBMAM.noonam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.noonam !== "" && dataBMAM.noonam > 150) ? "#f6a683" : "grey" }}>{dataBMAM.noonam}<br />{dataBMAM.noonamtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.eveningbm < tvalue && dataBMAM.eveningbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.eveningbm !== "" && dataBMAM.eveningbm > tvalue) ? "#f6a683" : "grey" }}>{dataBMAM.eveningbm}<br />{dataBMAM.eveningbmtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.eveningam < tvalue && dataBMAM.eveningam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.eveningam !== "" && dataBMAM.eveningam > tvalue) ? "#f6a683" : "grey" }}>{dataBMAM.eveningam}<br />{dataBMAM.eveningamtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.nightbm < tvalue && dataBMAM.nightbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.nightbm !== "" && dataBMAM.nightbm > tvalue) ? "#f6a683" : "grey" }}>{dataBMAM.nightbm}<br />{dataBMAM.nightbmtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.nightam < tvalue && dataBMAM.nightam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.nightam !== "" && dataBMAM.nightam > tvalue) ? "#f6a683" : "grey" }}>{dataBMAM.nightam}<br />{dataBMAM.nightamtime}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </>
                  );
                })}

                {/* <tr>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td>sahil</td>
                    </tr> */}
              </tbody>
            </table>
          </>
        );
      }
      if (index === 1) {
        return (
          <div style={{ height: 680, width: "100%" }}>
            {/* {coreContext.bloodglucoseData} */}

            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard1 mb-1 text-light"
                style={myst3}>
                {" "}
                Total Readings
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst2}>
                {finalbgdata.length}
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Average Reading per day
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {finalbgdata.length > 0 || daydfrnc == "undefined"
                  ? Math.round(
                      Math.round((finalbgdata.length / daydfrnc) * 10) / 10
                    )
                  : "0"}
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Average Glucose Level
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {console.log(avgbg, "avgbg")}
                {isNaN(avgbg) ? "0" : Number(Math.round(avgbg))} mg/dl
              </div>
            </div>
            {/* <div className="d-flex">
    <div className="p-2 flex-fill finaldashboard mb-1 text-light" style={myst}> Average Diastolic</div>
    <div className="p-2 flex  ml-2 text-light " style={myst1}>{Math.round(avgdia)} mm HG</div>
  </div> */}
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Lowest Glucose Level
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {console.log(bg, "bg")}
                {bg.length > 0 ? Number(Math.min(...bg)) : "0"} mg/dl
              </div>
            </div>
            <div className="d-flex">
              <div
                className="p-2 flex-fill finaldashboard mb-1 text-light"
                style={myst}>
                {" "}
                Highest Glucose Level
              </div>
              <div className="p-2 flex  ml-2 text-light " style={myst1}>
                {bg.length > 0 ? Math.max(...bg) : "0"} mg/dl
              </div>
            </div>
          </div>
        );
      }
      //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
    } else {
      return (
        <div
          style={{
            height: 60,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <h1>No data Found</h1>
        </div>
      );
    }
  };

  //useEffect(fetchPatient, [coreContext.timeLogData.length]);

  //useEffect(fetchPatient, [coreContext.patient]);

  useEffect(coreContext.checkLocalAuth, []);

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  const onBGChange = (e) => {
    setBgMin(e.from);
    setBgMax(e.to);
  };

  const onBMIChange = (e) => {
    setBmiMin(e.from);
    setBmiMax(e.to);
  };

  const onDiastolicChange = (e) => {
    setDiastolicMin(e.from);
    setDiastolicMax(e.to);
  };
  const onSystolicChange = (e) => {
    setSystolicMin(e.from);
    setSystolicMax(e.to);
  };
  const onWeightChange = (e) => {
    setWeightMin(e.from);
    setWeightMax(e.to);
  };

  const handleUpdate = () => {
    setPristine();
    setPerformedBy("");
    setTaskType("");
    setDate("");
    sett1("");
    setShowModal(false);
    coreContext.fetchTimeLog("PATIENT_" + patientId);
    
    setTlValue("00:00:00");
  };
  const columns = [
    {
      field: "taskType",
      headerName: "Task Type",
      width: 190,
      type: "string",
      //headerAlign: 'center'
    },
    {
      field: "performedBy",
      headerName: "Performed By",
      type: "number",
      editable: false,
      width: 190,
      //headerAlign: 'center'
    },
    {
      field: "performedOn",
      headerName: "Performed On",
      width: 190,
      //headerAlign: 'center',
      editable: false,

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm:ss A"
        );
        return `${valueFormatted}`;
      },

      //width: 500
    },
    {
      field: "timeAmount",
      headerName: "Time Amount",
      editable: false,
      type: Number,
      width: 200,
      valueFormatter: (params) => {
        const valueFormatted = converter(params.value);
        return `${valueFormatted}`;
      },
      //headerAlign: 'center'
    },
    {
      field: "startDT",
      headerName: "Start Date",
      width: 190,
      //headerAlign: 'center',
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm:ss A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "endDT",
      headerName: "End Date",
      editable: false,
      //headerAlign: 'center',
      width: 190,
      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm:ss A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div style={{ width: "100px" }}>
          <a
            style={{ marginRight: "5px" }}
            href="#"
            onClick={() => setCurrentTL(params.row)}>
            {" "}
            <PencilSquare />
          </a>
          <a
            style={{ marginRight: "5px" }}
            href="#"
            onClick={() => deleteTimeLog(params.row)}>
            {" "}
            <Trash />
          </a>
        </div>
      ),
    },
  ];

  const deleteTimeLog = (tl) => {
    coreContext.DeleteTimeLog(tl);
    coreContext.fetchTimeLog("PATIENT_" + patientId);
    // renderTimelogs();
    // fetchtotaltime();
  };


  const setCurrentTL = (tl) => {
    setShowModal(true);
    //alert(tl.taskType);
    setCurrentTimeLog(tl);
    setTaskType(tl.taskType);
    setPerformedBy(tl.performedBy);
    setDate(new Date(tl.performedOn));

    //setTaskType(tl.taskType)
    //alert(converter(3660))
    setTlValue(converter(tl.timeAmount));

    settimevalue(Math.max(0, getSecondsFromHHMMSS(tl.timeAmount)));
  };
  const converter = (sec) => {
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = Math.floor(sec % 60);
    return (
      ("0" + String(h)).slice(-2) +
      ":" +
      ("0" + String(m)).slice(-2) +
      ":" +
      ("0" + String(s)).slice(-2)
    );
  };

  //   const renderTimelogs = () =>{
  //     if (coreContext.timeLogData.length > 0) {
  //         {console.log("ficed",coreContext.timeLogData)}
  //         return coreContext.timeLogData.map((tl, index) => {

  //             return <tr>
  //                 {/* {console.log("or kuj",coreContext.timeLogData)} */}
  //                 <td>{tl.taskType} </td>
  //                 <td>{tl.performedBy} </td>
  //                 <td>{tl.performedOn} </td>
  //                 <td>{tl.timeAmount} </td>
  //                 <td>{tl.startDT} </td>
  //                 <td>{tl.endDT} </td>
  //                <td>

  //                                         <a  style={{  marginRight: '5px' }} href="#" onClick={()=>setCurrentTL(tl)} >  <PencilSquare /></a>
  //                                         <a style={{  marginRight: '5px' }} href="#" onClick={() => deleteTimeLog(tl)}>  <Trash /></a>

  //                                </td>

  //             </tr>
  //         });
  //     }
  // }

  const renderTaskTimer = () => {
    if (coreContext.tasktimerUserData.length > 0) {
      return coreContext.tasktimerUserData.map((tl, index) => {
        return (
          <tr>
            <td>{tl.user_id} </td>
            <td>{tl.user_name} </td>
          </tr>
        );
      });
    }
  };

  const renderTimelogs = () => {
    if (coreContext.timeLogData.length === 0) {
      return (
        <div
          style={{
            height: 500,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <h6>No data Found</h6>
          {/* <Loader type="Circles" color="#00BFFF" height={100} width={100} /> */}
        </div>
      );
    }
    if (coreContext.timeLogData.length > 0) {
      //  timerLogs  = timerLogs.sort((a,b) => new Moment(b.startDT) - new Moment(a.startDT));
      return (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            className={classes.root}
            rows={coreContext.timeLogData}
            columns={columns}
            pageSize={10}
          />
        </div>
      );
    }
  };

  useEffect(renderTimelogs, [JSON.stringify(coreContext.timeLogData)]);
  useEffect(fetchtime, [JSON.stringify(coreContext.timeLogData)]);

  
  // const deleteDevice = (patient) => {
  //   alert('Hi how are you');
  //coreContext.DeletePatient(patient.userId)
  //  }

  const deleteDevice = (deviceData) => {
    coreContext.DeleteDeviceData(deviceData.id);
  };

  const renderDeviceData = () => {
    if (coreContext.deviceData.length === 0) {
      return (
        <div
          style={{
            height: 100,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <h6>no data found</h6>
          {/* <Loader type="Circles" color="#00BFFF" height={100} width={100} /> */}
        </div>
      );
    }

    if (coreContext.deviceData.length > 0) {
    }
    {
      return coreContext.deviceData.map((deviceData, index) => {
        return (
          <tr>
            <td>{deviceData.DeviceType} </td>
            <td>{deviceData.deviceID} </td>
            <td>
              {" "}
              {deviceData.Action}{" "}
              <a
                style={{ marginRight: "5px" }}
                href="#"
                onClick={() => deleteDevice(deviceData)}>
                {" "}
                <Trash />
              </a>
            </td>
          </tr>
        );
      });
    }
  };
  useEffect(renderDeviceData, [coreContext.deviceData.length]);

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

  const UpdatePatient = () => {
    if (coreContext.patient.ProviderName === undefined) {
      coreContext.patient.ProviderName = "Select Provider";
      setProvider("");
    } else {
      let result = coreContext.providerOptions.filter((name) =>
        name.name.includes(coreContext.patient.ProviderName)
      );
      if (result.length > 0) setProvider(result[0].value);
      else setProvider("");
    }

    if (coreContext.patient.CareName === undefined) {
      coreContext.patient.CareName = "Select Coordinator";
      setCoordinator("");
    } else {
      let result = coreContext.careCoordinatorOptions.filter((name) =>
        name.name.includes(coreContext.patient.CareName)
      );
      if (result.length > 0) setCoordinator(result[0].value);
      else setCoordinator("");
    }

    if (coreContext.patient.CoachName === undefined) {
      coreContext.patient.CoachName = "Select Coach";
      setCoach("");
    } else {
      let result = coreContext.coachOptions.filter((name) =>
        name.name.includes(coreContext.patient.CoachName)
      );
      if (result.length > 0) setCoach(result[0].value);
      else setCoach("");
    }

    coreContext.UpdatePatient(
      coreContext.patient.firstName,
      coreContext.patient.lastName,
      coreContext.patient.mobile,
      coreContext.patient.dob,
      coreContext.patient.height,
      provider,
      coordinator,
      coach,
      coreContext.patient.userId,
      coreContext.patient.gender,
      coreContext.patient.language,
      coreContext.patient.workPhone,
      coreContext.patient.mobilePhone,
      coreContext.patient.street,
      coreContext.patient.zip,
      coreContext.patient.city,
      coreContext.patient.state,
      notes
    );
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
    if (coreContext.patients.length > 0)
      return (
        <div className="row">
          <div className="col-md-3" style={{ fontWeight: "bold" }}>
            {coreContext.patients[0].name}
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
  };
  const rendertop = React.useMemo(
    () => renderTopDetails(),
    [coreContext.patients.length]
  );

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
        <div className="card">
          <div className="card-body">
            {" "}
            <label for="exampleFormControlTextarea1">Internal Notes:</label>
            <textarea
              class="form-control"
              rows="3"
              placeholder="Enter notes"
              value={notes != "undefined" ? notes : ""}
              onChange={(e) => setNotes(e.target.value)}
            />{" "}
            <button
              style={{
                marginTop: "5px",
                width: "10%",
                backgroundColor: blue,
              }}
              className="btn btn-sm btn-primary-update float-right"
              onClick={() => {
                UpdatePatient();
              }}>
              Save Note
            </button>
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

  const fetchtotaltime = () => {
    let totaltime = 0;
    coreContext.timeLogData.map((curr) => {
      totaltime = totaltime + Number(curr.timeAmount);
    });
    //console.log(coreContext.timeLogData)
    return (
      String(Math.floor(totaltime / 60)) +
      ":" +
      ("0" + String(totaltime % 60)).slice(-2)
    );
  };
  useEffect(() => {
    fetchtotaltime();
  }, [tlvalueseconds]);
  useEffect(() => {
    fetchtotaltime();
  }, []);

  const renderPatientinformation = () => {
    if (coreContext.patients.length > 0) {
      coreContext.patient = coreContext.patients[0];
    }
    if (coreContext.patient) {
      localStorage.setItem("ehrId", coreContext.patient.ehrId);
      return (
        <div
          className="row"
          style={{ marginLeft: "10px", backgroundColor: "white" }}>
          <MDBCard className="border row col-md-6">
            <MDBCardBody>
              <MDBCardTitle>Patient Information</MDBCardTitle>
              <MDBCardText>
                <div>
                  <b style={{ paddingRight: "10px" }}>Height (Inches) :</b>
                  {coreContext.patient.height}
                </div>
                <div>
                  <b style={{ paddingRight: "10px" }}>Weight (Pounds):</b>
                  {coreContext.patient.Weight}
                </div>
                <div>
                  <b style={{ paddingRight: "10px" }}>BMI :</b>{" "}
                  {coreContext.patient.BMI}
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="border row col-md-6">
            <MDBCardBody>
              <MDBCardTitle>Care Team</MDBCardTitle>
              <MDBCardText>
                <div>
                  <b style={{ paddingRight: "10px" }}>Provider:</b>
                  {coreContext.patient.ProviderName}
                </div>
                <div>
                  <b style={{ paddingRight: "10px" }}>Care Coordinator:</b>
                  {coreContext.patient.CareName}
                </div>
                <div>
                  <b style={{ paddingRight: "10px" }}>Coach :</b>{" "}
                  {coreContext.patient.CoachName}
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </div>
      );
    }
  };

  const [timelogIdCounter, settimelogIdCounter] = useState(1);
  const calctime = () => {};

  const handleSelect = (index) => {
    let _timerLog = {};
    if (index == 7) {
      //       setstartDT(new Date());
      fetchtotaltime();
      coreContext.fetchTimeLog("PATIENT_" + patientId);
    }
    if (index != 7) {
      fetchtotaltime();
      //coreContext.fetchTimeLog();
      {
      }
    }

    if (index === 8) {
      pause();

      // after pause then should add in list.
      //     // _timerLog.id = timelogIdCounter;
      //     // _timerLog.taskType = taskType;
      //     // _timerLog.performedBy = performedBy;
      //     // _timerLog.performedOn = Moment(date).format('MMM-DD-YYYY hh:mm:ss A') ;
      //     // _timerLog.timeAmount = minutes +":"+ seconds;
      //     // _timerLog.startDT = Moment(startDT).format('MMM-DD-YYYY hh:mm:ss A') ;
      //     // _timerLog.endDT = Moment(endDT).format('MMM-DD-YYYY hh:mm:ss A') ;
      //     // _timerLog.username = userName;

      //     // if(_timerLog.performedOn !=="Invalid date")
      //     // {
      //     //     coreContext.timeLogData.push(_timerLog);
      //     // }
      //     // //timerLogs.push(_timerLog);

      //     //setTimerLog(timerLogs);
      //     //console.log(index);
      //     if(totalLogtime  > 0){
      //         settotalLogtime(totalLogtime + seconds);
      //     }else {
      //         settotalLogtime(seconds);
      //     }
      //     settimelogIdCounter(timelogIdCounter+1);
    }
  };

  // const TimeInput = () => {
  // const [tlvalue, setTlValue] = React.useState("00:00:00");

  // const [tlvalueseconds, setTlvalueseconds] = React.useState("00:00:00");
  const onChange = (event) => {
    setTlValue(event.target.value);
  };

  const onBlur = (event) => {
    const value = event.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));

    // alert('total second'+ seconds);
    setTlvalueseconds(seconds);
    const time = toHHMMSS(seconds);
    setTlValue(time);
    //alert(time);

    //alert(timevalue +'timevalue');
  };

  const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  const handleLeaveTab = (index) => {
    if (index == 7) {
    }
  };

  function doSomething(value) {
    // console.log("doSomething called by child with value:", value);
  }

  const renderTabs = () => {
    if (coreContext.patient)
      return (
        <Tabs
          onSelect={(index) => handleSelect(index)}
          onMouseLeave={(index) => handleLeaveTab(index)}>
          <TabList>
            {/* <Tab onClick={pause}>Conditions</Tab> */}
            <Tab onClick={pause}>Programs</Tab>
            {/* <Tab onClick={pause}>Assesments</Tab> */}
            <Tab onClick={pause}>Clinical Data</Tab>
            <Tab onClick={pause}>Billing</Tab>
            {/* <Tab onClick={pause}>Alerts</Tab> */}
            {/* <Tab onClick={pause}>Documents</Tab> */}
            <Tab onClick={reset}>Task Timer</Tab>
            {/* <Tab onClick={pause}>Time Logs</Tab> */}
            <Tab>Time Logs</Tab>
            <Tab onClick={pause}>Devices</Tab>
            <Tab onClick={pause}>Portal</Tab>
          </TabList>

          {/* <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Condition
                        </h4>
                        <div className="card-body">
                            <input type="text" className='form-control mb-4' placeholder="Select one to add" />
                            <table className='table table-bordered table-sm'>
                                <th>Condition</th>
                                <th>Diagonostic Code</th>
                                <th>Diagonosic Code</th>
                                <th>Programme</th>
                                <th>Assessment</th>
                            </table>
                        </div>
                    </div>
                </TabPanel> */}
          <TabPanel>
            <div className="card">
              <h4 className="card-header">Programs</h4>
              <div className="card-body">
                <ButtonGroup aria-label="Basic example">
                  <Button variant="primary">CCM</Button>
                  <Button variant="secondary">RPM</Button>
                </ButtonGroup>
                <table className="table table-bordered table-sm">
                  <th>Enroll Date</th>
                  <th>Enroll Status</th>
                  <th>Care Plan</th>
                  <th>Manage CCM</th>
                  <th>Mins This Month</th>
                  <th>Provider Mins</th>
                  <th>CCM Care Manager</th>
                  <th>CCM Physician</th>
                </table>
              </div>
            </div>
          </TabPanel>
          {/* <TabPanel>
            <div className="card">
              <h4 className="card-header">Assesments</h4>
              <div className="card-body">
                This patient does not yet have any assessments.
              </div>
            </div>
          </TabPanel> */}
          <TabPanel>
            <div className="card">
              <h4 className="card-header">Clinical Data</h4>
              <div className="card-body">
                <Tabs>
                  <TabList>
                    {/* <Tab onClick={pause}>Allergies</Tab>
                                    <Tab onClick={pause}>Lab Results</Tab>
                                    <Tab onClick={pause}>Medications</Tab> */}
                    {/* <Tab onClick={pause}>Vitals</Tab> */}
                  </TabList>
                  {/* <TabPanel>
                                    Allergies
                                </TabPanel>
                                <TabPanel>
                                    Lab Results
                                </TabPanel>
                                <TabPanel>
                                    Medications
                                </TabPanel> */}
                  <TabPanel>
                    <Tabs>
                      <TabList>
                        <Tab onClick={pause}>Blood Pressure</Tab>
                        {/* <Tab onClick={pause}>Blood Pressure</Tab> */}
                        {/* <Tab onClick={pause}>Blood Pressure Average</Tab> */}
                        <Tab onClick={()=>{pause();fetchTd()}}>Blood Glucose</Tab>
                        {/* <Tab onClick={pause}>Blood GLucose Average</Tab> */}
                        <Tab onClick={pause}>Weight</Tab>
                        {/* <Tab onClick={pause}>Weight Average</Tab> */}
                        <Tab onClick={pause}>Threshold</Tab>
                      </TabList>
                      <TabPanel>
                        {/* <div className="card"> */}
                        <Tabs>
                          <TabList>
                            <Tab onClick={pause}>Dashboard</Tab>
                            <Tab onClick={pause}>LogBook</Tab>
                            <Tab onClick={pause}>Charts</Tab>
                          </TabList>
                          <TabPanel>
                            {renderDates()}
                            {renderslider()}
                            {getbpdata(1)}
                          </TabPanel>
                          <TabPanel>
                            {renderDates()}
                            {renderslider()}
                            {getbpdata(3)}
                          </TabPanel>
                          <TabPanel>
                            {renderDates()}
                            {renderslider()}
                            {getbpdata(2)}
                          </TabPanel>
                        </Tabs>
                      </TabPanel>
                      <TabPanel>
                        <Tabs>
                          <TabList>
                            <Tab onClick={pause}>Dashboard</Tab>
                            <Tab onClick={pause}>LogBook</Tab>
                            <Tab onClick={pause}>Charts</Tab>
                          </TabList>
                          <TabPanel>
                            {renderDates()}
                            {renderslider()}
                            {renderBloodGlucose(1)}
                          </TabPanel>
                          <TabPanel>
                            {renderDates()}
                            {renderslider()}
                            {renderBloodGlucose(3)}
                          </TabPanel>
                          <TabPanel>
                            {renderDates()}
                            {renderslider()}
                            {renderBloodGlucose(2)}
                          </TabPanel>
                        </Tabs>
                      </TabPanel>

                      <TabPanel>
                        <div className="card-body">
                          <Weight></Weight>
                        </div>
                      </TabPanel>
                      {/* <TabPanel>
                        <div className="card">
                          <WeightAverage />
                        </div>
                      </TabPanel> */}
                      <TabPanel>
                        <div className="card-body">
                          <Thresold></Thresold>
                        </div>
                        {/* <React.Fragment>
                                                <div className='row'>
                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'BG', bgMax, bgMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header">  Blood Glucose (mg / dl) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onStart={e => onBGChange(e)} onFinish={e => onBGChange(e)} type='double' min={0} max={500} from={bgMin} to={bgMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'BMI', bmiMax, bmiMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header"> BMI  (kg / m2) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onBMIChange(e)} type='double' min={0} max={100} from={bmiMin} to={bmiMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'DIASTOLIC', diastolicMax, diastolicMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header"> Diastolic (mmHg) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onDiastolicChange(e)} type='double' min={0} max={500} from={diastolicMin} to={diastolicMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'SYSTOLIC', systolicMax, systolicMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header"> Systolic (mmHg) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onSystolicChange(e)} type='double' min={0} max={500} from={systolicMin} to={systolicMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'WS', weightMax, weightMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}   </div>
                                                            <h4 className="card-header"> Weight (lb) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onWeightChange(e)} type='double' min={50} max={700} from={weightMin} to={weightMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment> */}
                      </TabPanel>
                    </Tabs>
                  </TabPanel>
                </Tabs>
                <br /> <br />
                {/* {/* {/* <Button className="mr-4" size="sm" variant="danger">New Allergy</Button>   <input type="checkbox" />  Patient has no allergies.
                            <table className='table table-bordered table-sm mt-4'>
                                <th>Allergy</th>
                                <th>Category</th>
                                <th>Reaction</th>
                                <th>Active</th>
                                <th>Critical</th>
                                <th>Date Identified</th>
                                <th>Actions</th>
                            </table> */}
              </div>
            </div>
          </TabPanel>
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
          {/* <TabPanel>
            <div className="card">
              <h4 className="card-header">Alert</h4>
              <div className="card-body">
                Date Range <br />
                <input type="text" className="form-control" placeholder="" />
                <br />
                <br />
                <table className="table table-bordered table-sm mt-4">
                  <th>Priority</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>View</th>
                </table>
              </div>
            </div>
          </TabPanel> */}
          {/* <TabPanel>
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
          </TabPanel> */}

          <TabPanel>
            <div className="card">
              <h4 className="card-header">Task Timer</h4>
              <div className="card-body">
                <div
                  className="mb-2 float-right"
                  style={{ backgroundColor: "transparent" }}>
                  <button
                    className="col-md-8"
                    type="button"
                    onClick={() => {
                      pause();
                      coreContext.AddTimeLog(
                        taskType,
                        performedBy,
                        date,
                        tlvalue !== "00:00:00"
                          ? tlvalueseconds
                          : minutes * 60 + seconds,
                        startDT,
                        patientId,
                        userName
                      );
                      coreContext.fetchTimeLog("PATIENT_" + patientId);
                      coreContext.fetchTimeLog("PATIENT_" + patientId);
                      coreContext.fetchTimeLog("PATIENT_" + patientId);
                      setPristine();
                      setPerformedBy("");
                      setTaskType("");
                      setDate(new Date());
                      sett1("");
                      settimevalue("");
                      setTlValue("00:00:00");
                    }}
                    className="btn btn-sm btn-success">
                    {" "}
                    Add Time Log
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      Task Type
                      {/* //  {setTaskType("CarePlanReconciliation")} */}
                      <select
                        value={t1 === "Other" ? t1 : taskType}
                        onChange={(e) => {
                          setTaskType(e.target.value);
                          setDirty();
                          sett1(e.target.value);
                        }}
                        className="form-control mb-2 mr-sm-2">
                        <option value="SelectTask">Select a Task Type</option>
                        <option value="CareCoordination">
                          Care Coordination
                        </option>
                        <option value="CarePlanReconciliation">
                          Care Plan Reconciliation
                        </option>
                        <option value="DataReview">Data Review</option>
                        <option value="Other">Others...</option>
                      </select>
                      {/* {console.log("sahil",taskType)} */}
                      {t1 === "Other" ? (
                        <input
                          type="text"
                          className="form-control mb-2 mr-sm-2"
                          placeholder="Enter other value.."
                          value={taskType}
                          onChange={(e) => setTaskType(e.target.value)}
                        />
                      ) : null}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        Performed By
                        {/* {renderTaskTimer()} */}
                        <select
                          value={performedBy}
                          onChange={(e) => {
                            setPerformedBy(e.target.value);
                            setDirty();
                          }}
                          className="form-control mb-2 mr-sm-2">
                          <option value="SelectUser">Select a User</option>
                          {tt.map((curr) => {
                            return (
                              <option
                                value={!curr.name ? curr.provider : curr.name}>
                                {" "}
                                {!curr.name ? curr.provider : curr.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-12">
                        Performed On
                        <br />
                        <DatePicker
                          className="form-control mt-2"
                          selected={date}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          // onChange={(date) => setDate(date)}
                          onChange={(date) => {
                            setDate(date);
                            setDirty();
                            setstartDT(date);
                          }}
                          placeholderText="Enter a date"
                          dateFormat="MM/dd/yyyy hh:mm:ss aa"
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="appt">Enter Total Time:</label>
                        <input
                          className="form-control mb-2 mr-sm-2"
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={tlvalue}
                        />
                        {/* <input className="form-control mb-2 mr-sm-2" type="time" min='00:00:00' max='23:59:59'  value={timevalue} onChange={(e)=>{settimevalue(e.target.value);}} step="1"/> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="card">
              <h4 className="card-header">Time Logs</h4>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    Total Time Logs (min: sec): {fetchtotaltime()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">{renderTimelogs()}</div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="card">
              <h4 className="card-header">Devices</h4>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">Enable Measurements</div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select one to add"
                    />
                  </div>
                </div>
                <br />

                <table className="table table-bordered table-sm mt-4">
                  <th>Enabled Metric</th>
                  <th>Description</th>
                  <th>Device</th>
                  <th>Actions</th>
                </table>
                <br />

                <div className="row">
                  <div className="col-md-8">
                    <h6>
                      <span className="badge badge-primary">
                        Provider Registered Devices
                      </span>
                    </h6>
                    <table className="table table-bordered table-striped table-hover table-sm">
                      <thead>
                        <tr>
                          <th>Device Name</th>
                          <th>Device ID</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>{renderDeviceData()}</tbody>
                    </table>
                  </div>
                  <div className="col-md-4">
                    <form>
                      <h6>
                        <span className="badge badge-primary">
                          {" "}
                          Add a Device
                        </span>
                      </h6>
                      <select
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                        className="form-control mb-2 mr-sm-2">
                        <option value="">Select Device</option>
                        <option value="BP">Blood Pressure</option>
                        <option value="BG">Blood Glucose</option>
                        <option value="WS">Weight</option>
                      </select>
                      <input
                        type="text"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        className="form-control mb-2 mr-sm-2"
                        placeholder="Enter device ID "
                      />
                      <button
                        type="button"
                        onClick={() =>
                          coreContext.addDevice(deviceType, deviceId, patientId)
                        }
                        className="btn btn-primary mb-2">
                        Add Device
                      </button>
                    </form>
                  </div>
                </div>
                <div className="card" style={{ backgroundColor: "#b8b133" }}>
                  <div
                    className="card-body"
                    onClick={() => setShowNotesTextBox(true)}>
                    {" "}
                    This patient has not any supplied devices to their portal.
                    You will NOT be able to bill for 99453 or 99454.{" "}
                  </div>
                </div>

                {/* <table className='table table-bordered table-sm mt-4'>
                                <th>Device</th>
                                <th>Device ID</th>
                                <th>Connected At</th>
                                <th>Last Measurement At</th>
                                <th>Actions</th>
                            </table> */}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="card">
              <h4 className="card-header">Portal</h4>
              <div className="card-body">
                Portal Status:{" "}
                <Button variant="success">Enable Portal Status</Button>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      );
  };

  return (
    <div className="card">
      <div
        className="btn btn-primary mb-2 float-right"
        style={{ backgroundColor: "transparent" }}
        id="stopwatch">
        <span className="min-time" style={{ marginLeft: 550 }}>
          <span className="time-txt">min</span>
          <span className="time-num">{minutes}</span>
        </span>
        <span className="dots">:</span>
        <span className="sec-time">
          <span className="time-txt">sec</span>
          <span className="time-num">{seconds}</span>
        </span>
        <button
          id="startTimer"
          className="btn btn-sm btn-success"
          onClick={start}>
          Start
        </button>
        <button
          id="pauseTimer"
          className="btn btn-sm btn-warning"
          onClick={pause}>
          Pause
        </button>
        <button
          id="resetTimer"
          className="btn btn-sm btn-danger"
          onClick={reset}>
          Reset
        </button>
        {/* <button type='button'eventKey={'TimeLog'}  onClick={() => {coreContext.UpdateTimeLog( coreContext.timeLogData, patientId, userName );handleSelect(8);setPristine();setPerformedBy("");setTaskType("");setDate("");sett1("");}} className="btn btn-sm btn-success"> Update Time Log</button>  */}

        {/* <button type='button' onClick={() => {pause();coreContext.AddTimeLog( taskType, performedBy, date,(tlvalue!=="00:00:00")?tlvalueseconds:minutes*60+seconds,startDT, patientId, userName );coreContext.fetchTimeLog("PATIENT_" + patientId);coreContext.fetchTimeLog("PATIENT_" + patientId);coreContext.fetchTimeLog("PATIENT_" + patientId);setPristine();setPerformedBy("");setTaskType("");setDate("");sett1("");settimevalue("");setTlValue("00:00:00");}} className="btn btn-sm btn-success"> Add Time Log</button> */}
      </div>

      {/* <div
        className="btn btn-primary mb-2 float-right"
        style={{ backgroundColor: "transparent" }}>
        <button
          style={{ marginRight: 12 }}
          id="resetTimer"
          className="btn btn-sm btn-danger"
          onClick={reset}>
          Reset
        </button>
      </div> */}

      <div onClick={() => setShowNotesTextBox(false)} className="card-header">
        {rendertop}
      </div>
      <div onClick={() => setShowNotesTextBox(false)} className="card-header">
        {renderAddModifyFlags()}
      </div>
      <div className="card-header">{renderAddNotes()}</div>

      <div className="row">
        <div className="col-md-8">
          <div
            onClick={() => setShowNotesTextBox(false)}
            className="card-header">
            {renderExpandCollapse()}
          </div>
          <div
            onClick={() => setShowNotesTextBox(false)}
            className="card-header">
            {renderPatientinformation()}{" "}
          </div>
        </div>
        <div className="col-md-4">
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

      {Prompt}

      <div>
        <React.Fragment>
          <Modal show={showModal} onHide={handleModalClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit Task Type </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <h4 className="card-header">Task Timer</h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        Task Type
                        {/* //  {setTaskType("CarePlanReconciliation")} */}
                        <select
                          value={t1 === "Other" ? t1 : taskType}
                          onChange={(e) => {
                            setTaskType(e.target.value);
                            setDirty();
                            sett1(e.target.value);
                          }}
                          className="form-control mb-2 mr-sm-2">
                          <option value="SelectTask">Select a Task Type</option>
                          <option value="CareCoordination">
                            Care Coordination
                          </option>
                          <option value="CarePlanReconciliation">
                            Care Plan Reconciliation
                          </option>
                          <option value="DataReview">Data Review</option>
                          <option value="Other">Others...</option>
                        </select>
                        {/* {console.log("sahil",taskType)} */}
                        {t1 === "Other" ? (
                          <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter other value.."
                            value={taskType}
                            onChange={(e) => setTaskType(e.target.value)}
                          />
                        ) : null}
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          Performed By
                          {/* {renderTaskTimer()} */}
                          <select
                            value={performedBy}
                            onChange={(e) => {
                              setPerformedBy(e.target.value);
                              setDirty();
                            }}
                            className="form-control mb-2 mr-sm-2">
                            <option value="SelectUser">Select a User</option>
                            {tt.map((curr) => {
                              return (
                                <option
                                  value={
                                    !curr.name ? curr.provider : curr.name
                                  }>
                                  {" "}
                                  {!curr.name ? curr.provider : curr.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-12">
                          Performed On
                          <br />
                          <DatePicker
                            className="form-control mt-2"
                            selected={date}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            // onChange={(date) => setDate(date)}
                            onChange={(date) => {
                              setDate(date);
                              setDirty();
                              setstartDT(date);
                            }}
                            placeholderText="Enter a date"
                            dateFormat="MM/dd/yyyy hh:mm:ss aa"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="appt">Enter Total Time:</label>
                          <input
                            className="form-control mb-2 mr-sm-2"
                            type="text"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={tlvalue}
                          />
                          {/* <input className="form-control mb-2 mr-sm-2" type="time" value={timevalue} onChange={(e)=>{settimevalue(e.target.value);}} step="1"/> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    coreContext.UpdateTimeLog(
                      currTimeLog,
                      taskType,
                      performedBy,
                      date,
                      tlvalueseconds,
                      patientId,
                      userName
                    );
                    handleUpdate();
                  }}
                  className="btn btn-sm btn-success">
                  {" "}
                  Update Time Log
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      </div>
      <div onClick={() => setShowNotesTextBox(false)} className="card-header">
        {renderTabs()}
      </div>
    </div>
  );
};

export { PatientSummary };
