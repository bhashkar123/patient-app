import React, { useState, useContext, useMemo, useEffect } from "react";
import { CoreContext } from "../context/core-context";
import IonRangeSlider from "react-ion-slider";
import Loader from "react-loader-spinner";

const Thresold = (props) => {
  const coreContext = useContext(CoreContext);

  useEffect(coreContext.checkLocalAuth, []);

  const [thData, setThData] = useState([]);
  const [bgMin, setBgMin] = useState(0);
  const [bgMax, setBgMax] = useState(0);
  const [userType, setUserType] = useState("");

  const [bmiMin, setBmiMin] = useState(0);
  const [bmiMax, setBmiMax] = useState(0);

  const [diastolicMin, setDiastolicMin] = useState(0);
  const [diastolicMax, setDiastolicMax] = useState(0);

  const [systolicMin, setSystolicMin] = useState(0);
  const [systolicMax, setSystolicMax] = useState(0);

  const [weightMin, setWeightMin] = useState(0);
  const [weightMax, setWeightMax] = useState(0);
  const [patient, setPatient] = useState({});
  const [patientId, setPatientId] = useState({});

  const [disableChart, setdisableChart] = useState(false);
  // let disableChart = false;

  const fetchThresold = () => {
    // // const p = JSON.parse(localStorage.getItem('app_patient'));
    // // setPatient(p);
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    // check page if left side menu.
    setPatientId(patientId);
    setUserType(userType);
  

    if (userType === "admin" &&window.location.href.indexOf("patient-summary")<=0) {
      setdisableChart(false);
      
      coreContext.fetchThresold("ADMIN_"+patientId, "admin");
      coreContext.fetchadminThresold("ADMIN_"+patientId, "admin")
    } else if (userType === "patient") {
      setdisableChart(true);
    }
    console.log("why", localStorage.getItem("userType"), patientId);
    if (window.location.href.substring("bloodpressure") > 0) {
    }
    if (window.location.href.indexOf("patient-summary") > 0) {
      patientId = localStorage.getItem("ehrId");
      let aid=localStorage.getItem("userId");
    
   

      setPatientId(patientId);
      // userType = "patient";
      // clear this otherwise will be problem
      //localStorage.removeItem("ehrId");
      setdisableChart(false);
      var finalId = "ADMIN_" + patientId;
      setUserType(userType);
      coreContext.fetchThresold(finalId, userType);
      coreContext.fetchadminThresold("ADMIN_"+aid, "admin")
      

    }
    
   
    
    //const memoizedValue = useMemo(() => coreContext.fetchThresold(patientId, userType), [corecontext.thresoldData]);

    setThData(coreContext.thresoldData);
    console.log("data sis ",coreContext.thresoldData)
    
    console.log("adminthresid",coreContext.adminthresold)
    console.log("patienthresold",coreContext.adminthresold)
    const setdata=(data)=>
    {
      {
        setThData(data);
        console.log("check threshold value", coreContext.thresoldData);
        console.log("admincxbnnnnnnnnnnnnnnnnnnnnnndata",coreContext.thresoldData)
  
        var bgdata = coreContext.thresoldData.filter(
          (a) => a.Element_value === "Blood Glucose"
        );
          
        if (bgdata.length > 0) {
          setBgMin(bgdata[0].bg_low);
          setBgMax(bgdata[0].bg_high);
          console.log("vhekvdjhfjdbg datat",bgMax)
        } else {
          setBgMin(0);
          setBgMax(0);
        }
  
        var bpdata = coreContext.thresoldData.filter(
          (a) => a.Element_value === "BMI"
        );
        {
          console.log("chevffgg", coreContext.thresoldData);
        }
        if (bpdata.length > 0) {
          setBmiMin(bpdata[0].bmi_low);
          setBmiMax(bpdata[0].bmi_high);
        } else {
          setBmiMin(0);
          setBmiMax(0);
        }
  
        var dialostic = coreContext.thresoldData.filter(
          (a) => a.Element_value === "DIASTOLIC"
        );
  
        if (dialostic.length > 0) {
          setDiastolicMin(dialostic[0].diastolic_low);
          setDiastolicMax(dialostic[0].diastolic_high);
        } else {
          setDiastolicMin(0);
          setDiastolicMax(0);
        }
  
        var systolic = coreContext.thresoldData.filter(
          (a) => a.Element_value === "SYSTOLIC"
        );
        if (systolic.length > 0) {
          setSystolicMin(systolic[0].systolic_low);
          setSystolicMax(systolic[0].systolic_high);
        } else {
          setSystolicMin(0);
          setSystolicMax(0);
        }
  
        var weight = coreContext.thresoldData.filter(
          (a) => a.Element_value === "Weight"
        );
  
        if (weight.length > 0) {
          setWeightMin(weight[0].weight_low);
          setWeightMax(weight[0].weight_high);
        } else {
          setWeightMin(0);
          setWeightMax(0);
        }
      }
    }

    // setting default value
    if (coreContext.thresoldData.length === 0 ) {
     
      //coreContext.fetchThresold("ADMIN_"+localStorage.getItem("userType"), "admin");
      if(coreContext.adminthresold.length===0){
       
      let thdata = {};
      console.log(thdata)
      const thDatas = [];
      thdata.Element_value = "Blood Glucose";
      thdata.bg_low = 0;
      thdata.bg_high = 0;
      thDatas.push(thdata);

      thdata = {};
      thdata.Element_value = "BMI";
      thdata.bmi_low = 0;
      thdata.bmi_high = 0;
      thDatas.push(thdata);

      thdata = {};
      thdata.Element_value = "Diastolic";
      thdata.diastolic_low = 0;
      thdata.diastolic_high = 0;
      thDatas.push(thdata);

      thdata = {};
      thdata.Element_value = "Systolic";
      thdata.systolic_high = 0;
      thdata.systolic_low = 0;
      thDatas.push(thdata);

      thdata = {};
      thdata.Element_value = "Weight";
      thdata.weight_low = 0;
      thdata.weight_high = 10;
      thDatas.push(thdata);
      setThData(thDatas);}
      else{
        setdata(coreContext.adminthresold)
    
      }
      // console.log("check threshold value", coreContext.thresoldData);
      // console.log("admincxbnnnnnnnnnnnnnnnnnnnnnndata",coreContext.thresoldData)
      
    } else{
      setdata(coreContext.thresoldData)
    }
  };


  useEffect(fetchThresold, []);
  
  useEffect(fetchThresold,[coreContext.thresoldData.length])

  const onBGChange = (e) => {
    setBgMin(e.from);
    setBgMax(e.to);
    console.log(e.from, e.to);
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

  const UpdateThreshold = () => {
    console.log(
      bgMin,
      bgMax,
      bmiMin,
      bmiMax,
      diastolicMin,
      diastolicMax,
      systolicMin,
      systolicMax,
      weightMin,
      weightMax
    );
  };
  const renderslider = () => {
    if (coreContext.adminthresold.length === 0) {
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

    if (coreContext.adminthresold.length > 0) {
      return ( coreContext.adminthresold[0].bg_high);
    }
  };

  return (
    
    <React.Fragment>
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <h4 className="card-header">
            {" "}
            Blood Glucose (mg / dl){" "}
            <span>
              {userType === "doctor" ||
              userType === "admin" ||
              userType === "provider" ? (
                <button
                  type="button"
                  style={{ width: "190px" }}
                  onClick={() => {
                    coreContext.UpdateThreshold(
                      "ADMIN_" + patientId,
                      "bg",
                      bgMax,
                      bgMin,
                      userType
                    );
                   
                  }}
                  className="btn btn-primary mb-2 float-right">
                  {" "}
                  Update
                </button>
              ) : (
                ""
              )}
            </span>
          </h4>
          <div className="card-body">
            <IonRangeSlider
              disable={disableChart}
              keyboard={true}
              onStart={(e) => onBGChange(e)}
              onFinish={(e) => onBGChange(e)}
              type="double"
              min={0}
              max={500}
              from={bgMin}
              to={bgMax}
              step={0.01}
              grid={true}
              grid_margin={true}
              grid_number={5}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card">
          <h4 className="card-header">
            {" "}
            BMI (kg / m2)
            <span>
              {userType === "doctor" ||
              userType === "admin" ||
              userType === "provider" ? (
                <button
                  type="button"
                  style={{ width: "190px" }}
                  onClick={() =>
                    coreContext.UpdateThreshold(
                      "ADMIN_" + patientId,
                      "bmi",
                      bmiMax,
                      bmiMin,
                      userType
                    )
                  }
                  class="btn btn-primary mb-2 float-right">
                  {" "}
                  Update
                </button>
              ) : (
                ""
              )}
            </span>
          </h4>
          <div className="card-body">
            <IonRangeSlider
              disable={disableChart}
              keyboard={true}
              onFinish={(e) => onBMIChange(e)}
              type="double"
              min={0}
              max={100}
              from={bmiMin}
              to={bmiMax}
              step={0.01}
              grid={true}
              grid_margin={true}
              grid_number={5}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card">
          <h4 className="card-header">
            {console.log("sahil is id",userType)}
            Diastolic (mmHg)
            <span>
              {userType === "doctor" ||
              userType === "admin" ||
              userType === "provider" ? (
                <button
                  type="button"
                  style={{ width: "190px" }}
                  onClick={() =>
                    coreContext.UpdateThreshold(
                      "ADMIN_" + patientId,
                      "Diastolic",
                      diastolicMax,
                      diastolicMin,
                      userType
                    )
                  }
                  class="btn btn-primary mb-2 float-right">
                  {" "}
                  Update
                </button>
              ) : (
                ""
              )}
            </span>
          </h4>
          <div className="card-body">
            <IonRangeSlider
              disable={disableChart}
              keyboard={true}
              onFinish={(e) => onDiastolicChange(e)}
              type="double"
              min={0}
              max={500}
              from={diastolicMin}
              to={diastolicMax}
              step={0.01}
              grid={true}
              grid_margin={true}
              grid_number={5}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card">
          <h4 className="card-header">
            {" "}
            Systolic (mmHg)
            <span>
              {userType === "doctor" ||
              userType === "admin" ||
              userType === "provider" ? (
                <button
                  type="button"
                  style={{ width: "190px" }}
                  onClick={() =>
                    coreContext.UpdateThreshold(
                      "ADMIN_" + patientId,
                      "Systolic",
                      systolicMax,
                      systolicMin,
                      userType
                    )
                  }
                  class="btn btn-primary mb-2 float-right">
                  {" "}
                  Update
                </button>
              ) : (
                ""
              )}
            </span>
          </h4>
          <div className="card-body">
            <IonRangeSlider
              disable={disableChart}
              keyboard={true}
              onFinish={(e) => onSystolicChange(e)}
              type="double"
              min={0}
              max={500}
              from={systolicMin}
              to={systolicMax}
              step={0.01}
              grid={true}
              grid_margin={true}
              grid_number={5}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card">
          <h4 className="card-header">
            {" "}
            Weight (lb)
            <span>
              {console.log(userType)}
              {userType === "doctor" ||
              userType === "admin" ||
              userType === "provider" ? (
                <button
                  type="button"
                  style={{ width: "190px" }}
                  onClick={() =>
                    coreContext.UpdateThreshold(
                      "ADMIN_" + patientId,
                      "Weight",
                      weightMax,
                      weightMin,
                      userType
                    )
                  }
                  class="btn btn-primary mb-2 float-right">
                  {" "}
                  Update
                </button>
              ) : (
                ""
              )}{" "}
            </span>{" "}
          </h4>
          <div className="card-body">
            <IonRangeSlider
              disable={disableChart}
              keyboard={true}
              onFinish={(e) => onWeightChange(e)}
              type="double"
              min={50}
              max={700}
              from={weightMin}
              to={weightMax}
              step={0.01}
              grid={true}
              grid_margin={true}
              grid_number={5}
            />
          </div>
        </div>
      </div>
    </div>
    {renderslider()}
  </React.Fragment>

  );
};

export { Thresold };
