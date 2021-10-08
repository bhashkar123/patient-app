import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "react-loader-spinner";

const Vdeviceinfo = (props) => {
  const coreContext = useContext(CoreContext);

  useEffect(coreContext.checkLocalAuth, []);
  const fetchDevice = () => {
    const patient = JSON.parse(localStorage.getItem("app_patient"));
    let patientId = localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    let userName = localStorage.getItem("userName");
    if (patient != undefined) {
      if (patient.ehrId !== undefined) {
        patientId = patient.ehrId;
        userType = "patient";
        userName = patient.name;
      }
    }

    if (patientId !== undefined) {
      if (userType == "admin") {
        coreContext.fetchPatientListfromApi("admin", null);
        if (coreContext.patients.length > 0) {
          coreContext.fetchDeviceData(
            patientId,
            userName,
            userType,
            "",
            coreContext.patients
          );
        }
      }
    }
  };

  useEffect(fetchDevice, [coreContext.patients.length]);

  const columns = [
    {
      field: "username",
      headerName: "Patient Name",
      width: 300,
      type: "string",
    },
    {
      field: "deviceID",
      headerName: "Device ID",
      editable: false,
      width: 300,
    },
    {
      field: "DeviceType",
      headerName: "Device Type",
      width: 310,
      editable: false,
    },
  ];

  //https://material-ui.com/components/data-grid/

  const renderdeviceinfo = () => {
    if (coreContext.deviceData.length == 0) {
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
    if (coreContext.deviceData.length > 0) {
      return (
        <div style={{ height: 680, width: "100%" }}>
          <DataGrid
            rows={coreContext.deviceData.filter((s) =>
              s.deviceID !== undefined ? s.deviceID.length > 7 : null
            )}
            columns={columns}
            pageSize={10}
            sortModel={[{ field: "deviceID", sort: "asc" }]}
          />
        </div>
      );
    }
  };

  return (
    <div className="card">
      <h4 className="card-header">Device information</h4>

      <div className="card-body">{renderdeviceinfo()}</div>
    </div>
  );
};

export { Vdeviceinfo };
