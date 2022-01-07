import React, { useState, useEffect } from "react";
import axios from "axios";
import loader from "../assets/images/835.gif";
import Moment from "moment";
import swal from "sweetalert";

export const CoreContext = React.createContext({});

export const CoreContextProvider = (props) => {
  const [userinfo, setuserinfo] = useState([]);
  const [patients, setPatients] = useState([]);
  const [bgData, setbgData] = useState([]);
  const [bpData, setbpData] = useState([]);
  const [message1,setmessage1]=useState("");
  const [wsData, setwsData] = useState([]);
  const [adminthresold, setadminthresold] = useState([]);

  const [weightData, setweightData] = useState([]);
  const [weightApiData, setweightdeviceApiData] = useState([]);

  const [thresoldData, setThresoldData] = useState([]);
  const [timeLogData, setTimeLogData] = useState([]);
  const [AlltimeLogData, setAllTimeLogData] = useState([]);
  const [bloodpressureData, setbloodpressureData] = useState([]);
  const [bloodglucoseData, setbloodglucoseData] = useState([]);

  const [deviceData, setdeviceData] = useState([]);
  const [patientWDevice, setPatientWDevice] = useState([]);

  const [providerData, setdoctorData] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [coachOptions, setCoachOptions] = useState([]);
  const [careCoordinatorOptions, setCoordinatorOptions] = useState([]);
  const [ccData, setccData] = useState([]);
  const [coachData, setcoachData] = useState([]);
  const [resetForm, setResetForm] = useState(0);
  const [tasktimerUserData, settasktimerUserData] = useState([]);

  const [patient, setPatient] = useState({});
  const [threads, setThreads] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [genderOptions, setgenderOptions] = useState([
    { name: "Male", value: 0 },
    { name: "Female", value: 1 },
  ]);
  const [languageOptions, setLanguage] = useState([
    { name: "English", value: 0 },
    { name: "Spanish", value: 1 },
  ]);

  const [outbox, setOutbox] = useState([]);

  const [showProviderModal, setShowProviderModal] = useState(false);

  const handleProviderModalClose = () => setShowProviderModal(false);
  const handleProviderModalShow = () => setShowProviderModal(true);

  const [showPatientConfirmationModal, setShowPatientConfirmationModal] =
    useState(false);

  const handlePatientConfirmationModalClose = () =>
    setShowPatientConfirmationModal(false);
  const handlePatientConfirmationModalShow = () =>
    setShowPatientConfirmationModal(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [jwt, setJwt] = useState("");
  const [userId, setUserId] = useState("");
  const [dpatient, setDpatient] = useState([]);

  const [result, setResult] = useState([]);

  const [apiUrl, setApiUrl] = useState(
    "https://rpmcrudapis20210808220332demo.azurewebsites.net/api"
  );
  const [userTable, setuserTable] = useState("UserDetailsDemo");

  // const [apiUrl, setApiUrl] = useState('https://rpmcrudapis20210725100004.azurewebsites.net/api');
  // const [userTable, setuserTable] = useState('UserDetail');

  ///Chart Data

  const [bgChartData, setbgChartData] = useState([]);
  const [bpChartData, setbpChartData] = useState([]);
  const [wsChartData, setwsChartData] = useState([]);
  const [Tab1data, setTab1data] = useState({
    CurrentDate: "",
    FirstName: "",
    LastName: "",
    sex: "",
    DateOfBirth: "",
    PhoneNumber: "",
    EmailAddress: "",
    Address1: "",
    Address2: "",
    city: "",
    state: "",
    zip: "",
    CurrentMedicineStatus: "",
    listofMedicine: "",
  });
  //let result;

  const relogin = () => {
    setIsAuthenticated(false);
    setJwt("");
    setUserId("");
    localStorage.setItem("app_isAuth", "");
    localStorage.setItem("app_jwt", "");
    localStorage.setItem("app_userId", "");
    localStorage.setItem("app_userEmail", "");
    localStorage.setItem("userName", "");
    localStorage.setItem("userType", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("app_email", "");
    localStorage.setItem("app_userName", "");
    localStorage.setItem("patientName", "");
    localStorage.setItem("app_patient", "");

    window.location.assign("/login");
  };

  const checkLocalAuth = () => {
    const isAuth = localStorage.getItem("app_isAuth");
    const token = localStorage.getItem("app_jwt");
    const userId = localStorage.getItem("app_userId");

    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }
  };

  // useEffect(checkLocalAuth, []); // because not required on all the pages.

  // capture from login page.  'yasser.sheikh@laitkor.com'  'M2n1shlko@1'
  const login = (email, password, url) => {
    setShowLoader(true);
    axios
      .post(apiUrl + "/signin", { Username: email, Password: password })
      .then((response) => {
        if (response.data === "Incorrect username or password.") {
          alert("Incorrect username or password.");
          setShowLoader(false);
        } else {
          setJwt(response.data.idToken);
          setIsAuthenticated(true);
          setMessage("");
          setUserId(email);
          localStorage.setItem("app_isAuth", "yes");
          localStorage.setItem("app_jwt", response.data.idToken);
          localStorage.setItem("app_userId", email);
          localStorage.setItem("app_userEmail", email);
          // localStorage.setItem("userType", response[0].UserType.s);

          //  window.location.assign();

          userDetails(email, url);
        }
      });
  };

  const userDetails = (useremail, url = "") => {
    const token = localStorage.getItem("app_jwt");
    //let url ='';
    const data = {
      TableName: userTable,
      IndexName: "Email-Index",
      KeyConditionExpression: "Email = :v_Email",
      ExpressionAttributeValues: { ":v_Email": { S: useremail } },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // setJwt(response.data);
        const userData = response.data;
        setuserinfo(userData);
        //console.log('userData', userData);

        userData.forEach((p) => {
          localStorage.setItem("userName", p.UserName.s);
          localStorage.setItem("userType", p.UserType.s);
          localStorage.setItem("userId", p.SK.s);
          localStorage.setItem("userEmail", p.Email.s);
          if (p.Height !== undefined) {
            localStorage.setItem("height", p.Height.s);
          }
          if (p.weight !== undefined) {
            localStorage.setItem("weight", p.weight.s);
          }

          const pat = {
            userName: p.UserName ? p.UserName.s : "",
            userType: p.UserTpye ? p.UserType.s : "",
            userId: p.SK ? p.SK.s : "",
            userEmail: p.Email ? p.Email.s : "",
            height: p.Height ? p.Height.s : "",
            weight: p.weight ? p.weight.s : "",
            dob: p.DOB ? p.DOB.s : "",
            bmi: p.BMI ? p.BMI.s : "",
            phone: p.ContactNo ? p.ContactNo.s : "",
          };

          localStorage.setItem("app_patient", JSON.stringify(pat));

          if (p.UserType.s === "patient" && url) {
            if (pat.userName.includes("||0")) url = "profile";
            else url = "patient-profile/" + p.SK.s.split("_").pop();
          }
          if (p.UserType.s === "admin" && url) {
            if (pat.userName.includes("||0")) url = "profile";
            else url = "dashboard";
          }
        });

        const patientId = localStorage.getItem("userId");
        const username = localStorage.getItem("userName");

        setShowLoader(false);

        if (userData.length === 0) window.location.assign("profile");
        else if (url) window.location.assign(url);

        // if (userType === 'patient')
        // {
        //     window.location.assign(url);
        // }
        // else
        //     {
        //         window.location.assign('/dashboard');
        //     }
      });
  };

  const getdp = (d) => {
    const token = localStorage.getItem("app_jwt");

    setDpatient(...dpatient, d);
    console.log(dpatient);
  };
  console.log(dpatient);
  // capture from patient List page.
  const fetchPatientListfromApi = async (usertype, userId, AllActive) => {
    const token = localStorage.getItem("app_jwt");

    let data = "";

    if (usertype === "admin") {
      if (AllActive) {
        data = {
          TableName: userTable,
          ProjectionExpression:
            "PK,SK,UserId,UserName,Email,ContactNo,DOB,DoctorName,CarecoordinatorName,Coach,Height,reading,diastolic,systolic,weight,BMI,FirstName,LastName,Gender,Lang,Street,City,Zip,WorkPhone,MobilePhone,ActiveStatus, Notes",
          KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
          ExpressionAttributeValues: {
            ":v_PK": { S: "patient" },
            ":v_SK": { S: "PATIENT_" },
          },
        };
      } else {
        data = {
          TableName: userTable,
          ProjectionExpression:
            "PK,SK,UserId,UserName,Email,ContactNo,DOB,DoctorName,CarecoordinatorName,Coach,Height,reading,diastolic,systolic,weight,BMI,FirstName,LastName,Gender,Lang,Street,City,Zip,WorkPhone,MobilePhone,ActiveStatus,Notes",
          KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
          FilterExpression: "ActiveStatus = :v_status",
          ExpressionAttributeValues: {
            ":v_PK": { S: "patient" },
            ":v_SK": { S: "PATIENT_" },
            ":v_status": { S: "Active" },
          },
        };
      }
    }

    if (usertype === "doctor") {
      if (AllActive) {
        data = {
          TableName: userTable,
          ProjectionExpression:
            "PK,SK,UserId,UserName,Email,ContactNo,DOB,DoctorName,CarecoordinatorName,Coach,Height,reading,diastolic,systolic,weight,BMI,FirstName,LastName,Gender,Lang,Street,City,Zip,WorkPhone,MobilePhone,ActiveStatus,Notes",
          KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
          ExpressionAttributeValues: {
            ":v_PK": { S: "patient" },
            ":v_SK": { S: "PATIENT_" },
          },
        };
      } else {
        data = {
          TableName: userTable,
          IndexName: "Patient-Doctor-Device-Index",
          KeyConditionExpression: "GSI1PK = :v_PK AND GSI1SK =  :v_SK",
          FilterExpression: "ActiveStatus = :v_status",
          ExpressionAttributeValues: {
            ":v_PK": { S: "patient" },
            ":v_SK": { S: userId },
            ":v_status": { S: "Active" },
          },
        };
      }
    }

    if (usertype === "carecoordinator") {
      data = {
        TableName: userTable,
        ProjectionExpression:
          "PK,SK,UserId,UserName,Email,ContactNo,DOB,DoctorName,CarecoordinatorName,Coach,Height,reading,diastolic,systolic,weight,BMI,FirstName,LastName,Gender,Lang,Street,City,Zip,WorkPhone,MobilePhone,ActiveStatus,Notes",
        KeyConditionExpression: "PK = :v_PK ",
        FilterExpression:
          "ActiveStatus = :v_status AND CarecoordinatorId = :v_CarecoordinatorId",
        ExpressionAttributeValues: {
          ":v_PK": { S: "patient" },
          ":v_CarecoordinatorId": { S: userId },
          ":v_status": { S: "Active" },
        },
      };
    }
    if (usertype === "coach") {
      data = {
        TableName: userTable,
        ProjectionExpression:
          "PK,SK,UserId,UserName,Email,ContactNo,DOB,DoctorName,CarecoordinatorName,Coach,Height,reading,diastolic,systolic,weight,BMI,FirstName,LastName,Gender,Lang,Street,City,Zip,WorkPhone,MobilePhone,ActiveStatus,Notes",
        KeyConditionExpression: "PK = :v_PK ",
        FilterExpression: "ActiveStatus = :v_status AND CoachId = :v_CoachId",
        ExpressionAttributeValues: {
          ":v_PK": { S: "patient" },
          ":v_CoachId": { S: userId },
          ":v_status": { S: "Active" },
        },
      };
    }
    // if (usertype === "patient" && userName !==undefined) {
    //     data = {
    //         "TableName":userTable,
    //         "KeyConditionExpression":"PK = :v_PK AND begins_with(UserName, :v_UserName)",
    //         "FilterExpression":"ActiveStatus = :v_status",
    //         "ExpressionAttributeValues":{":v_PK":{"S":"patient"},":v_SK":{"S":userName},":v_status":{"S":"Active"}}
    //     }
    // }
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        ProjectionExpression:
          "PK,SK,UserId,UserName,Email,ContactNo,DOB,DoctorName,CarecoordinatorName,Coach,Height,reading,diastolic,systolic,weight,BMI,FirstName,LastName,Gender,Lang,Street,City,Zip,WorkPhone,MobilePhone,ActiveStatus,Notes",
        KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
        FilterExpression: "ActiveStatus = :v_status",
        ExpressionAttributeValues: {
          ":v_PK": { S: "patient" },
          ":v_SK": { S: "PATIENT_" + userId },
          ":v_status": { S: "Active" },
        },
      };
    }

    await axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // setJwt(response.data);
        //  console.log(response.data);
        const patients = response.data;
        // console.log("i need to check the patient",patients.length)
        const ps = [];
        if (patients.length === 0) {
          ps.push("No data found");
        }
        console.log("i need to check the patient", ps);

        patients.forEach((p, index) => {
          let patient = {};

          patient.id = index;

          patient.mobilePhone = "";
          patient.workPhone = "";

          //console.log("i need to check the patient", patient);
          if (p.UserId !== undefined) {
            patient.userId = p.UserId.n;
          }
          if (p.UserName !== undefined) {
            patient.name = p.UserName.s;
          }
          if (p.Email !== undefined) {
            patient.email = p.Email.s;
          }
          if (p.ContactNo !== undefined) {
            patient.mobile = p.ContactNo.s;
          }
          if (p.DOB !== undefined) {
            patient.dob = Moment(p.DOB.s).format("MMM-DD-YYYY");
          }
          if (p.DoctorName !== undefined) {
            patient.ProviderName = p.DoctorName.s;
          }
          if (p.CarecoordinatorName !== undefined) {
            patient.CareName = p.CarecoordinatorName.s;
          }
          if (p.Coach !== undefined) {
            patient.CoachName = p.Coach.s;
          }
          if (p.SK !== undefined) {
            patient.ehrId = p.SK.s;
          }
          patient.pid = window.btoa(p.SK.s);
          if (p.Height !== undefined) {
            (p.Height.s!=="undefined")?patient.height = p.Height.s:patient.height = ""
            
          }
          patient.pid = window.btoa(p.SK.s);

          if (p.reading !== undefined) {
            patient.bg_reading = p.reading.s;
          }
          if (p.diastolic !== undefined) {
            let num = p.diastolic.s;
            if (num === "") num = 0;
            patient.diastolic = parseFloat(num).toFixed(2);
          }
          if (p.systolic !== undefined) {
            let num = p.systolic.s;
            if (num === "") num = 0;
            patient.systolic = parseFloat(num).toFixed(2);
          }

          if (p.weight !== undefined) {
            let num = p.weight.s;
            if (num === "") num = 0;
            patient.Weight = parseFloat(num).toFixed(2);
          }
          if (p.BMI !== undefined) {
            let num1 = p.BMI.s;
            if (num1 === "") num1 = 0;
            if (parseFloat(num1) > 0) {
              if (parseFloat(num1).toFixed(2) < 18.5) {
                patient.BMI =
                  "Underweight" + " (" + parseFloat(num1).toFixed(2) + ")";
              }
              if (
                parseFloat(num1).toFixed(2) > 18.5 &&
                parseFloat(num1).toFixed(2) < 24.9
              ) {
                patient.BMI =
                  "Normal" + " (" + parseFloat(num1).toFixed(2) + ")";
              }
              if (
                parseFloat(num1).toFixed(2) > 25 &&
                parseFloat(num1).toFixed(2) < 29.9
              ) {
                patient.BMI =
                  "Overweight" + " (" + parseFloat(num1).toFixed(2) + ")";
              }
              if (parseFloat(num1).toFixed(2) > 30) {
                patient.BMI =
                  "Obese" + " (" + parseFloat(num1).toFixed(2) + ")";
              }
            }
          }

          if (p.ActiveStatus !== undefined) {
            patient.ActiveStatus = p.ActiveStatus.s;
          }

          if (p.FirstName !== undefined) {
            patient.firstName = p.FirstName.s;
          }

          if (p.LastName !== undefined) {
            patient.lastName = p.LastName.s;
          }

          // if firstname and lastname undefined then take name from name and put it.
          if (patient.name !== undefined) {
            patient.lastName = patient.name.split(",")[0];
            patient.firstName = patient.name.split(",")[1];
          }

          if (p.FirstName !== undefined && p.LastName !== undefined) {
            patient.name = p.LastName.s + "," + "  " + p.FirstName.s;
          }

          if (p.Gender !== undefined) {
            patient.gender = p.Gender.s;
          }
          if (p.Height !== undefined) {
            (p.Height.s!=="undefined")?patient.height = p.Height.s:patient.height = ""
          }else {
            patient.height = "";
          }

          if (p.Lang !== undefined) {
            patient.language = p.Lang.s;
          } else {
            patient.language = "";
          }

          if (p.Street !== undefined) {
            patient.street = p.Street.s;
          } else {
            patient.street = "";
          }

          if (p.City !== undefined) {
            patient.city = p.City.s;
          } else {
            patient.city = "";
          }

          if (p.Zip !== undefined) {
            patient.zip = p.Zip.s;
          } else {
            patient.zip = "";
          }

          if (p.WorkPhone !== undefined) {
            patient.workPhone = p.WorkPhone.s;
          } else {
            patient.workPhone = "";
          }

          if (p.MobilePhone !== undefined) {
            patient.mobilePhone = p.MobilePhone.s;
          } else {
            patient.mobilePhone = "";
          }

          if (p.Notes !== undefined) {
            patient.notes = p.Notes.s;
            console.log("Notes" + p.Notes.s);
          } else {
            patient.notes = "";
          }

          // if (patient.userId !== undefined && patient.name) {
          //     fetchDeviceData("PATIENT_"+patient.userId,patient.name, 'patient','', patient);
          // }
          ps.push(patient);
        });

        setPatients(ps);
      })
      .catch(() => {
        relogin();
      });
  };

  const renderLoader = () => {
    if (showLoader)
      return (
        <span>
          <img src={loader} alt="" />
        </span>
      );
    else return <span></span>;
  };

  const fetchThreadMessages = (filter, mobilePhone) => {
    axios
      .get("threads", { params: { filter, mobilePhone } })
      .then((response) => {
        setThreads(response.data.messages);
        //  console.log('messages', response.data.messages);
      });
  };

  const fetchBgData = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let data = "";
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        KeyConditionExpression: "GSI1PK = :v_PK",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_GSI1SK": { S: "DEVICE_BG_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // setJwt(response.data);
        console.log("bgData", response.data);
        const bgData = response.data;
        const dataSetbg = [];

        bgData.forEach((p) => {
          let bgdata = {};
          let meal = "";
          bgdata.TimeSlots = p.TimeSlots.s;
          bgdata.daterecorded = p.date_recorded.s;
          if (p.before_meal.bool === true) {
            meal = "Before Meal";
          } else {
            meal = "After Meal";
          }
          bgdata.meal = meal;

          dataSetbg.push(bgdata);
        });

        setbgData(dataSetbg);
      });
  };

  const fetchWSData = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        KeyConditionExpression: "GSI1PK = :v_PK",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "ActiveStatus <> :v_ActiveStatus AND GSI1PK IN (:v_GSI1PK1, :v_GSI1PK2)",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
          ":v_GSI1PK1": { S: "DEVICE_WS_PATIENT_121524123727622" },
          ":v_GSI1PK2": { S: "DEVICE_WS_PATIENT_1627230254837" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const weightData = response.data;
        const dataSetwt = [];
        if (weightData.length === 0) {
          dataSetwt.push("no data found");
        }

        weightData.forEach((wt, index) => {
          //   console.log('p' + index, bg);
          let wtdata = {};
          wtdata.id = index;
          if (wt.GSI1PK !== undefined) {
            wtdata.gSI1PK = wt.GSI1PK.s;
            wtdata.userId = wt.GSI1PK.s.split("_").pop();
          }
          if (wt.UserName !== undefined) {
            wtdata.UserName = wt.UserName.s;
          }

          if (wt.SK !== undefined) {
            wtdata.readingId = wt.SK.s.split("_").pop();
          }
          if (wt.DeviceId !== undefined) {
            wtdata.DeviceId = wt.DeviceId.s;
          }
          if (wt.weight !== undefined) {
            wtdata.weight = parseFloat(wt.weight.n).toFixed(2);
          }
          if (wt.TimeSlots !== undefined) {
            wtdata.timeSlots = wt.TimeSlots.s;
          }
          if (wt.MeasurementDateTime !== undefined) {
            wtdata.MeasurementDateTime = wt.MeasurementDateTime.s;
            wtdata.MeasurementDateTime = new Date(wtdata.MeasurementDateTime);
            wtdata.sortDateColumn = wt.MeasurementDateTime.s;
            // wtdata.MeasurementDateTime =Moment(wtdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm:ss A');
          }
          if (wt.CreatedDate !== undefined) {
            wtdata.CreatedDate = wt.CreatedDate.s;
            wtdata.CreatedDate = new Date(wtdata.CreatedDate);
            //wtdata.CreatedDate =Moment(wtdata.CreatedDate).format('MMM-DD-YYYY hh:mm:ss A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (wt.reading_id !== undefined) {
            wtdata.reading_id = wt.reading_id.n;
          }
          wtdata.actionTaken = wt.ActionTaken.s;

          dataSetwt.push(wtdata);
        });

        setweightData(dataSetwt);
      });
  };

  const fetchThresold = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");

    let data = "";
    data = {
      TableName: userTable,
      ProjectionExpression: "PK,SK,Low,High,TElements",
      KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
      ExpressionAttributeValues: {
        ":v_PK": { S: "THRESHOLDRANGE_ADMIN" },
        ":v_SK": { S: userid },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const thresholdData = response.data;

        const dataSetthresold = [];
        {
          thresholdData.forEach((th, index) => {
            // console.log("p" + index, th);
            const thdata = {};

            if (th.TElements) {
              thdata.Element_value = th.TElements.s;
            }
            if (th.Low) {
              th.Low_value = th.Low.s;
            }
            if (th.High) {
              th.High_value = th.High.s;
            }

            if (thdata.Element_value === "Blood Glucose") {
              thdata.bg_low = th.Low_value;
              thdata.bg_high = th.High_value;
            } else if (thdata.Element_value === "SYSTOLIC") {
              thdata.systolic_low = th.Low_value;
              thdata.systolic_high = th.High_value;
            } else if (thdata.Element_value === "DIASTOLIC") {
              thdata.diastolic_low = th.Low_value;
              thdata.diastolic_high = th.High_value;
            } else if (thdata.Element_value === "BMI") {
              thdata.bmi_low = th.Low_value;
              thdata.bmi_high = th.High_value;
            } else if (thdata.Element_value === "Weight") {
              thdata.weight_low = th.Low_value;
              thdata.weight_high = th.High_value;
            }

            dataSetthresold.push(thdata);
          });
        }
        if (usertype === "admin") {
          setadminthresold(dataSetthresold);
        }
        setThresoldData(dataSetthresold);
      });
  };
  const fetchadminThresold = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");

    let data = "";
    data = {
      TableName: userTable,
      ProjectionExpression: "PK,SK,Low,High,TElements",
      KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
      ExpressionAttributeValues: {
        ":v_PK": { S: "THRESHOLDRANGE_ADMIN" },
        ":v_SK": { S: userid },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const thresholdData = response.data;

        const dataSetthresold = [];
        {
          thresholdData.forEach((th, index) => {
            // console.log("p" + index, th);
            let thdata = {};

            if (th.TElements) {
              thdata.Element_value = th.TElements.s;
            }
            if (th.Low) {
              th.Low_value = th.Low.s;
            }
            if (th.High) {
              th.High_value = th.High.s;
            }

            if (thdata.Element_value === "Blood Glucose") {
              thdata.bg_low = th.Low_value;
              thdata.bg_high = th.High_value;
            } else if (thdata.Element_value === "SYSTOLIC") {
              thdata.systolic_low = th.Low_value;
              thdata.systolic_high = th.High_value;
            } else if (thdata.Element_value === "DIASTOLIC") {
              thdata.diastolic_low = th.Low_value;
              thdata.diastolic_high = th.High_value;
            } else if (thdata.Element_value === "BMI") {
              thdata.bmi_low = th.Low_value;
              thdata.bmi_high = th.High_value;
            } else if (thdata.Element_value === "Weight") {
              thdata.weight_low = th.Low_value;
              thdata.weight_high = th.High_value;
            }

            dataSetthresold.push(thdata);
          });
        }

        setadminthresold(dataSetthresold);
      });
  };

  const fetchTimeLog = (userid) => {
    const token = localStorage.getItem("app_jwt");

    let data = "";
    data = {
      TableName: userTable,
      KeyConditionExpression: "PK = :v_PK",
      FilterExpression: "GSI1PK = :v_GSI1PK AND ActiveStatus = :v_status",
      ExpressionAttributeValues: {
        ":v_PK": { S: "TIMELOG_READING" },
        ":v_GSI1PK": { S: "TIMELOG_READING_" + userid },
        ":v_status": { S: "Active" },
      },
    };
    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const timelogData = response.data;
        console.log("timelogData data", response.data);
        const dataSettimeLog = [];

        timelogData.forEach((tl, index) => {
          console.log("p" + index, tl);
          let tldata = {};
          tldata.id = index;
          if (tl.SK) {
            tldata.SK = tl.SK.s;
          }

          if (tl.TaskType) {
            tldata.taskType = tl.TaskType.s;
          }
          if (tl.PerformedBy) {
            tldata.performedBy = tl.PerformedBy.s;
          }
          if (tl.PerformedOn) {
            tldata.performedOn = tl.PerformedOn.s;
          }
          if (tl.StartDT) {
            tldata.startDT = tl.StartDT.s;
          }
          if (tl.EndDT) {
            tldata.endDT = tl.EndDT.s;
          }
          if (tl.TimeAmount) {
            tldata.timeAmount = tl.TimeAmount.s;
          }
          if (tl.UserName) {
            tldata.UserName = tl.UserName.s;
          }

          dataSettimeLog.push(tldata);
        });

        setTimeLogData(dataSettimeLog);

        console.log("timeLogData", dataSettimeLog);
      });
  };

  const fetchAllTimeLog = () => {
    const token = localStorage.getItem("app_jwt");
    let data = "";
    data = {
      TableName: userTable,
      KeyConditionExpression: "PK = :v_PK",
      ExpressionAttributeValues: {
        ":v_PK": { S: "TIMELOG_READING" },
      },
    };
    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const timelogData = response.data;
        console.log("timelogData data", response.data);
        const dataSettimeLog = [];

        timelogData.forEach((tl, index) => {
          console.log("p" + index, tl);
          let tldata = {};

          if (tl.TaskType) {
            tldata.taskType = tl.TaskType.s;
          }
          if (tl.PerformedBy) {
            tldata.performedBy = tl.PerformedBy.s;
          }
          if (tl.PerformedOn) {
            tldata.performedOn = tl.PerformedOn.s;
          }
          if (tl.StartDT) {
            tldata.startDT = tl.StartDT.s;
          }
          if (tl.EndDT) {
            tldata.endDT = tl.EndDT.s;
          }
          if (tl.TimeAmount) {
            tldata.timeAmount = tl.TimeAmount.s;
          }
          if (tl.UserName) {
            tldata.UserName = tl.UserName.s;
          }
          if (tl.GSI1SK) {
            tldata.UserId = tl.GSI1SK.s;
          }
          dataSettimeLog.push(tldata);
        });

        setAllTimeLogData(dataSettimeLog);

        console.log("timeLogData", dataSettimeLog);
      });
  };

  const addDevice = (deviceType, deviceId, patientId) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const doctorId = "";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const SK1 = "DEVICE_" + deviceType + "_" + deviceId;

    if (deviceType == "" || deviceType == null) {
      alert("please select device");
      return;
    }

    if (deviceId == "" || deviceId == null) {
      alert("please enter device id");
      return;
    }

    const data = JSON.stringify({
      PK: "patient",
      SK: SK1,
      DeviceId: deviceId,
      DeviceStatus: "Active",
      CreatedDate:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      DeviceType: deviceType,
      GSI1PK: "PATIENT_" + patientId,
      GSI1SK: doctorId,
    });

    axios
      .post(
        apiUrl +
          "/DynamoDbAPIs/PutItem?jsonData=" +
          data +
          "&tableName=" +
          userTable +
          "&actionType=register",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data === "Registered") {
          
          swal("success", "Device Inserted Successfully.", "success");
        }
      });
  };

  const UpdateThreshold = (patient, type, high, low, userType) => {
    // fetch Threshold.
    const token = localStorage.getItem("app_jwt");

    let data = "";
    data = {
      TableName: userTable,
      ProjectionExpression: "PK,SK,Low,High,TElements",
      KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
      ExpressionAttributeValues: {
        ":v_PK": { S: "THRESHOLDRANGE_ADMIN" },
        ":v_SK": { S: patient },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const thresholdData = response.data;
        if (thresholdData.length > 0) {
          UpdateTh(patient, type, high, low, userType);
        } else {
          AddThreshold(patient, type, high, low, userType);
        }
      });
    //Update
  };

  const UpdateTh = (patient, type, high, low, userType) => {
    const token = localStorage.getItem("app_jwt");

    let _type = "";
    if (type.toString().toUpperCase().trim() == "BG") _type = "Blood Glucose";
    if (type.toString().toUpperCase().trim() == "SYSTOLIC") _type = "SYSTOLIC";
    if (type.toString().toUpperCase().trim() == "DIASTOLIC")
      _type = "DIASTOLIC";
    if (type.toString().toUpperCase().trim() == "BMI") _type = "BMI";
    if (type.toString().toUpperCase().trim() == "WS") _type = "Weight";
    const data = {
      TableName: userTable,
      Key: {
        PK: { S: "THRESHOLDRANGE_ADMIN" },
        SK: { S: patient + "_" + type },
      },
      UpdateExpression:
        "SET Low = :v_Low , High = :v_High,  TElements = :v_TElements",
      ExpressionAttributeValues: {
        ":v_Low": { S: low },
        ":v_High": { S: high },
        ":v_TElements": { S: _type },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          swal("success", "Threshold Update Successfully.", "success");
          //alert("Threshold Update Successfully.");
        } else {
          swal("error", "Threshold did not Update.", "error");
          // alert("");
        }
      });
  };

  const AddThreshold = (patient, type, high, low, userType) => {
    const token = localStorage.getItem("app_jwt");

    let _type = "";
    if (type.toString().toUpperCase().trim() == "BG") _type = "Blood Glucose";
    if (type.toString().toUpperCase().trim() == "SYSTOLIC") _type = "SYSTOLIC";
    if (type.toString().toUpperCase().trim() == "DIASTOLIC")
      _type = "DIASTOLIC";
    if (type.toString().toUpperCase().trim() == "BMI") _type = "BMI";
    if (type.toString().toUpperCase().trim() == "WS") _type = "Weight";

    const data = JSON.stringify({
      PK: "THRESHOLDRANGE_ADMIN",
      SK: patient + "_" + type,
      Low: low,
      High: high,
      TElements: _type,
    });

    axios
      .post(
        apiUrl +
          "/DynamoDbAPIs/putitem?jsonData=" +
          data +
          "&tableName=" +
          userTable +
          "&actionType=register",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data === "Registered") {
          alert("Threshold Update Successfully.");
        } else {
        }
      });
  };

  const UpdateProfie = (userName, email, phone, dob, height, weight, bmi) => {
    const userid = localStorage.getItem("userId");
    const token = localStorage.getItem("app_jwt");
    let userType = localStorage.getItem("userType");
    if (userType === "") userType = "patient";
    const data = {
      TableName: userTable,
      Key: {
        PK: { S: userType },
        SK: { S: userid },
      },
      UpdateExpression:
        "SET ProfileImage = :v_ProfileImage ,UserName = :v_UserName , ContactNo = :v_ContactNo , DOB =:v_DOB , Height=:v_Height , weight=:v_weight ,UserTimeZone = :v_TimeZone,BMI= :v_BMI",
      ExpressionAttributeValues: {
        ":v_UserName": { S: userName },
        ":v_ContactNo": { S: phone },
        ":v_DOB": { S: dob },
        ":v_Height": { S: height },
        ":v_weight": { S: weight },
        ":v_ProfileImage": { S: "" },
        ":v_TimeZone": { S: "" },
        ":v_BMI": { S: bmi },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data === "Updated") {
          //alert("Record Updated Successfully.");
          swal("success", "Record Updated Successfully.", "success");
          userDetails(email, "");
        }
      });
  };

  const fetchNameFromId = (id, array) => {
    const ent = array.filter((a) => a.value === id);
    return ent[0];
  };

  const UpdatePatient = (
    fname,
    lname,
    phone,
    birthDate,
    height,
    provider,
    coordinator,
    coach,
    patientId,
    gender,
    language,
    workPhone,
    mobilePhone,
    street,
    zip,
    city,
    state,
    notes
  ) => {
    console.log(gender, "check gender");
    console.log(fname, "fname");
    const token = localStorage.getItem("app_jwt");

    var providervalue = providerOptions.filter(
      (p) => p.name == "Select Provider"
    )[0];
    providervalue.value = "";
    var ccvalue = careCoordinatorOptions.filter(
      (p) => p.name == "Select Coordinator"
    )[0];
    ccvalue.value = "";
    var coachvalue = coachOptions.filter((p) => p.name == "Select Coach")[0];
    coachvalue.value = "";

    if (coordinator == "") coordinator = ccvalue.value;
    if (provider == "") provider = providervalue.value;
    if (coach == "") coach = coachvalue.value;

    let providername = fetchNameFromId(provider, providerOptions);
    let carecoordinatorname = fetchNameFromId(
      coordinator,
      careCoordinatorOptions
    );
    let coachname = fetchNameFromId(coach, coachOptions);

    let gendervalue = "";
    console.log(gender, "check gender for number");
    if (gender == 1) {
      console.log("female here");
      gendervalue = "Female";
    }
    if (gender == 0) {
      console.log("male here");
      gendervalue = "Male";
    }
    console.log(gendervalue, "gendervalue");

    let languagevalue = "";
    if (language == 0) {
      languagevalue = "English";
      console.log("english here");
    }
    if (language == 1) {
      languagevalue = "Spanish";
      console.log("spanish here");
    }
    if (fname === undefined) fname = "";
    if (lname === undefined) lname = "";

    const data = {
      TableName: userTable,
      Key: {
        PK: { S: "patient" },
        SK: { S: "PATIENT_" + patientId },
      },
      UpdateExpression:
        "SET DoctorId = :v_ProviderId, DoctorName = :v_ProviderName, FirstName = :v_firstname,LastName = :v_lastname, ContactNo = :v_mobile, DOB = :v_DOB," +
        "Height = :v_Height,CarecoordinatorName = :v_CarecoordinatorName, CarecoordinatorId = :v_CarecoordinatorId,CoachId = :v_CoachId,Coach = :v_CoachName," +
        "Gender = :v_Gender, Lang = :v_Language, WorkPhone = :v_WorkPhone, MobilePhone = :v_MobilePhone, Street = :v_Street," +
        "Zip = :v_Zip, City = :v_City, St = :v_State, Notes = :v_Notes",
      ExpressionAttributeValues: {
        ":v_ProviderId": { S: "" + providername.value + "" },
        ":v_ProviderName": { S: "" + providername.name + "" },
        ":v_firstname": { S: fname },
        ":v_lastname": { S: lname },
        ":v_mobile": { S: phone },
        ":v_DOB": { S: "" + birthDate + "" },
        ":v_Height": { S: "" + height + "" },
        ":v_CarecoordinatorId": { S: "" + carecoordinatorname.value + "" },
        ":v_CoachId": { S: "" + coachname.value + "" },
        ":v_CarecoordinatorName": { S: "" + carecoordinatorname.name + "" },
        ":v_CoachName": { S: "" + coachname.name + "" },
        ":v_Gender": { S: "" + gendervalue + "" },
        ":v_Language": { S: "" + languagevalue + "" },
        ":v_WorkPhone": { S: "" + workPhone + "" },
        ":v_MobilePhone": { S: "" + mobilePhone + "" },
        ":v_Street": { S: "" + street + "" },
        ":v_Zip": { S: "" + zip + "" },
        ":v_City": { S: "" + city + "" },
        ":v_State": { S: "" + state + "" },
        ":v_Notes": { S: "" + notes + "" },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, /",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          // alert("");
          swal("success", "Patient data Update Successfully.", "success");

          // updating object
          //fetchPatientListfromApi();
          console.log(patients, "patients data here");
          let patinet = patients.filter((p) => p.userId == patientId)[0];
          if (patinet == undefined) return;
          patinet.height = height;
          patinet.firstname = fname;
          patinet.lastname = lname;
          patinet.phone = phone;
          patinet.birthDate = birthDate;
          patinet.phone = phone;
          patinet.provider = provider;
          patinet.coordinator = coordinator;
          patinet.coach = coach;
          patient.notes = notes;
          // updating object
        } else {
          //alert("Patient data did not Update  Successfully.");
          swal("error", "Patient data did not Update  Successfully.", "error");
        }
      });
  };

  const updateChat=(patientId,message)=>{
    const token = localStorage.getItem("app_jwt");
    let type="";
    (patientId.includes("DOCTOR"))?type="doctor":type="patient"
    const data = {
      TableName: userTable,
      Key: {
        PK: { S: type },
        SK: { S: "PATIENT_" + patientId },
      },
      UpdateExpression:
        "SET SendMessage = :v_SendMessage",
        ExpressionAttributeValues: {
         
          ":v_SendMessage": { S: "" + message + "" },
        },
      };
  
      axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, /",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data)
      
    });


  }
  const updateChat2=(patientId,message)=>{
    const token = localStorage.getItem("app_jwt");
    let type="";
    (patientId.includes("DOCTOR"))?type="doctor":type="patient"
    const data = {
      TableName: userTable,
      Key: {
        PK: { S: type },
        SK: { S: patientId },
      },
      UpdateExpression:
        "SET ReceiveMessage = :v_ReceiveMessage",
        ExpressionAttributeValues: {
         
          ":v_ReceiveMessage": { S: message },
        },
      };
  
      axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, /",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("sahio",response.data)
      
    });


  }
  // const updateChat2 = (
    
  //   patientId,
  //  message
  // ) => {
  //   const token = localStorage.getItem("app_jwt");
  //       const data = JSON.stringify({
  //         id:patientId,
      
  //     PK: "doctor",
  //     SK: "4",
    
  //     GotMessage: message,
  //   });

  //   axios
  //     .post(
  //       apiUrl +
  //         "/DynamoDbAPIs/PutItem?jsonData=" +
  //         data +
  //         "&tableName=" +
  //         userTable +
  //         "&actionType=register",
  //       {
  //         headers: {
  //           Accept: "application/json, text/plain, */*",
  //           // "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data === "Registered") {
  //         console.log("asd",response.data);
  //         swal("success", "chat successfully", "success");
  //       }
  //     });
  // };
  const fetchchat = (patientId) => {
    const token = localStorage.getItem("app_jwt");

    let data = {
      TableName: userTable,
      KeyConditionExpression: "PK =:v_PK AND SK = :v_SK",
      ExpressionAttributeValues: {
        ":v_PK": { S: "doctor" },
        ":v_SK": { S: patientId },
      },
    };
    
    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("check response of cgat",response.data)
       {(patientId.includes("DOCTOR"))? setmessage1(response.data[0].ReceiveMessage.s):setmessage1("")}
        
  })
}
  

  const AssignCareTeam = (provider, coordinator, coach, patientId) => {
    const token = localStorage.getItem("app_jwt");
    let providername = fetchNameFromId(provider, providerOptions);
    let carecoordinatorname = fetchNameFromId(
      coordinator,
      careCoordinatorOptions
    );
    let coachname = fetchNameFromId(coach, coachOptions);
    const data = {
      TableName: userTable,
      Key: {
        SK: { S: "PATIENT_" + patientId },
        PK: { S: "patient" },
      },
      UpdateExpression:
        "SET GSI1SK = :v_GSI1SK, GSI1PK = :v_GSI1PK,DoctorName = :v_DoctorName,CarecoordinatorName = :v_CareCoordinatorName,CarecoordinatorId = :v_CarecoordinatorId,Coach = :v_CoachName,CoachId = :v_CoachId ",
      ExpressionAttributeValues: {
        ":v_GSI1SK": { S: "" + providername.value + "" },
        ":v_GSI1PK": { S: "patient" },
        ":v_DoctorName": { S: providername.name },
        ":v_CareCoordinatorName": { S: carecoordinatorname.name },
        ":v_CarecoordinatorId": { S: carecoordinatorname.value },
        ":v_CoachName": { S: coachname.name },
        ":v_CoachId": { S: coachname.value },
      },
    };

    if (providername.value === "") {
      alert("Please select provider.");
      return;
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          //alert("");
          swal("success", "Data update Successfully.", "success");
        } else {
          console.log(response);
          // alert("");
          swal("error", "Data did did not Update  Successfully.", "error");
        }
      });
  };

  const UpdateProvider = (username, mobile, email, patientId) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        SK: { S: patientId },
        PK: { S: "doctor" },
      },
      UpdateExpression: "SET UserName = :v_username, ContactNo = :v_mobile",
      ExpressionAttributeValues: {
        ":v_username": { S: "" + username + "" },
        ":v_mobile": { S: "" + mobile + "" },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          alert("Provider data Update Successfully.");
        } else {
          alert("Patient data did not Update  Successfully.");
        }
      });
  };

  const UpdateCareCoordinator = (username, mobile, email, patientId) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        SK: { S: patientId },
        PK: { S: "carecoordinator" },
      },
      UpdateExpression: "SET UserName = :v_username, ContactNo = :v_mobile",
      ExpressionAttributeValues: {
        ":v_username": { S: "" + username + "" },
        ":v_mobile": { S: "" + mobile + "" },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          alert("Care Coordinator Update Successfully.");
        } else {
          alert("Patient data did not Update  Successfully.");
        }
      });
  };

  const UpdateCoach = (username, mobile, email, patientId) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        SK: { S: patientId },
        PK: { S: "coach" },
      },
      UpdateExpression: "SET UserName = :v_username, ContactNo = :v_mobile",
      ExpressionAttributeValues: {
        ":v_username": { S: "" + username + "" },
        ":v_mobile": { S: "" + mobile + "" },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          alert("Coach Update Successfully.");
        } else {
          alert("Patient data did not Update  Successfully.");
        }
      });
  };

  const DeletePatient = (patientId) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        SK: { S: "PATIENT_" + patientId },
        PK: { S: "patient" },
      },
      UpdateExpression: "SET ActiveStatus = :v_ActiveStatus",
      ExpressionAttributeValues: { ":v_ActiveStatus": { S: "Deactive" } },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          swal("success", "Patient Deleted Successfully.", "success");
        }
      });
  };

  const DeleteTimeLog = (timelog) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        PK: { S: "TIMELOG_READING" },
        SK: { S: timelog.SK },
      },
      UpdateExpression: "SET ActiveStatus = :v_ActiveStatus",
      ExpressionAttributeValues: { ":v_ActiveStatus": { S: "Deactive" } },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          // alert("1 Entry of TimeLog Deleted Successfully.");
          swal(
            "success",
            "One Entry of TimeLog Deleted Successfully.",
            "success"
          );
        }
      });
  };

  const DeleteCareTeam = (patientId, careTeamType, careTeamTypeMsg) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        SK: { S: "" + patientId + "" },
        PK: { S: careTeamType },
      },
      UpdateExpression: "SET ActiveStatus = :v_ActiveStatus",
      ExpressionAttributeValues: { ":v_ActiveStatus": { S: "Deactive" } },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          alert(careTeamTypeMsg + " Deleted Successfully.");
        }
      });
  };
  const DeleteDeviceData = (id) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        SK: { S: "" + id + "" },
        PK: { S: "patient" },
      },
      UpdateExpression: "SET DeviceStatus = :v_ActiveStatus",
      ExpressionAttributeValues: { ":v_ActiveStatus": { S: "Deactive" } },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          // alert("");
          swal("success", "Device Deleted Successfully.", "success");
        } else {
          swal("error", "Server Error", "error");
        }
      });
  };

  const verifyProviderVerificationCode = (
    code,
    userName,
    careTeamType,
    url = ""
  ) => {
    const token = localStorage.getItem("app_jwt");
    console.log(code, userName);
    const data = {
      Username: userName,
      code: code,
    };

    axios
      .post(apiUrl + "/confirmsignup", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "User Confirmed") {
          alert("Record added successfully...");
          handleProviderModalClose();
          handlePatientConfirmationModalClose();
          let rf = resetForm + 1;
          setResetForm(rf);

          if (url) window.location.assign(url);
        }
      });
  };

  const addProvider = (name, email, phone, password) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      UserName: email,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Registered") {
          const data = JSON.stringify({
            PK: "doctor",
            SK: "DOCTOR_" + id, //"doctor",
            UserId: id,
            UserName: name,
            Email: email,
            ContactNo: phone,
            UserType: "doctor",
            CreatedDate: date,
            ActiveStatus: "Active",
            GSI1PK: "NotAssign",
            GSI1SK: "DOCTOR_" + id,
          });

          axios
            .post(
              apiUrl +
                "/DynamoDbAPIs/putitem?jsonData=" +
                data +
                "&tableName=" +
                userTable +
                "&actionType=register",
              {
                headers: {
                  Accept: "application/json, text/plain, */*",
                  // "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((putresponse) => {
              console.log(putresponse.status);
              if (putresponse.status === 200) {
                alert("Verification code sent to your email " + email);
                handleProviderModalShow();
                //window.location.replace('confirm-user-screen.html?username='+useremail);
              } else {
                console.log(putresponse);
              }
            });
        } else {
          alert(response.data);
        }
      });
  };

  const Registration = (
    username,
    firstname,
    middleName,
    lastname,
    email,
    phone,
    password,
    dob,
    gender,
    language,
    workPhone,
    mobilePhone,
    street,
    zip,
    city,
    state,
    pcm,
    pp
  ) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      Username: username,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Registered") {
          const data = JSON.stringify({
            PK: "patient",
            SK: "PATIENT_" + id, //"doctor",
            UserId: id,
            UserName: username,
            Email: email,
            ContactNo: phone,
            DOB: dob,
            UserType: "patient",
            CreatedDate: date,
            FirstName: firstname,
            MiddleName: middleName,
            LastName: lastname,
            ActiveStatus: "Active",
            Gender: gender,
            Lang: language,
            WorkPhone: workPhone,
            MobilePhone: mobilePhone,
            Street: street,
            Zip: zip,
            City: city,
            St: state,
          });

          axios
            .post(
              apiUrl +
                "/DynamoDbAPIs/putitem?jsonData=" +
                data +
                "&tableName=" +
                userTable +
                "&actionType=register",
              {
                headers: {
                  Accept: "application/json, text/plain, */*",
                  // "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((putresponse) => {
              console.log(putresponse.status);
              if (putresponse.status === 200) {
                alert("Verification code sent to your email " + email);
                handlePatientConfirmationModalShow();

                //window.location.replace('confirm-user-screen.html?username='+useremail);
              } else {
                console.log(putresponse);
              }
            });
        } else {
          if (response.data == "User already exists")
            response.data = "Email already exists";
          alert(response.data);
        }
      });
  };

  const addCareCoordinator = (name, email, phone, password) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      Username: email,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Registered") {
          const data = JSON.stringify({
            PK: "carecoordinator",
            SK: "CARECOORDINATOR_" + id, //"doctor",
            UserId: id,
            UserName: name,
            Email: email,
            ContactNo: phone,
            UserType: "carecoordinator",
            CreatedDate: date,
            ActiveStatus: "Active",
            GSI1PK: "NotAssign",
            GSI1SK: "CARECOORDINATOR_" + id,
          });

          axios
            .post(
              apiUrl +
                "/DynamoDbAPIs/putitem?jsonData=" +
                data +
                "&tableName=" +
                userTable +
                "&actionType=register",
              {
                headers: {
                  Accept: "application/json, text/plain, */*",
                  // "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((putresponse) => {
              console.log(putresponse.status);
              if (putresponse.status === 200) {
                alert("Verification code sent to your email " + email);
                handleProviderModalShow();
                //window.location.replace('confirm-user-screen.html?username='+useremail);
              } else {
                console.log(putresponse);
              }
            });
        } else {
          alert(response.data);
        }
      });
  };

  const addCoach = (name, email, phone, password) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      Username: email,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Registered") {
          const data = JSON.stringify({
            PK: "coach",
            SK: "COACH_" + id, //"doctor",
            UserId: id,
            UserName: name,
            Email: email,
            ContactNo: phone,
            UserType: "coach",
            CreatedDate: date,
            ActiveStatus: "Active",
            GSI1PK: "NotAssign",
            GSI1SK: "COACH_" + id,
          });

          axios
            .post(
              apiUrl +
                "/DynamoDbAPIs/putitem?jsonData=" +
                data +
                "&tableName=" +
                userTable +
                "&actionType=register",
              {
                headers: {
                  Accept: "application/json, text/plain, */*",
                  // "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((putresponse) => {
              console.log(putresponse.status);
              if (putresponse.status === 200) {
                alert("Verification code sent to your email " + email);
                handleProviderModalShow();
                //window.location.replace('confirm-user-screen.html?username='+useremail);
              } else {
                console.log(putresponse);
              }
            });
        } else {
          alert(response.data);
        }
      });
  };

  const fetchDeviceData = (patientId, username, usertype, type, patient) => {
    const token = localStorage.getItem("app_jwt");

    let data = {
      TableName: userTable,
      KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
      FilterExpression: "DeviceStatus = :v_status AND GSI1PK = :v_GSI1PK",
      ExpressionAttributeValues: {
        ":v_PK": { S: "patient" },
        ":v_SK": { S: "DEVICE_" },
        ":v_status": { S: "Active" },
        ":v_GSI1PK": { S: patientId },
      },
    };
    if (usertype === "admin" || usertype === "doctor") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
        FilterExpression:
          "DeviceStatus = :v_status AND DeviceId <> :v_deviceId",
        ExpressionAttributeValues: {
          ":v_PK": { S: "patient" },
          ":v_SK": { S: "DEVICE_" },
          ":v_status": { S: "Active" },
          ":v_deviceId": { S: "Null" },
        },
      };
    }
    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const deviceData = response.data;
        const dataSetdevice = [];
        let deviceType = "";
        if (deviceData.length === 0) {
          dataSetdevice.push("no device found");
        }

        //    console.log('deviceData', deviceData);
        deviceData.forEach((p, index) => {
          let devicedata = {};
          devicedata.id = index;

          if (p.DeviceId != undefined) {
            devicedata.deviceID = p.DeviceId.s;
          }
          if (p.DeviceType != undefined) {
            devicedata.DeviceType = p.DeviceType.s;
          }
          if (p.GSI1PK != undefined) {
            devicedata.patientId = p.GSI1PK.s;
          }
          if (p.SK !== undefined) {
            devicedata.id = p.SK.s;

            if (patients.length > 0) {
              let patient = patients.filter(
                (p) => p.ehrId === devicedata.patientId
              );
              if (patient.length > 0) devicedata.username = patient[0].name;
            } else {
              devicedata.username = username;
            }
          }

          if (devicedata.username !== undefined) dataSetdevice.push(devicedata);
        });

        if (dataSetdevice[0] !== "no device found") {
          setdeviceData(dataSetdevice);
        }

        if (type == "Weight") {
          fetchWSData(patientId, username, usertype, dataSetdevice);
        }
        if (type == "Blood Pressure") {
          fetchBloodPressure(patientId, username, usertype, dataSetdevice);
        }
        if (type == "Blood Glucose") {
        }
      });
  };

  const fetchProviders = (isactive) => {
    const token = localStorage.getItem("app_jwt");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let data = "";
    if (!isactive) {
      data = {
        TableName: userTable,
        ProjectionExpression: "PK,SK,UserName,Email,ContactNo,ActiveStatus",
        KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
        FilterExpression: "ActiveStatus = :v_status",
        ExpressionAttributeValues: {
          ":v_PK": { S: "doctor" },
          ":v_SK": { S: "DOCTOR_" },
          ":v_status": { S: "Active" },
        },

        // "ExpressionAttributeValues": {
        //     ":v_PK": { "S": "doctor" },
        //     ":v_SK": { "S": "DOCTOR_" },
        //     ":v_status": { "S": "Active" }
        // }
      };
    } else {
      data = {
        TableName: userTable,
        ProjectionExpression: "PK,SK,UserName,Email,ContactNo,ActiveStatus",
        KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
        //FilterExpression: "ActiveStatus = :v_status",
        ExpressionAttributeValues: {
          ":v_PK": { S: "doctor" },
          ":v_SK": { S: "DOCTOR_" },
          //":v_status": { S: "Active" },
        },

        // "ExpressionAttributeValues": {
        //     ":v_PK": { "S": "doctor" },
        //     ":v_SK": { "S": "DOCTOR_" },
        //     ":v_status": { "S": "Active" }
        // }
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const providerData = response.data;
        console.log("dsjdsjsdjfjsfs", response.data);
        const dataSetdoctor = [];
        const pOptions = [{ value: "", name: "Select Provider" }];

        providerData.forEach((p, index) => {
          console.log("p" + index, p);
          let providerdata = {};
          providerdata.id = index;
          providerdata.provider = p.UserName.s;
          providerdata.email = p.Email.s;
          providerdata.phone = p.ContactNo.s;
          if (p.ActiveStatus !== undefined) {
            providerdata.ActiveStatus = p.ActiveStatus.s;
          }

          if (p.SK !== undefined) {
            providerdata.doctor_id = p.SK.s;
          }

          dataSetdoctor.push(providerdata);
          pOptions.push({ value: p.SK.s, name: p.UserName.s });
        });

        setdoctorData(dataSetdoctor);
        setProviderOptions(pOptions);
      })
      .catch(() => {
        relogin();
      });
  };

  const fetchCareCoordinator = () => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      ProjectionExpression: "PK,SK,UserName,Email,ContactNo",
      KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
      FilterExpression: "ActiveStatus = :v_status",
      ExpressionAttributeValues: {
        ":v_PK": { S: "carecoordinator" },
        ":v_SK": { S: "CARECOORDINATOR_" },
        ":v_status": { S: "Active" },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const careCoordinatorData = response.data;
        const dataSetcareCoordinator = [];
        const ccOptions = [{ value: "", name: "Select Coordinator" }];

        careCoordinatorData.forEach((p, index) => {
          console.log("p" + index, p);
          let ccdata = {};

          ccdata.id = index;
          ccdata.name = p.UserName.s;
          ccdata.email = p.Email.s;
          ccdata.phone = p.ContactNo.s;

          if (p.SK !== undefined) {
            ccdata.doctor_id = p.SK.s;
          }

          dataSetcareCoordinator.push(ccdata);
          ccOptions.push({ value: p.SK.s, name: p.UserName.s });
        });

        setccData(dataSetcareCoordinator);
        setCoordinatorOptions(ccOptions);
      })
      .catch(() => {
        relogin();
      });
  };

  const fetchCoach = () => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      ProjectionExpression: "PK,SK,UserName,Email,ContactNo",
      KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
      FilterExpression: "ActiveStatus = :v_status",
      ExpressionAttributeValues: {
        ":v_PK": { S: "coach" },
        ":v_SK": { S: "COACH_" },
        ":v_status": { S: "Active" },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const coachData = response.data;
        const dataSetcoach = [];
        const cOptions = [{ value: "", name: "Select Coach" }];

        coachData.forEach((p, index) => {
          console.log("p" + index, p);

          let coachdata = {};
          coachdata.id = index;
          coachdata.name = p.UserName.s;
          coachdata.email = p.Email.s;
          coachdata.phone = p.ContactNo.s;

          if (p.SK !== undefined) {
            coachdata.doctor_id = p.SK.s;
          }

          dataSetcoach.push(coachdata);
          cOptions.push({ value: p.SK.s, name: p.UserName.s });
        });

        setcoachData(dataSetcoach);
        setCoachOptions(cOptions);
      })
      .catch(() => {
        relogin();
      });
  };

  const fetchTaskTimerUser = () => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      ProjectionExpression: "PK,SK,UserId",
      KeyConditionExpression: " UserId > :v_user_id ",
      FilterExpression: "  ActiveStatus = :v_status AND PK <> :v_PK",
      ExpressionAttributeValues: {
        ":v_PK": { S: "patient" },
        ":v_status": { S: "Active" },
        ":v_user_id": { S: 2 },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const taskTimerUserData = response.data;
        const dataSettaskTimerUserData = [];

        taskTimerUserData.forEach((p, index) => {
          console.log("p" + index, p);

          let taskTimerUserdata = {};
          taskTimerUserdata.id = index;

          if (p.PK !== undefined) {
            taskTimerUserdata.user_id = p.SK.s;
          }

          if (p.UserName !== undefined) {
            taskTimerUserdata.user_name = p.UserName.s;
          }

          dataSettaskTimerUserData.push(taskTimerUserdata);
        });

        settasktimerUserData(dataSettaskTimerUserData);
      })
      .catch(() => {
        relogin();
      });
  };

  function formatAMPM(date) {
    var d = new Date(date);
    //alert(d);
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    //alert(yy);
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
      mm + "-" + dd + "-" + yy + " " + hours + ":" + minutes + " " + ampm;
    //alert(strTime);
    //console.log(strTime);
    return strTime;
  }

  const fetchBloodPressure = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        ProjectionExpression:
          "PK,SK,UserId,UserName,irregular,systolic,diastolic,pulse,TimeSlots,MeasurementDateTime,CreatedDate,DeviceId,IMEI,ActionTaken, ActiveStatus,Notes",
        IndexName: "Patient-Doctor-Device-Index",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        KeyConditionExpression: "GSI1PK = :v_PK",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BP_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      // var titleObject = {
      //   :v_GSI1PK1" : {"S": "DEVICE_BP_PATIENT_121524123727622"},
      //     ":v_GSI1PK2" : {"S": "DEVICE_BP_PATIENT_121524123727622"},
      // };
      data = {
        TableName: userTable,
        ProjectionExpression:
          "PK,SK,UserId,UserName,irregular,systolic,diastolic,pulse,TimeSlots,MeasurementDateTime,CreatedDate,DeviceId,IMEI,ActionTaken, ActiveStatus,Notes",
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "ActiveStatus <> :v_ActiveStatus AND GSI1PK IN (:v_GSI1PK1, :v_GSI1PK2)",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BP_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
          ":v_GSI1PK1": { S: "DEVICE_BP_PATIENT_121524123727622" },
          ":v_GSI1PK2": { S: "DEVICE_BP_PATIENT_1627230254837" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        ProjectionExpression:
          "PK,SK,UserId,UserName,irregular,systolic,diastolic,pulse,TimeSlots,MeasurementDateTime,CreatedDate,DeviceId,IMEI,ActionTaken, ActiveStatus,Notes",
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BP_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const bloodpressureData = response.data;
        const dataSetbp = [];
        if (bloodpressureData.length === 0) {
          dataSetbp.push("No Data Found");
        }

        bloodpressureData.forEach((bp, index) => {
          //   console.log('p' + index, bg);
          let bpdata = {};
          bpdata.id = index;
          if (bp.GSI1PK !== undefined) {
            bpdata.gSI1PK = bp.GSI1PK.s;
            bpdata.userId = bp.GSI1PK.s.split("_").pop();
          }
          if (bp.UserName !== undefined) {
            bpdata.UserName = bp.UserName.s;
          }

          if (bp.irregular !== undefined) {
            bpdata.irregular = bp.irregular.n;
          }
          if (bp.systolic !== undefined) {
            bpdata.systolic = parseFloat(bp.systolic.n).toFixed(0);
          }
          if (bp.diastolic !== undefined) {
            bpdata.diastolic = parseFloat(bp.diastolic.n).toFixed(0);
          }
          if (bp.pulse !== undefined) {
            bpdata.Pulse = bp.pulse.n;
          }
          if (bp.TimeSlots !== undefined) {
            bpdata.timeSlots = bp.TimeSlots.s;
          }
          if (bp.MeasurementDateTime !== undefined) {
            bpdata.MeasurementDateTime = bp.MeasurementDateTime.s;
            bpdata.MeasurementDateTime = new Date(bpdata.MeasurementDateTime);
            bpdata.sortDateColumn = bp.MeasurementDateTime.s;
            //  bpdata.MeasurementDateTime =Moment(bpdata.MeasurementDateTime).format('MM-DD-YYYY hh:mm A');
          }

          if (bp.CreatedDate !== undefined) {
            bpdata.CreatedDate = bp.CreatedDate.s;
            bpdata.CreatedDate = new Date(bpdata.CreatedDate);
            //bpdata.CreatedDate =Moment(bpdata.CreatedDate).format('MM-DD-YYYY hh:mm A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (bp.DeviceId !== undefined) {
            bpdata.DeviceId = bp.DeviceId.s;
          }

          if (bp.IMEI !== undefined) {
            bpdata.DeviceId = bp.IMEI.s;
          }

          if (bp.SK !== undefined) {
            bpdata.readingId = bp.SK.s.split("_").pop();
          }

          if (bp.ActionTaken !== undefined) {
            bpdata.actionTaken = bp.ActionTaken.s;
          }

          dataSetbp.push(bpdata);
        });

        setbloodpressureData(dataSetbp);
      });
  };

  const fetchBloodGlucose = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";

    // if (usertype === "patient") {
    //   data = {
    //     TableName: userTable,
    //     KeyConditionExpression: "PK = :v_PK",
    //     FilterExpression:
    //       "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
    //     ExpressionAttributeValues: {
    //       ":v_PK": { S: "DEVICE_BG_READING" },
    //       ":v_GSI1SK": { S: "DEVICE_BG_" + userid },
    //       ":v_ActiveStatus": { S: "Deactive" },
    //     },
    //   };
    // }
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        KeyConditionExpression: "GSI1PK = :v_PK",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      // data = {
      //   TableName: userTable,
      //   KeyConditionExpression: "PK = :v_PK",
      //   FilterExpression:
      //     "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
      //   ExpressionAttributeValues: {
      //     ":v_PK": { S: "DEVICE_BG_READING" },
      //     ":v_GSI1SK": { S: "DEVICE_BG_" + userid },
      //     ":v_ActiveStatus": { S: "Deactive" },
      //   },
      // };

      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }
    if (usertype === "coach") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "CoachId = :v_CoachId AND ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_CoachId": { S: +userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }
    if (usertype === "carecoordinator") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "GSI1PK IN (:v_GSI1PK1, :v_GSI1PK2) AND ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_GSI1PK1": { S: "DEVICE_BG_PATIENT_1201117191624936" },
          ":v_GSI1PK2": { S: "DEVICE_BG_PATIENT_121229133714481" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const bloodglucoseData = response.data;
        const dataSetbg = [];
        if (bloodglucoseData.length === 0) {
          dataSetbg.push("No Data Found");
        }
        console.log(
          "checking the blood glucose why this is happe",
          bloodglucoseData
        );

        bloodglucoseData.forEach((bg, index) => {
          //   console.log('p' + index, bg);
          let bgdata = {};
          bgdata.id = index;
          if (bg.GSI1PK !== undefined) {
            bgdata.gSI1PK = bg.GSI1PK.s;
            bgdata.userId = bg.GSI1PK.s.split("_").pop();
          }
          if (bg.UserName !== undefined) {
            bgdata.UserName = bg.UserName.s;
            if (bgdata.UserName == "Dale Cadwallader") {
              let test = "";
            }
          }

          if (bg.bloodglucosemmol !== undefined) {
            bgdata.bloodglucosemmol = parseFloat(bg.bloodglucosemmol.n).toFixed(
              0
            );
          }

          if (bg.bloodglucosemgdl !== undefined) {
            bgdata.bloodglucosemgdl = parseFloat(bg.bloodglucosemgdl.n).toFixed(
              0
            );
          }

          if (bg.before_meal !== undefined) {
            if (bg.before_meal.bool) bgdata.meal = "Before Meal";
            if (!bg.before_meal.bool) bgdata.meal = "After Meal";
          }

          if (bg.battery !== undefined) {
            bgdata.battery = bg.battery.n;
          }
          if (bg.TimeSlots !== undefined) {
            bgdata.timeSlots = bg.TimeSlots.s;
          }
          if (bg.MeasurementDateTime !== undefined) {
            bgdata.MeasurementDateTime = bg.MeasurementDateTime.s;
            bgdata.MeasurementDateTime = new Date(bgdata.MeasurementDateTime);
            bgdata.sortDateColumn = bg.MeasurementDateTime.s;
            //bgdata.MeasurementDateTime =Moment(bgdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm A');
          }
          if (bg.CreatedDate !== undefined) {
            bgdata.CreatedDate = bg.CreatedDate.s;
            bgdata.CreatedDate = new Date(bgdata.CreatedDate);
            // bgdata.CreatedDate =Moment(bgdata.CreatedDate).format('MMM-DD-YYYY hh:mm A');
          }

          if (bg.SK !== undefined) {
            bgdata.readingId = bg.SK.s.split("_").pop();
          }

          if (bg.DeviceId !== undefined) {
            bgdata.DeviceId = bg.DeviceId.s;
          }

          dataSetbg.push(bgdata);
        });

        setbloodglucoseData(dataSetbg);
      });
  };

  const backUpMessages = () => {
    axios.get("/backup-messages").then((response) => {
      const messages = response.data.messages;
      // console.log(response.data);
      const inb = messages.filter((message) => message.direction === "inbound");
      let inbs = [];
      let outbs = [];
      let iset = new Set();
      inb.forEach((imessage) => {
        //     alert(iset.has(imessage.from));
        if (!iset.has(imessage.from)) {
          iset.add(imessage.from);
          inbs.push(imessage);
        }
      });
      setInbox(inbs);
      const out = messages.filter(
        (message) => message.direction === "outbound-api"
      );

      let oset = new Set();
      out.forEach((omessage) => {
        if (!oset.has(omessage.to)) {
          oset.add(omessage.to);
          outbs.push(omessage);
        }
      });
      setOutbox(outbs);
    });
  };

  const fetchMessages = () => {
    axios.get("/messages").then((response) => {
      const messages = response.data.messages;
      //  console.log(response.data);
      const inb = messages.filter((message) => message.direction === "inbound");
      let inbs = [];
      let outbs = [];
      let iset = new Set();
      inb.forEach((imessage) => {
        //     alert(iset.has(imessage.from));
        if (!iset.has(imessage.from)) {
          iset.add(imessage.from);
          inbs.push(imessage);
        }
      });
      setInbox(inbs);
      const out = messages.filter(
        (message) => message.direction === "outbound-api"
      );

      let oset = new Set();
      out.forEach((omessage) => {
        if (!oset.has(omessage.to)) {
          oset.add(omessage.to);
          outbs.push(omessage);
        }
      });
      setOutbox(outbs);
    });
  };

  //chart Data
  const fetchBgChartData = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");

    let data = "";
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        KeyConditionExpression: "GSI1PK = :v_PK",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_GSI1SK": { S: "DEVICE_BG_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // setJwt(response.data);
        console.log("bgData", response.data);
        const bgData = response.data;
        const dataSetbg = [];

        bgData.forEach((p) => {
          let bgdata = {};
          let meal = "";
          bgdata.TimeSlots = p.TimeSlots.s;
          bgdata.daterecorded = p.date_recorded.s;
          if (p.before_meal.bool === true) {
            meal = "Before Meal";
          } else {
            meal = "After Meal";
          }
          bgdata.meal = meal;

          dataSetbg.push(bgdata);
        });

        setbgChartData(dataSetbg);
      });
  };

  const fetchBpChartData = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");

    let data = "";
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        KeyConditionExpression: "GSI1PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BP_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BP_READING" },
          ":v_GSI1SK": { S: "DEVICE_BP_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BP_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const bpData = response.data;
        const dataSetbp = [];

        bpData.forEach((p) => {
          let bpdata = {};
          bpdata.UserName = p.UserName.s;
          bpdata.systolic = p.systolic.n;
          bpdata.diastolic = p.diastolic.n;
          bpdata.pulse = p.pulse.n;
          if (p.TimeSlots !== undefined) {
            bpdata.timeSlots = p.TimeSlots.s;
          }
          bpdata.measurementDateTime = p.MeasurementDateTime.s;

          bpdata.diastolic = p.diastolic.n;

          dataSetbp.push(bpdata);
        });

        setbpChartData(dataSetbp);
      });
  };

  const fetchWSChartData = (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    console.log("fetchWSData : userId" + userId);

    let data = "";
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        KeyConditionExpression: "GSI1PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "ActiveStatus <> :v_ActiveStatus AND GSI1PK IN (:v_GSI1PK1, :v_GSI1PK2)",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
          ":v_GSI1PK1": { S: "DEVICE_WS_PATIENT_121524123727622" },
          ":v_GSI1PK2": { S: "DEVICE_WS_PATIENT_1627230254837" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const weightData = response.data;
        const dataSetweight = [];

        weightData.forEach((wt, index) => {
          console.log("p" + index, wt);
          let wtdata = {};
          wtdata.id = index;
          // if (wt.BMI !== undefined) {
          //     wtdata.bmi = wt.BMI.n;
          // }
          wtdata.gSI1PK = wt.GSI1PK.s;
          wtdata.deviceid = wt.DeviceId.n;
          wtdata.actionTaken = wt.ActionTaken.s;
          wtdata.weight = Math.round(wt.weight.n);
          if (wt.timeSlots !== undefined) {
            wtdata.timeSlots = wt.TimeSlots.s;
          }

          if (wt.MeasurementDateTime !== undefined) {
            wtdata.measurementDateTime = wt.MeasurementDateTime.s;
          }
          if (wt.MeasurementTimestamp !== undefined) {
            wtdata.measurementDateTimeStamp = wt.MeasurementTimestamp.n;
          }

          wtdata.username = wt.UserName.s;
          wtdata.batteryVoltage = wt.batteryVoltage.n;
          wtdata.signalStrength = wt.signalStrength.n;

          dataSetweight.push(wtdata);
          // console.log('pos', wtdata);
        });

        setwsChartData(dataSetweight);
      });
  };

  const AddTimeLog = (
    taskType,
    performedBy,
    performedOn,
    timeAmount,
    startdate,
    patientId,
    userName
  ) => {
    const token = localStorage.getItem("app_jwt");
    console.log("dhhgdfsghfsfs", startdate);
    const date = new Date(startdate);
    const end = new Date(startdate);
    end.setSeconds(end.getSeconds() + timeAmount);

    if (performedOn == "" || performedOn == null) {
      alert("please enter performedOn");
      return;
    }

    if (taskType == null || taskType == "") {
      alert("please enter taskType");
      return;
    }

    if (performedBy == null || performedBy == "") {
      alert("please enter performedBy");
      return;
    }

    const data = JSON.stringify({
      id: timeLogData.length + 1,
      PK: "TIMELOG_READING",
      SK:
        "TIMELOG_READING_" +
        taskType +
        "_" +
        performedBy +
        "_" +
        performedOn +
        "_" +
        timeAmount,
      GSI1PK: "TIMELOG_READING_PATIENT_" + patientId,
      GSI1SK: patientId,
      CreatedDate:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      UserName: userName,
      TaskType: taskType,
      PerformedBy: performedBy,
      PerformedOn: performedOn,
      TimeAmount: timeAmount.toString(),
      StartDT: date,
      EndDT: end,
      ActiveStatus: "Active",
    });

    axios
      .post(
        apiUrl +
          "/DynamoDbAPIs/PutItem?jsonData=" +
          data +
          "&tableName=" +
          userTable +
          "&actionType=register",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data === "Registered") {
          console.log(response.data);
          swal("success", "TimeLog has been added successfully", "success");
        }
      });
  };

  const UpdateTimeLog = (
    timelog,
    taskType,
    performedBy,
    performeddate,
    time,
    patientId,
    userName
  ) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        PK: { S: "TIMELOG_READING" },
        SK: { S: timelog.SK },
      },
      UpdateExpression:
        "SET TaskType = :v_TaskType, PerformedBy = :v_PerformedBy, PerformedOn = :v_PerformedOn, TimeAmount = :v_TimeAmount",
      ExpressionAttributeValues: {
        ":v_TaskType": { S: "" + taskType + "" },
        ":v_PerformedBy": { S: "" + performedBy + "" },
        ":v_PerformedOn": { S: performeddate },
        ":v_TimeAmount": { S: "" + time + "" },
      },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          alert("TimeLog has been updated");
        }
      });
  };

  const fetchPatientWithDevice = () => {
    const token = localStorage.getItem("app_jwt");

    let data = {
      TableName: userTable,
      KeyConditionExpression: "PK = :v_PK AND begins_with(SK, :v_SK)",
      FilterExpression: "DeviceStatus = :v_status AND DeviceId <> :v_deviceId",
      ExpressionAttributeValues: {
        ":v_PK": { S: "patient" },
        ":v_SK": { S: "DEVICE_" },
        ":v_status": { S: "Active" },
        ":v_deviceId": { S: "Null" },
      },
    };
    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const deviceData = response.data;
        const dataSetdevice = [];

        //    console.log('deviceData', deviceData);
        deviceData.forEach((p, index) => {
          console.log("p" + index, p);
          let devicedata = {};
          devicedata.id = index;

          if (p.DeviceId != undefined) {
            devicedata.deviceID = p.DeviceId.s;
          }
          if (p.DeviceType != undefined) {
            devicedata.DeviceType = p.DeviceType.s;
          }

          if (p.GSI1PK != undefined) {
            devicedata.patientId = p.GSI1PK.s;
            if (patients.length > 0) {
              let patient = patients.filter(
                (p) => p.ehrId === devicedata.patientId
              );
              if (patient.length > 0) devicedata.username = patient[0].name;
            }
            // else{
            //     devicedata.username=username;
            // }
          }
          dataSetdevice.push(devicedata);
        });

        setPatientWDevice(dataSetdevice);
      });
  };

  const getTab1data = (data) => {
    setTab1data(data);
  };
  console.log("22:27", Tab1data.FirstName);
  // if (!Tab1data){
  //     return null
  // }else{
  //
  // }

  // Submit intake
  const SubmitIntakeRequest = () => {
    const data = {
      firstname: Tab1data.FirstName,
      lastname: Tab1data.LastName,
      email: Tab1data.EmailAddress,
      guarantoremail: Tab1data.EmailAddress,
      dob: Tab1data.DateOfBirth,
      ssn: "123456789",
      practiceId: "24451",
      deptId: "1",
    };
    axios
      .post(apiUrl + "/athenanet", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
        },
      })
      .then((deptResponse) => {
        let result = deptResponse;

        const dataSetdevice = [];
        dataSetdevice.push("finalid", result);
        setResult(dataSetdevice);
        console.log("finldaa", result.data);
        if (result.data.error !== undefined) {
          alert(result.data.error);
        } else {
          alert(result.data);
        }
      });
  };

  return (
    <CoreContext.Provider
      value={{
        patients,
        bgData,
        bpData,
        wsData,
        updateChat,
        bgChartData,
        bpChartData,
        wsChartData,
        deviceData,
        providerData,
        ccData,
        coachData,
        thresoldData,
        timeLogData,
        AlltimeLogData,
        bloodglucoseData,
        bloodpressureData,
        weightData,
        weightApiData,
        fetchDeviceData,
        patientWDevice,
        getdp,
        dpatient,
        login,
        fetchPatientListfromApi,
        inbox,
        fetchMessages,
        outbox,
        fetchThreadMessages,
        threads,
        patient,
        setPatient,
        jwt,
        fetchBgData,
        fetchWSData,
        fetchBgChartData,
        fetchWSChartData,
        fetchBpChartData,
        fetchPatientWithDevice,
        tasktimerUserData,
        fetchThresold,
        fetchTimeLog,
        fetchAllTimeLog,
        backUpMessages,
        renderLoader,
        checkLocalAuth,
        addDevice,
        UpdateProfie,
        DeletePatient,
        DeleteTimeLog,
        DeleteCareTeam,
        DeleteDeviceData,
        userDetails,
        fetchProviders,
        addProvider,
        UpdateThreshold,
        fetchCareCoordinator,
        fetchCoach,
        fetchTaskTimerUser,
        addCareCoordinator,
        addCoach,
        AddTimeLog,
        UpdateTimeLog,
        UpdatePatient,
        AssignCareTeam,
        UpdateProvider,
        UpdateCareCoordinator,
        UpdateCoach,
        showProviderModal,
        handleProviderModalClose,
        verifyProviderVerificationCode,
        showPatientConfirmationModal,
        handlePatientConfirmationModalClose,
        fetchBloodPressure,
        fetchBloodGlucose,
        relogin,
        Registration,
        resetForm,
        providerOptions,
        coachOptions,
        careCoordinatorOptions,
        SubmitIntakeRequest,
        getTab1data,
        updateChat2,
        result,
        genderOptions,
        languageOptions,
        adminthresold,
        fetchadminThresold,
        userinfo,
        fetchchat,
        message1
      }}>
      {props.children}
    </CoreContext.Provider>
  );
};

export default CoreContextProvider;
