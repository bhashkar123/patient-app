import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";
import { DataGrid } from "@material-ui/data-grid";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Loader from "react-loader-spinner";
import IconButton from "@material-ui/core/IconButton";
import IonRangeSlider from "react-ion-slider";

import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: "space-between",
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
    textField: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      margin: theme.spacing(1, 0.5, 1.5),
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(0.5),
      },
      "& .MuiInput-underline:before": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
  { defaultTheme }
);

const Moment = require("moment");
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function QuickSearchToolbar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}>
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const BloodPressureAverage = (props) => {
  const coreContext = useContext(CoreContext);
  const [id, setId] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [userType, setUserType] = useState("");
  const [disablelink, setdisablelink] = useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [Days, setDays] = useState(30);

  const [rows, setRows] = React.useState(coreContext.bloodpressureData);
  const setd = (e) => {
    console.log(e);
  };

  let avgData = [];
  let newrows = coreContext.bloodpressureData
    .map((curr) => curr.UserName)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  console.log(newrows[0]);
  const getSystolic = (value) => {
    let averagesys = 0;
    let record = 0;
    let today = new Date();
    let bfr = new Date().setDate(today.getDate() - Days);

    coreContext.bloodpressureData.map((curr) => {
      if (
        curr.UserName === value &&
        new Date(curr.CreatedDate) > new Date(bfr) &&
        curr.systolic !== undefined
      ) {
        averagesys = averagesys + Number(curr.systolic);
        record = record + 1;
        //    console.log(new Date(curr.CreatedDate), new Date(bfr),new Date(curr.CreatedDate)>new Date(bfr))
      }
    });
    return averagesys / record;
  };
  const getDiastolic = (value) => {
    let averageDia = 0;
    let record = 0;
    let today = new Date();
    let bfr = new Date().setDate(today.getDate() - Days);

    coreContext.bloodpressureData.map((curr) => {
      if (
        curr.UserName === value &&
        new Date(curr.CreatedDate) > new Date(bfr) &&
        curr.diastolic !== undefined
      ) {
        averageDia = averageDia + Number(curr.diastolic);
        record = record + 1;
      }
    });
    return averageDia / record;
  };
  const getPulse = (value) => {
    let averagepulse = 0;
    let record = 0;
    let today = new Date();
    let bfr = new Date().setDate(today.getDate() - Days);

    coreContext.bloodpressureData.map((curr) => {
      if (
        curr.UserName === value &&
        new Date(curr.CreatedDate) > new Date(bfr) &&
        curr.Pulse !== undefined
      ) {
        averagepulse = averagepulse + Number(curr.Pulse);
        record = record + 1;
      }
    });
    return averagepulse / record;
  };

  newrows.map((user) => {
    let avg = {
      id: avgData.length,
      UserName: user,
      systolic: getSystolic(user),
      diastolic: getDiastolic(user),
      Pulse: getPulse(user),
    };

    console.log(avg);
    avgData.push(avg);
    // setId(id+1)

    //  setAvgData([...avgdaData,avg])
    return avgData;
    //console.log(avgData)
  });

  //  console.log(rows)

  //
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = avgData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(avgData);
  }, []);

  // coreContext.bloodpressureData.map((curr)=>{
  //     return console.log(curr)
  // })

  const fetchBloodPressure = () => {
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    setdisablelink(false);
    // check page if left side menu.
    if (window.location.href.substring("bloodpressure") > 0) {
    }
    if (window.location.href.indexOf("patient-summary") > 0) {
      patientId = localStorage.getItem("ehrId");
      userType = "patient";
      // clear this otherwise will be problem
      localStorage.removeItem("ehrId");
      setdisablelink(true);
    }
    setUserType(userType);

    coreContext.fetchBloodPressure(patientId, userType);
  };

  useEffect(fetchBloodPressure, [coreContext.bloodpressureData.length]);

  const columns = [
    {
      field: "UserName",
      headerName: "Patient Name",
      width: 200,
      type: "string",
      renderCell: (params) => (
        <a
          disable={disablelink}
          href={`/patient-summary/${btoa(params.row.userId)}`}>
          {" "}
          {params.row.UserName}{" "}
        </a>
      ),
    },
    {
      field: "systolic",
      headerName: "Systolic",
      type: "number",
      editable: false,
      width: 200,
    },
    {
      field: "diastolic",
      headerName: "Diastolic",
      type: "number",
      editable: false,
      width: 200,
    },

    {
      field: "Pulse",
      headerName: "Pulse",
      type: "number",
      editable: false,
      width: 200,
    },
  ];

  const showEditForm = (patient) => {};
  const deletePatient = (patient) => {};

  const patientcolumns = [
    {
      field: "UserName",
      headerName: "Patient Name",
      width: 200,
      type: "string",
    },
    {
      field: "systolic",
      headerName: "Systolic",
      type: "number",
      editable: false,
      width: 200,
    },
    {
      field: "diastolic",
      headerName: "Diastolic",
      type: "number",
      editable: false,
      width: 200,
    },

    {
      field: "Pulse",
      headerName: "Pulse",
      type: "number",
      editable: false,
      width: 200,
    },
  ];
  const renderBloodPressure = () => {
    if (coreContext.bloodpressureData.length == 0) {
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
      coreContext.bloodpressureData.length > 0 &&
      coreContext.bloodpressureData[0].UserName !== undefined
    ) {
      //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
      return (
        <div style={{ height: 680, width: "100%" }}>
          <DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            rows={!searchText ? avgData : rows}
            columns={dgcolumns}
            pageSize={10}
            //sortModel={[{ field: 'sortDateColumn', sort: 'desc' }]}
            //sortingOrder={['desc', 'asc']}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(""),
              },
            }}
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
      <h4 className="card-header">BLOOD PRESSURE INFORMATION</h4>
      <div style={{ display: "flex", paddingTop: "10px" }}>
        <button
          style={{ marginLeft: "94%" }}
          onClick={() => fetchBloodPressure()}>
          Refresh
        </button>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <h4 className="card-header"> Select Days </h4>
              <div className="card-body">
                <IonRangeSlider
                  keyboard={true}
                  onStart="0"
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
        {renderBloodPressure()}
      </div>
    </div>
  );
};

export { BloodPressureAverage };
