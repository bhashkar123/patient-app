import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";
import { DataGrid } from "@material-ui/data-grid";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Loader from "react-loader-spinner";
import IonRangeSlider from "react-ion-slider";
const Moment = require("moment");

const BloodGlucoseAverage = (props) => {
  const coreContext = useContext(CoreContext);

  useEffect(coreContext.checkLocalAuth, []);

  const [patientId, setPatientId] = useState("");
  const [userType, setUserType] = useState("");
  const [Days, setDays] = useState(30);

  const fetchBloodGlucose = () => {
    // const patientId =  localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    // check page if left side menu.
    if (window.location.href.substring("bloodglucose") > 0) {
    }
    if (window.location.href.indexOf("patient-summary") > 0) {
      patientId = localStorage.getItem("ehrId");
      userType = "patient";
      // clear this otherwise will be problem
      localStorage.removeItem("ehrId");
    }
    setUserType(userType);
    coreContext.fetchBloodGlucose(patientId, userType);
  };

  useEffect(fetchBloodGlucose, [coreContext.bloodglucoseData.length]);
  let avgData = [];
  let newrows = coreContext.bloodglucoseData
    .map((curr) => curr.UserName)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  console.log(newrows[0]);
  const getReading = (value) => {
    let averagereading = 0;
    let record = 0;
    let today = new Date();
    let bfr = new Date().setDate(today.getDate() - Days);

    coreContext.bloodglucoseData.map((curr) => {
      if (
        curr.UserName === value &&
        new Date(curr.CreatedDate) > new Date(bfr) &&
        curr.reading !== undefined
      ) {
        averagereading = averagereading + Number(curr.reading);
        record = record + 1;
        //    console.log(new Date(curr.CreatedDate), new Date(bfr),new Date(curr.CreatedDate)>new Date(bfr))
      }
    });
    return averagereading / record;
  };
  const getBloodglucosemmol = (value) => {
    let averagebloodglucosemmol = 0;
    let record = 0;
    let today = new Date();
    let bfr = new Date().setDate(today.getDate() - Days);

    coreContext.bloodglucoseData.map((curr) => {
      //console.log(curr)
      if (
        curr.UserName === value &&
        new Date(curr.CreatedDate) > new Date(bfr) &&
        curr.bloodglucosemmol !== undefined
      ) {
        //  (curr.UserName==='Jaypal')? console.log(curr,curr.bloodglucosemmol):null

        averagebloodglucosemmol =
          averagebloodglucosemmol + Number(curr.bloodglucosemmol);
        record = record + 1;
      }
    });
    return averagebloodglucosemmol / record;
  };
  const getBloodglucosemgdl = (value) => {
    let averagebloodglucosemgdl = 0;
    let record = 0;
    let today = new Date();
    let bfr = new Date().setDate(today.getDate() - Days);

    coreContext.bloodglucoseData.map((curr) => {
      if (
        curr.UserName === value &&
        new Date(curr.CreatedDate) > new Date(bfr) &&
        curr.bloodglucosemgdl !== undefined
      ) {
        averagebloodglucosemgdl =
          averagebloodglucosemgdl + Number(curr.bloodglucosemgdl);
        record = record + 1;
      }
    });
    return averagebloodglucosemgdl / record;
  };

  newrows.map((user) => {
    let avg = {
      id: avgData.length,
      UserName: user,
      reading: getReading(user),
      bloodglucosemmol: getBloodglucosemmol(user),
      bloodglucosemgdl: getBloodglucosemgdl(user),
    };

    //    console.log(avg)
    avgData.push(avg);
    // setId(id+1)

    //  setAvgData([...avgdaData,avg])
    console.log(avgData);
    return avgData;
    // console.log(avgData)
  });

  //console.log(rows)

  const columns = [
    {
      field: "UserName",
      headerName: "Patient Name",
      width: 200,
      type: "string",
      renderCell: (params) => (
        <a href={`/patient-summary/${btoa(params.row.userId)}`}>
          {" "}
          {params.row.UserName}{" "}
        </a>
      ),
    },
    {
      field: "reading",
      headerName: "Reading",
      type: "number",
      editable: false,
      width: 200,
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
  ];
  const showEditForm = (patient) => {};
  const deletePatient = (patient) => {};

  const patientcolumns = [
    // {
    //   field: 'UserName',
    //   headerName: 'Patient Name',
    //   width: 200 ,
    //   type: 'string',
    //   renderCell: (params) => (
    //     <a  href={`/patient-summary/${btoa(params.row.userId)}`}> {params.row.UserName} </a>
    //   )
    // },
    // {
    //   field: 'reading',
    //   headerName: 'Reading',
    //   type: 'number',
    //   editable: false,
    //   width: 200
    // },
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
        <div style={{ height: 680, width: "100%" }}>
          <DataGrid
            rows={avgData}
            columns={dgcolumns}
            pageSize={10}
            sortingOrder={["desc", "asc"]}
            //   sortModel={[{ field: 'sortDateColumn', sort: 'desc' }]}
          />
        </div>
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

  return (
    <div className="card">
      <h4 className="card-header">BLOOD GLUCOSE INFORMATION</h4>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <h4 className="card-header"> Select Days </h4>
              <div className="card-body">
                <IonRangeSlider
                  keyboard={true}
                  onStart="1"
                  onFinish={(e) => setDays(e.from)}
                  type="single"
                  min={0}
                  max={90}
                  from={Days}
                  to={Days}
                  step={7}
                  grid={true}
                  grid_margin={true}
                />

                <h3> Last {Days} days Selected</h3>
              </div>
            </div>
          </div>
        </div>
        {renderBloodGlucose()}
      </div>
    </div>
  );
};

export { BloodGlucoseAverage };
