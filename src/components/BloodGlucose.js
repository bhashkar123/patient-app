import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";

import { PencilSquare, Trash } from "react-bootstrap-icons";
import Loader from "react-loader-spinner";
import {
  BrowserRouter as Router,
  
  Link
} from "react-router-dom";
import DataGridTable from "./common/DataGrid";
const Moment = require("moment");


const BloodGlucose = (props) => {
  const coreContext = useContext(CoreContext);

  useEffect(coreContext.checkLocalAuth, []);

  
  const [userType, setUserType] = useState("");


  const fetchBloodGlucose = () => {
    // const patientId =  localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    // check page if left side menu.
    if (window.location.href.substring("bloodglucose") > 0) {
    }
    // if (window.location.href.indexOf("patient-summary") > 0) {
    //   patientId = localStorage.getItem("ehrId");
    //   userType = "patient";
    //   // clear this otherwise will be problem
    //   localStorage.removeItem("ehrId");
    // }
    setUserType(userType);
    coreContext.fetchPatientListfromApi(userType, patientId);
    coreContext.fetchBloodGlucose(patientId, userType);
  };

  useEffect(fetchBloodGlucose, [coreContext.patients.length]);

  

  const columns = [
    {
      field: "UserName",
      headerName: "Patient Name",
      width: 200,
      type: "string",
      renderCell: (params) => (
        <Link to={`/patient-summary/${btoa(params.row.userId)}`} onClick={()=>console.log("sahil",params.row)}>
          {" "}
          {params.row.UserName}{" "}
        </Link>
      ),
    },
    {
      field: "MeasurementDateTime",
      headerName: "Date Recorded",
      editable: false,
      width: 200,
      type: "dateTime",

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "bloodglucosemmol",
      headerName: "Blood Glucose (mmol)",
      type: "number",
      editable: false,
      width: 200,
    },
    {
      field: "bloodglucosemgdl",
      headerName: "Blood Glucose (mgdl)",
      type: "number",
      editable: false,
      width: 200,
    },
    {
      field: "meal",
      headerName: "Before/After Meal",
      width: 110,
      editable: false,
      width: 200,
    },

    {
      field: "CreatedDate",
      headerName: "Date Received",
      width: 200,
      editable: false,
      type: "dateTime",

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "DeviceId",
      headerName: "Device Id",
      width: 200,
      editable: false,
    },
    {
      field: "battery",
      headerName: "Battery",
      type: "number",
      width: 200,
      editable: false,
    },
    {
      field: "sortDateColumn",
      headerName: "Action",
      width: 300,

      renderCell: (params) => (
        <div>
          {" "}
          <Link to="#" onClick={() => showEditForm(params.row)}>
            {" "}
            <PencilSquare />
          </Link>
          <Link to="#" onClick={() => deletePatient(params.row)}>
            {" "}
            <Trash />
          </Link>
        </div>
      ),
    },
  ];
  const showEditForm = (patient) => {};
  const deletePatient = (patient) => {};

  const patientcolumns = [
    {
      field: "MeasurementDateTime",
      headerName: "Date Recorded",
      editable: false,
      width: 200,
      type: "dateTime",

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    // {
    //   field: 'bloodglucosemmol',
    //   headerName: 'Blood Glucose (mmol)',
    //   type: 'number',
    //   editable: false,
    //   width: 200
    // },
    {
      field: "bloodglucosemgdl",
      headerName: "Blood Glucose (mgdl)",
      type: "number",
      editable: false,
      width: 200,
    },
    {
      field: "meal",
      headerName: "Before/After Meal",
      width: 110,
      editable: false,
      width: 200,
    },

    // {
    //   field: 'CreatedDate',
    //   headerName: 'Date Received',
    //   width: 200,
    //   editable: false,type:'dateTime',

    //   valueFormatter: (params) => {
    //       const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
    //        return `${valueFormatted}`;
    //      },

    // },
    {
      field: "DeviceId",
      headerName: "Device Id",
      width: 200,
      editable: false,
    },
    // {
    //   field: 'reading_id',
    //   headerName: 'Reading Id',
    //   type: 'number',
    //   width: 200,
    //   editable: false,
    // },
    {
      field: "battery",
      headerName: "Battery",
      type: "number",
      width: 200,
      editable: false,
    },
    {
      field: "sortDateColumn",
      headerName: "Action",
    },
  ];

  const renderBloodGlucose = () => {
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
    let dgcolumns = columns;
    if (userType === "patient") {
      dgcolumns = patientcolumns;
    }
    if (
      coreContext.bloodglucoseData.length > 0 &&
      coreContext.bloodglucoseData[0].UserName !== undefined
    ) {
      //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
      return (
        <>
         
          {/* <DataGridTable columns={dgcolumns} rows={coreContext.bloodglucoseData}/> */}
          <DataGridTable columns={dgcolumns} rows={coreContext.bloodglucoseData}/>
          </>
        
      );
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
const jh=React.useMemo(()=>renderBloodGlucose(),[coreContext.bloodglucoseData.length])
  return (
    <div className="card">
      <h4 className="card-header">BLOOD GLUCOSE INFORMATION</h4>
      <div className="card-body">{jh}</div>
    </div>
  );
};

export { BloodGlucose };
