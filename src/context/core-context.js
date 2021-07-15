import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../assets/images/835.gif';
export const CoreContext = React.createContext({

});

export const CoreContextProvider = props => {
    const [patients, setPatients] = useState([]);
    const [bgData, setbgData] = useState([]);
    const [bpData, setbpData] = useState([]);
    const [wsData, setwsData] = useState([]);

    const [weightData, setweightData] = useState([]);
    const [weightApiData, setweightdeviceApiData] = useState([]);

    const [thresoldData, setThresoldData] = useState([]);
    const [bloodpressureData, setbloodpressureData] = useState([]);
    const [bloodglucoseData, setbloodglucoseData] = useState([]);

    const [deviceData, setdeviceData] = useState([]);
    const [providerData, setdoctorData] = useState([]);
    const [providerOptions, setProviderOptions] = useState([]);
    const [coachOptions, setCoachOptions] = useState([]);
    const [careCoordinatorOptions, setCoordinatorOptions] = useState([]);
    const [ccData, setccData] = useState([]);
    const [coachData, setcoachData] = useState([]);
    const [resetForm, setResetForm] = useState(0);

    // const [idToken, setToken] = useState([]);
    const [patient, setPatient] = useState({});
    const [threads, setThreads] = useState([]);
    const [inbox, setInbox] = useState([]);
    const [outbox, setOutbox] = useState([]);

    const [showProviderModal, setShowProviderModal] = useState(false);

    const handleProviderModalClose = () => setShowProviderModal(false);
    const handleProviderModalShow = () => setShowProviderModal(true);

    const [showPatientConfirmationModal, setShowPatientConfirmationModal] = useState(false);

    const handlePatientConfirmationModalClose = () => setShowPatientConfirmationModal(false);
    const handlePatientConfirmationModalShow = () => setShowPatientConfirmationModal(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [jwt, setJwt] = useState('');
    const [userId, setUserId] = useState('');

    const relogin = () => {
        setIsAuthenticated(false);
        setJwt('');
        setUserId('');
        localStorage.setItem('app_isAuth', '');
        localStorage.setItem('app_jwt', '');
        localStorage.setItem('app_userId', '');
        localStorage.setItem('app_userEmail', '');
        localStorage.setItem('userName', '');
        localStorage.setItem("userType", '');
        localStorage.setItem("userId", '');
        localStorage.setItem("userEmail", '');
        localStorage.setItem("app_email", '');
        localStorage.setItem("app_userName", '');
        localStorage.setItem("patientName", '');
        localStorage.setItem("app_patient", '');



        window.location.assign('/login');
    }

    const checkLocalAuth = () => {
        const isAuth = localStorage.getItem('app_isAuth');
        const token = localStorage.getItem('app_jwt');
        const userId = localStorage.getItem('app_userId');

        if (isAuth === 'yes') {
            setIsAuthenticated(true);
            setJwt(token);
            setUserId(userId);
        }
        else {
            relogin();
        }
    }

    // useEffect(checkLocalAuth, []); // because not required on all the pages.


    // capture from login page.  'yasser.sheikh@laitkor.com'  'M2n1shlko@1'
    const login = (email, password, url) => {
        setShowLoader(true);
        axios.post('https://api.apatternplus.com/api/signin', { Username: email, Password: password }).then((response) => {
            if (response.data === 'Incorrect username or password.') {
                alert('Incorrect username or password.');
                setShowLoader(false);
            } else {
                setJwt(response.data.idToken);
                setIsAuthenticated(true);
                setMessage('');
                setUserId(email);
                localStorage.setItem('app_isAuth', 'yes');
                localStorage.setItem('app_jwt', response.data.idToken);
                localStorage.setItem('app_userId', email);
                localStorage.setItem('app_userEmail', email);
                // localStorage.setItem("userType", response[0].UserType.s);

                //  window.location.assign();

                userDetails(email, url);
            }
        })
    }

    const userDetails = (useremail, url = '') => {

        const token = localStorage.getItem('app_jwt');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const data = {
            "TableName": "UserDetail",
            "IndexName": "Email-Index",
            "KeyConditionExpression": "Email = :v_Email",
            "ExpressionAttributeValues": { ":v_Email": { "S": useremail } }
        }


        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            // setJwt(response.data);
            const userData = response.data;
            //console.log('userData', userData);

            userData.forEach(p => {

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

                const pat = { userName: p.UserName ? p.UserName.s : '', userType: p.UserTpye ? p.UserType.s : '', userId: p.SK ? p.SK.s : '', userEmail: p.Email ? p.Email.s : '', height: p.Height ? p.Height.s : '', weight: p.weight ? p.weight.s : '', dob: p.DOB ? p.DOB.s : '', bmi: p.BMI ? p.BMI.s : '', phone: p.ContactNo ? p.ContactNo.s : '' };

                localStorage.setItem("app_patient", JSON.stringify(pat));

                if (p.UserType.s === 'patient' && url) {

                    if (pat.userName.includes('||0'))
                        url = 'profile';
                    else
                        url = 'patient-profile/' + p.SK.s.split("_").pop();
                }

            });

            const patientId = localStorage.getItem("userId");
            const username = localStorage.getItem("userName");
            
            setShowLoader(false);


            if (userData.length === 0)  
                window.location.assign('profile');

            else
                if (url) window.location.assign(url);

        })

    }

    // capture from patient List page.
    const fetchPateintListfromApi = (usertype, userId) => {
        const token = localStorage.getItem('app_jwt');
       
        let data = "";

        if (usertype === "admin") {
            data = {
                "TableName":"UserDetail",
                "KeyConditionExpression":"PK = :v_PK AND begins_with(SK, :v_SK)",
                "FilterExpression":"ActiveStatus = :v_status",
                "ExpressionAttributeValues":{":v_PK":{"S":"patient"},":v_SK":{"S":"PATIENT_"},":v_status":{"S":"Active"}}
            }

        }
        if (usertype === "doctor") {
            data = {
                "TableName": "UserDetail",
                "IndexName": "Patient-Doctor-Device-Index",
                "KeyConditionExpression": "GSI1PK = :v_PK AND GSI1SK =  :v_SK",
                "FilterExpression": "ActiveStatus = :v_status",
                "ExpressionAttributeValues": { ":v_PK": { "S": "patient" }, ":v_SK": { "S": userId }, ":v_status": { "S": "Active" } }

            }

        }

        if (usertype === "carecoordinator") {

            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK ",
                "FilterExpression": "ActiveStatus = :v_status AND CarecoordinatorId = :v_CarecoordinatorId",
                "ExpressionAttributeValues": { ":v_PK": { "S": "patient" }, ":v_CarecoordinatorId": { "S": userId }, ":v_status": { "S": "Active" } }
            }
        }
        if (usertype === "coach") {
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK ",
                "FilterExpression": "ActiveStatus = :v_status AND CoachId = :v_CoachId",
                "ExpressionAttributeValues": { ":v_PK": { "S": "patient" }, ":v_CoachId": { "S": userId }, ":v_status": { "S": "Active" } }
            };
        }

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            // setJwt(response.data);
            //  console.log(response.data);
            const patients = response.data;
            const ps = [];

            patients.forEach((p , index) => {
                let patient = {};

                patient.id =index;
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
                    patient.dob = p.DOB.s;
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
                    patient.height = p.Height.s;
                }

                if (p.weight !== undefined) {
                    let num = p.weight.s;
                    if (num === '') num = 0;
                    patient.Weight = parseFloat(num).toFixed(2);
                }
                if (p.BMI !== undefined) {
                    let num1 = p.BMI.s;
                    if (num1 === '') num1 = 0;
                    patient.BMI = parseFloat(num1).toFixed(2);
                }

                // if (patient.userId !== undefined && patient.name) {
                //     fetchDeviceData("PATIENT_"+patient.userId,patient.name, 'patient','', patient);
                // }
                ps.push(patient);
            });

            setPatients(ps);
        }).catch(() => {
            relogin();
        })
    }

    const renderLoader = () => {
        if (showLoader) return (<span><img src={loader} alt="" /></span>);
        else return <span></span>
    }


    const fetchThreadMessages = (filter, mobilePhone) => {
        axios.get('threads', { params: { filter, mobilePhone } }).then(response => {
            setThreads(response.data.messages);
            //  console.log('messages', response.data.messages);
        });
    }

    const fetchBgData = (userid, usertype) => {

        const token = localStorage.getItem('app_jwt');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let data = "";
        if (usertype === "patient") {
            data = {
                "TableName": "UserDetail",
                "IndexName": "Patient-Doctor-Device-Index",
                "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
                "KeyConditionExpression": "GSI1PK = :v_PK",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_BG_" + userid },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }

        if (usertype === "doctor") {
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK",
                "FilterExpression": "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_BG_READING" },
                    ":v_GSI1SK": { "S": "DEVICE_BG_" + userid },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }

        if (usertype === "admin") {
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK",
                "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_BG_READING" },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }



        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            // setJwt(response.data);
            console.log('bgData', response.data);
            const bgData = response.data;
            const dataSetbg = [];

            bgData.forEach(p => {
                let bgdata = {};
                let meal = '';
                bgdata.TimeSlots = p.TimeSlots.s;
                bgdata.daterecorded = p.date_recorded.s;
                if (p.before_meal.bool === true) {
                    meal = "Before Meal";
                }
                else {
                    meal = "After Meal";
                }
                bgdata.meal = meal;

                dataSetbg.push(bgdata);
            });

            setbgData(dataSetbg);
        })

    }

   

    const fetchWSData = (userid,username, usertype, dataSetdevice) => {

       const token = localStorage.getItem('app_jwt');
       console.log('fetchWSData : userId' + userid);

        let data = "";
        if (usertype === "patient") {
            data = {
                "TableName": "UserDetail",
                "IndexName": "Patient-Doctor-Device-Index",
                "KeyConditionExpression": "GSI1PK = :v_PK",
                "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_WS_" + userid },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }

        if (usertype === "doctor") {
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK",
                "FilterExpression": "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_WS_READING" },
                    ":v_GSI1SK": { "S": "DEVICE_WS_" + userid },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }

        if (usertype === "admin") {
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK",
                "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_WS_READING" },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }



        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            const weightData = response.data;
            const dataSetweight = [];
          
            weightData.forEach((wt, index) => {
                console.log('p' + index, wt);
                let wtdata = {};
                wtdata.id = index;
                // if (wt.BMI !== undefined) {
                //     wtdata.bmi = wt.BMI.n;
                // }
                if(wt.GSI1PK !==undefined)wtdata.gSI1PK = wt.GSI1PK.s;
                if(wt.DeviceId !==undefined)wtdata.deviceid = wt.DeviceId.n;
                
                wtdata.actionTaken = wt.ActionTaken.s;
                wtdata.weight = Math.round(wt.weight.n);
                if(wt.TimeSlots !==undefined) wtdata.timeSlots = wt.TimeSlots.s;
                if(wt.MeasurementDateTime !==undefined)  wtdata.measurementDateTime = wt.MeasurementDateTime.s;
                if(wt.MeasurementTimestamp !==undefined) wtdata.measurementDateTimeStamp = wt.MeasurementTimestamp.n;
                if(wt.UserName !==undefined)  wtdata.username = wt.UserName.s;
                if(wt.batteryVoltage !==undefined) wtdata.batteryVoltage = wt.batteryVoltage.n;
                if(wt.signalStrength !==undefined) wtdata.signalStrength = wt.signalStrength.n;


                dataSetweight.push(wtdata);
                // console.log('pos', wtdata);

            });

            setweightData(dataSetweight);

            //compare with api data and push into array.
            fetchWSDeviceApiData(userid, username, usertype, dataSetweight,dataSetdevice);
        })

    }

    const fetchWSDeviceApiData = (userid,username, usertype, dataSetweight, dataSetdevice) => {

        const token = localStorage.getItem('app_jwt');
        
        const deviceinfo = [];
        if(usertype =="admin")
        {
            deviceinfo.push("867730052513003");
            deviceinfo.push("863859040790045");
            deviceinfo.push("863859040760527");
            deviceinfo.push("86892305142486");
             deviceinfo.push("86773005259358");
            deviceinfo.push("867730052593583");
            
            
        }else
        {
            dataSetdevice.forEach(x=>{
                deviceinfo.push(x.deviceID)
            });
        }
      
         // Case 2 : Get Device for this user.
        let data = {
            "api_key": "474258B3-18AF-4197-A127-4C3E478B0642-1591996272",
            "device_ids": deviceinfo,
            "reading_type" : ["weight"]

        }
        
        console.log("device deviceinfo 1212" + deviceinfo);
          axios.post('https://api.iglucose.com/readings/', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            const responseData = response.data;
            const weightapiData = responseData.readings;
            const dataSetApiweight = [];
          
            weightapiData.forEach((wt, index) => {
                console.log('p' + index, wt);
                let wtdata = {};

                if (wt.reading_type == "weight"){
                    wtdata.id = index;
                    // if (wt.BMI !== undefined) {
                    //     wtdata.bmi = wt.BMI.n;
                    // }
                    if (wt.reading_id !== undefined) {
                        wtdata.reading_id = wt.reading_id;
                    }
                    if (wt.GSI1PK !== undefined) {
                        wtdata.gSI1PK = wt.GSI1PK.s;
                    }
                    wtdata.username = username;
                    if (wt.device_id !== undefined) {
                        wtdata.deviceid = wt.device_id;
                    }
                   // wtdata.actionTaken = wt.ActionTaken.s;
                    if (wt.weight_lbs !== undefined) {
                        wtdata.weight = wt.weight_lbs;
                    }
                    wtdata.timeSlots = null;
                    if (wt.date_received !== undefined) {
                        wtdata.measurementDateTime = wt.date_received;
                    }
                    wtdata.measurementDateTimeStamp = null;
                    
                    wtdata.batteryVoltage = null;
                    wtdata.signalStrength = null;
                       
                    dataSetApiweight.push(wtdata);
                }
                // console.log('pos', wtdata);

            });
            if(dataSetweight.length ==0 ){
                dataSetweight = dataSetApiweight;

                // Adding in db.
                dataSetApiweight.forEach(x=>{

                    pushWSInDB(userid,username, usertype, x)
                });
            } 
            else
            {
                // dataSetApiweight.forEach(p=>{
                //     if(dataSetweight.filter(x=>x.date_recorded != p.date_recorded)){
                //         dataSetweight.push(p);
                //     }
                // });
            }
            setweightData(dataSetweight);
            setweightdeviceApiData(dataSetApiweight);


        })

    }

    const fetchThresold = (userid, usertype) => {

        const token = localStorage.getItem('app_jwt');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let data = "";
        data = {
            "TableName": "UserDetail",
            "ProjectionExpression": "PK,SK,Low,High,TElements",
            "KeyConditionExpression": "PK = :v_PK AND begins_with(SK, :v_SK)",
            "ExpressionAttributeValues": {
                ":v_PK": { "S": "THRESHOLDRANGE_ADMIN" },
                ":v_SK": { "S": userid }
            }
        }



        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {

            const thresholdData = response.data;
            console.log('threshod data', response.data);
            const dataSetthresold = [];

            thresholdData.forEach((th, index) => {
                console.log('p' + index, th);
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
                    thdata.systolic_high = th.High_value;;
                } else if (thdata.Element_value === "DIASTOLIC") {
                    thdata.diastolic_low = th.Low_value;
                    thdata.diastolic_high = th.High_value;;
                } else if (thdata.Element_value === "BMI") {
                    thdata.bmi_low = th.Low_value;
                    thdata.bmi_high = th.High_value;;
                } else if (thdata.Element_value === "Weight") {
                    thdata.weight_low = th.Low_value;
                    thdata.weight_high = th.High_value;;
                }



                dataSetthresold.push(thdata);
            });

            setThresoldData(dataSetthresold);

            console.log('thresolddata', dataSetthresold);
        })

    }
    const addDevice = (deviceType, deviceId, patientId) => {
        const token = localStorage.getItem('app_jwt');
        const date = new Date();
        const doctorId = '';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const SK1 = "DEVICE_" + deviceType + "_" + deviceId;
        const data = JSON.stringify({
            "PK": "patient",
            "SK": SK1,
            "DeviceId": deviceId,
            "DeviceStatus": "Active",
            "CreatedDate": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            "DeviceType": deviceType,
            "GSI1PK": 'PATIENT_' + patientId,
            "GSI1SK": doctorId
        });

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/PutItem?jsonData=' + data + '&tableName=UserDetail&actionType=register', {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                alert("Device Inserted Successfully.");
            }
        });
    }


    const pushWSInDB = (userId,userName, usertype, wt) => {
        const token = localStorage.getItem('app_jwt');
        const date = new Date();
        
        const patientId = userId.split("_").pop();

        const data = JSON.stringify({
            "TableName": "UserDetail",
            "ExpressionAttributeValues": {
                ":v_PK": { "S": "DEVICE_WS_READING" },
                ":v_SK": { "S": "DEVICE_WS_READING_" + wt.reading_id },
                ":MeasurementDateTime": { "S": + wt.date_received },
                ":DeviceId": { "N": + wt.deviceid },
                ":GSI1SK": { "S": + "DEVICE_WS_" + userId },
                ":UserName": { "S": + wt.username },
                ":weight": { "N": + wt.weight },
                ":GSI1PK": { "S": + "DEVICE_WS_"+ userId},
                ":CreatedDate": { "S": + date },
                ":IMEI": { "S": + wt.deviceid },
                ":v_ActiveStatus": { "S": "Active" }
            } });

      
        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/PutItem?jsonData=' + data + '&tableName=UserDetail&actionType=register', {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                alert("Device Inserted Successfully.");
            }
        });
    }

    const UpdateThreshold = (patient, type, high, low, userType) => {
        const token = localStorage.getItem('app_jwt');

        const data = {
            "TableName": "UserDetail",
            "Key": {
                "PK": { "S": "THRESHOLDRANGE_ADMIN" },
                "SK": { "S": patient + "_" + type }
            },
            "UpdateExpression": "SET Low = :v_Low , High = :v_High",
            "ExpressionAttributeValues": {
                ":v_Low": { "S": low },
                ":v_High": { "S": high }
            }
        };

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/updateitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                alert("Threshold Update Successfully.");
            }
        });
    }


    const UpdateProfie = (userName, email, phone, dob, height, weight, bmi) => {
        const userid = localStorage.getItem("userId");
        const token = localStorage.getItem('app_jwt');
        const data = {
            "TableName": "UserDetail",
            "Key": {
                "PK": { "S": "patient" },
                "SK": { "S": userid }
            },
            "UpdateExpression": "SET ProfileImage = :v_ProfileImage ,UserName = :v_UserName , ContactNo = :v_ContactNo , DOB =:v_DOB , Height=:v_Height , weight=:v_weight ,UserTimeZone = :v_TimeZone,BMI= :v_BMI",
            "ExpressionAttributeValues": {
                ":v_UserName": { "S": userName },
                ":v_ContactNo": { "S": phone },
                ":v_DOB": { "S": dob },
                ":v_Height": { "S": height },
                ":v_weight": { "S": weight },
                ":v_ProfileImage": { "S": '' },
                ":v_TimeZone": { "S": '' },
                ":v_BMI": { "S": bmi }
            }
        };

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/updateitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            console.log(response);
            if (response.data === "Updated") {
                alert("Record Updated Successfully.");
                userDetails(email, '');
            }
        });
    }

    const fetchNameFromId = (id, array) => {

        const ent = array.filter(a => a.value === id);
        return ent;
    }

    const UpdatePatient = (name, phone, birthDate, height, provider, coordinator, coach, patientId) => {
        console.log(name);
        const token = localStorage.getItem('app_jwt');
        let doctor_id = provider;
        let carecoordinator_id = coordinator;
        let carecoordinatorname = fetchNameFromId(coordinator, careCoordinatorOptions);
        let coachname = fetchNameFromId(coach, coachOptions);
        let coach_id = coach;
        const data = JSON.stringify({
            "TableName": "UserDetail",
            "Key": {
                "PK": { "S": "patient" },
                "SK": { "S": "" + patientId + "" }
            },
            "UpdateExpression": "SET GSI1SK = :v_GSI1SK, GSI1PK = :v_GSI1PK, UserName = :v_username, ContactNo = :v_mobile, DOB = :v_DOB, Height = :v_Height,CarecoordinatorName = :v_CarecoordinatorName, CarecoordinatorId = :v_CarecoordinatorId,CoachId = :v_CoachId,Coach = :v_CoachName",
            "ExpressionAttributeValues": {
                ":v_GSI1SK": { "S": "" + doctor_id + "" },
                ":v_GSI1PK": { "S": "patient" },
                ":v_username": { "S": "" + name + "" },
                ":v_mobile": { "S": "" + phone + "" },
                //":v_IMEI":{"S":""+patient_emei+""},
                // ":v_BMI":{"S":""+patient_bmi+""},
                ":v_DOB": { "S": "" + birthDate + "" },
                ":v_Height": { "S": "" + height + "" },
                ":v_CarecoordinatorId": { "S": "" + carecoordinator_id + "" },
                ":v_CoachId": { "S": "" + coach_id + "" },
                ":v_CarecoordinatorName": { "S": "" + carecoordinatorname + "" },
                ":v_CoachName": { "S": "" + coachname + "" }

            }
        });

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/updateitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                alert("Patient data Update Successfully.");
            }
        });
    }

    const DeletePatient = (patientId) => {
        const token = localStorage.getItem('app_jwt');

        const data = JSON.stringify({
            "TableName": "UserDetail",
            "Key": {
                "SK": { "S": "" + patientId + "" },
                "PK": { "S": "patient" }
            },
            "UpdateExpression": "SET ActiveStatus = :v_ActiveStatus",
            "ExpressionAttributeValues": { ":v_ActiveStatus": { "S": "Deactive" } }
        });

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/updateitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                alert("Patient data Update Successfully.");
            }
        });
    }


    const verifyProviderVerificationCode = (code, userName, careTeamType, url = '') => {
        const token = localStorage.getItem('app_jwt');
        console.log(code, userName);
        const data = {
            "Username": userName,
            "code": code
        };

        axios.post('https://api.apatternplus.com/api/confirmsignup', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {

            if (response.data === "User Confirmed") {
                // if(localStorage.getItem("userType") === "admin"){
                // 	window.location.replace('doctor_info.html');
                // }else{
                // 	window.location.replace('auth-login.html');
                // }
                alert('Record added successfully...');
                handleProviderModalClose();
                handlePatientConfirmationModalClose();
                let rf = resetForm + 1;
                setResetForm(rf);
                if (careTeamType === 'Coach') {
                    fetchCoach();
                }
                if (careTeamType === 'Provider') {
                    fetchProviders();
                }
                if (careTeamType === 'CareCoordinator') {
                    fetchCareCoordinator();
                }
                if (url) window.location.assign(url);
            }
        });

    }

    const addProvider = (name, email, phone, password) => {
        const token = localStorage.getItem('app_jwt');
        const date = new Date();
        const id = date.getTime();
        const data = {
            "Username": email,
            "Email": email,
            "Password": password
        };


        axios.post('https://api.apatternplus.com/api/register', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                const data = JSON.stringify({
                    "PK": "doctor",
                    "SK": "DOCTOR_" + id, //"doctor",
                    "UserId": id,
                    "UserName": name,
                    "Email": email,
                    "ContactNo": phone,
                    "UserType": "doctor",
                    "CreatedDate": date,
                    "ActiveStatus": "Active",
                    "GSI1PK": "NotAssign",
                    "GSI1SK": "DOCTOR_" + id
                });

                axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/putitem?jsonData=' + data + '&tableName=UserDetail&actionType=register', {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        // "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }).then((putresponse) => {
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
    }


    const Registration = (name, email, phone, password, dob) => {
        const token = localStorage.getItem('app_jwt');
        const date = new Date();
        const id = date.getTime();
        const data = {
            "Username": email,
            "Email": email,
            "Password": password
        };


        axios.post('https://api.apatternplus.com/api/register', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                const data = JSON.stringify({
                    "PK": "patient",
                    "SK": "PATIENT_" + id, //"doctor",
                    "UserId": id,
                    "UserName": name + '||0',
                    "Email": email,
                    "ContactNo": phone,
                    "DOB": dob,
                    "UserType": "patient",
                    "CreatedDate": date,
                    "ActiveStatus": "Active"

                });

                axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/putitem?jsonData=' + data + '&tableName=UserDetail&actionType=register', {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        // "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }).then((putresponse) => {
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
                alert(response.data);
            }
        });
    }

    const addCareCoordinator = (name, email, phone, password) => {
        const token = localStorage.getItem('app_jwt');
        const date = new Date();
        const id = date.getTime();
        const data = {
            "Username": email,
            "Email": email,
            "Password": password
        };


        axios.post('https://api.apatternplus.com/api/register', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                const data = JSON.stringify({
                    "PK": "carecoordinator",
                    "SK": "CARECOORDINATOR_" + id, //"doctor",
                    "UserId": id,
                    "UserName": name,
                    "Email": email,
                    "ContactNo": phone,
                    "UserType": "carecoordinator",
                    "CreatedDate": date,
                    "ActiveStatus": "Active",
                    "GSI1PK": "NotAssign",
                    "GSI1SK": "CARECOORDINATOR_" + id
                });

                axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/putitem?jsonData=' + data + '&tableName=UserDetail&actionType=register', {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        // "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }).then((putresponse) => {
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
    }

    const addCoach = (name, email, phone, password) => {
        const token = localStorage.getItem('app_jwt');
        const date = new Date();
        const id = date.getTime();
        const data = {
            "Username": email,
            "Email": email,
            "Password": password
        };


        axios.post('https://api.apatternplus.com/api/register', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Registered") {
                const data = JSON.stringify({
                    "PK": "coach",
                    "SK": "COACH_" + id, //"doctor",
                    "UserId": id,
                    "UserName": name,
                    "Email": email,
                    "ContactNo": phone,
                    "UserType": "coach",
                    "CreatedDate": date,
                    "ActiveStatus": "Active",
                    "GSI1PK": "NotAssign",
                    "GSI1SK": "COACH_" + id
                });

                axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/putitem?jsonData=' + data + '&tableName=UserDetail&actionType=register', {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        // "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }).then((putresponse) => {
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
    }


     const  fetchDeviceData = (patientId, username, usertype,type, patient) => {
        console.log('patientId' + patientId);
        const token = localStorage.getItem('app_jwt');
        const data = {
            "TableName": "UserDetail",
            "KeyConditionExpression": "PK = :v_PK AND begins_with(SK, :v_SK)",
            "FilterExpression": "DeviceStatus = :v_status AND GSI1PK = :v_GSI1PK",
            "ExpressionAttributeValues": {
                ":v_PK": { "S": "patient" },
                ":v_SK": { "S": "DEVICE_" },
                ":v_status": { "S": "Active" },
                ":v_GSI1PK": { "S": patientId }
            }
        }
      axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            const deviceData = response.data;
            const dataSetdevice = [];
            let deviceType = '';

            //    console.log('deviceData', deviceData);
         
            deviceData.forEach((p, index) => {
                console.log('p' + index, p);
                let devicedata = {};
                devicedata.id = index;
                if (p.DeviceType.s === "BP") {
                    deviceType = "Blood Pressure";
                } else if (p.DeviceType.s === "BG") {
                    deviceType = "Blood Glucose";
                } else if (p.DeviceType.s === "WS") {
                    deviceType = "Weight";
                } else {
                    deviceType = "No Device";
                }
                devicedata.deviceName = deviceType;
                if(p.DeviceId !=undefined){
                    devicedata.deviceID = p.DeviceId.s;

                    if (deviceType == 'Weight') {
                        localStorage.setItem('WdeviceID', p.DeviceId.s);
                    }
                    if (deviceType == 'Blood Pressure') {
                        localStorage.setItem('BPdeviceID', p.DeviceId.s);
                    }
                    if (deviceType == 'Blood Glucose') {
                        localStorage.setItem('BGdeviceID', p.DeviceId.s);
                    }
                }

                if(patient !==undefined){
                    patient.deviceName =devicedata.deviceName ;
                    patient.deviceID =devicedata.deviceID ;
                }
                dataSetdevice.push(devicedata);

               
            });

            setdeviceData(dataSetdevice);

            
            if(type =='Weight'){
                fetchWSData(patientId, username, usertype ,dataSetdevice)
            }
            if(type =='Blood Pressure'){
                fetchBloodPressure(patientId, username, usertype ,dataSetdevice)
            }
            if(type =='Blood Glucose'){
                
            }
        })

    }


    const fetchProviders = () => {
        const token = localStorage.getItem('app_jwt');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const data = {
            "TableName": "UserDetail",
            "ProjectionExpression": "PK,SK,UserName,Email,ContactNo",
            "KeyConditionExpression": "PK = :v_PK AND begins_with(SK, :v_SK)",
            "FilterExpression": "ActiveStatus = :v_status",
            "ExpressionAttributeValues": {
                ":v_PK": { "S": "doctor" },
                ":v_SK": { "S": "DOCTOR_" },
                ":v_status": { "S": "Active" }
            }
        }



        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            const providerData = response.data;
            console.log(response.data);
            const dataSetdoctor = [];
            const pOptions = [{ value: '', name: 'Select Provider' }];

            providerData.forEach((p, index) => {
                console.log('p' + index, p);
                let providerdata = {};
                providerdata.id =index;
                providerdata.provider = p.UserName.s;
                providerdata.email = p.Email.s;
                providerdata.phone = p.ContactNo.s;


                dataSetdoctor.push(providerdata);
                pOptions.push({ value: p.SK.s, name: p.UserName.s });
            });

            setdoctorData(dataSetdoctor);
            setProviderOptions(pOptions);

        }).catch(() => {
            relogin();
        })

    }

    const fetchCareCoordinator = () => {
        const token = localStorage.getItem('app_jwt');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const data = {
            "TableName": "UserDetail",
            "ProjectionExpression": "PK,SK,UserName,Email,ContactNo",
            "KeyConditionExpression": "PK = :v_PK AND begins_with(SK, :v_SK)",
            "FilterExpression": "ActiveStatus = :v_status",
            "ExpressionAttributeValues": {
                ":v_PK": { "S": "carecoordinator" },
                ":v_SK": { "S": "CARECOORDINATOR_" },
                ":v_status": { "S": "Active" }
            }
        }



        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            const careCoordinatorData = response.data;
            const dataSetcareCoordinator = [];
            const ccOptions = [{ value: '', name: 'Select Coordinator' }];

            careCoordinatorData.forEach((p, index) => {
                console.log('p' + index, p);
                let ccdata = {};

                ccdata.id =index;
                ccdata.name = p.UserName.s;
                ccdata.email = p.Email.s;
                ccdata.phone = p.ContactNo.s;


                dataSetcareCoordinator.push(ccdata);
                ccOptions.push({ value: p.SK.s, name: p.UserName.s });
            });

            setccData(dataSetcareCoordinator);
            setCoordinatorOptions(ccOptions);
        }).catch(() => { relogin(); })

    }


    const fetchCoach = () => {
        const token = localStorage.getItem('app_jwt');

        const data = {
            "TableName": "UserDetail",
            "ProjectionExpression": "PK,SK,UserName,Email,ContactNo",
            "KeyConditionExpression": "PK = :v_PK AND begins_with(SK, :v_SK)",
            "FilterExpression": "ActiveStatus = :v_status",
            "ExpressionAttributeValues": {
                ":v_PK": { "S": "coach" },
                ":v_SK": { "S": "COACH_" },
                ":v_status": { "S": "Active" }
            }
        }



        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            const coachData = response.data;
            const dataSetcoach = [];
            const cOptions = [{ value: '', name: 'Select Coach' }];

            coachData.forEach((p, index) => {
                console.log('p' + index, p);
               
                let coachdata = {};
                coachdata.id =index;
                coachdata.name = p.UserName.s;
                coachdata.email = p.Email.s;
                coachdata.phone = p.ContactNo.s;


                dataSetcoach.push(coachdata);
                cOptions.push({ value: p.SK.s, name: p.UserName.s });
            });

            setcoachData(dataSetcoach);
            setCoachOptions(cOptions);
        }).catch(() => {
            relogin();
        })

    }


    const fetchBloodPressure = (userid,username, usertype, dataSetdevice) => {

        const token = localStorage.getItem('app_jwt');
        console.log('fetchWSData : userId' + userid);

        
        const deviceinfo = [];
        if(usertype =="admin")
        {
            deviceinfo.push("867730052513003");
            deviceinfo.push("863859040790045");
            deviceinfo.push("863859040760527");
            deviceinfo.push("86892305142486");
             deviceinfo.push("86773005259358");
            deviceinfo.push("867730052593583");
            
        }else
        {
            dataSetdevice.forEach(x=>{
                deviceinfo.push(x.deviceID)
            });
        }
      

         // Case 2 : Get Device for this user.
        let data = {
            "api_key": "474258B3-18AF-4197-A127-4C3E478B0642-1591996272",
            "device_ids": deviceinfo,
            "reading_type" : ["blood_pressure"]

        }
        
            axios.post('https://api.iglucose.com/readings/', data, {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    // "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            ).then((response) => {
                const responseData = response.data;
                const dataSetbp = [];
                const reading = responseData.readings;

                reading.forEach((bp, index) => {
                    console.log('p' + index, bp);
                    let bpdata = {};

                    bpdata.id = index;

                    if (bp.reading_type == "blood_pressure") {
                        // if (bp.GSI1PK !== undefined) {
                        //     bpdata.gSI1PK = bp.GSI1PK.s;
                        // }

                        bpdata.username = username;
                        if (bp.systolic_mmhg !== undefined) {
                            bpdata.systolic = bp.systolic_mmhg;
                        }

                        if (bp.diastolic_mmhg !== undefined) {
                            bpdata.diastolic = bp.diastolic_mmhg;
                        }
                        if (bp.pulse_bpm !== undefined) {
                            bpdata.pulse = bp.pulse_bpm;
                        }

                        if (bp.date_recorded !== undefined) {
                            bpdata.date_recorded = bp.date_recorded;
                        }

                        if (bp.date_received !== undefined) {
                            bpdata.date_received = bp.date_received;
                        }

                        if( bp.TimeSlots !== undefined){
                            bpdata.timeSlots = bp.TimeSlots.s;
                        }

                        

                        
                    }

                    dataSetbp.push(bpdata);
                });

                setbloodpressureData(dataSetbp);
            })
        

        // }

        // const token = localStorage.getItem('app_jwt');
        // const isAuth = localStorage.getItem('app_isAuth');
        // const username = localStorage.getItem('userName');
        // if (isAuth === 'yes') {
        //     setIsAuthenticated(true);
        //     setJwt(token);
        //     setUserId(userId);
        // }
        // else {
        //     relogin();
        // }

        // const deviceinfo = [];
        // const BPdeviceId = localStorage.getItem("BPdeviceID");
        // const BGdeviceId = localStorage.getItem("BGdeviceID");
        // const WdeviceId = localStorage.getItem("WdeviceID");
        // if (BPdeviceId !== null) {
        //     deviceinfo.push(BPdeviceId);
        // }
        // if (BGdeviceId !== null) {
        //     deviceinfo.push(BGdeviceId);
        // }
        // if (WdeviceId !== null) {
        //     deviceinfo.push(WdeviceId);
        // }


        // if (deviceinfo.length > 0) {
        //     let data = {

        //         "api_key": "474258B3-18AF-4197-A127-4C3E478B0642-1591996272",

        //         "device_ids": deviceinfo

        //     }

        //     // let data = "";
        //     // if (usertype === "patient") {
        //     //     data = {
        //     //         "TableName": "UserDetail",
        //     //         "IndexName": "Patient-Doctor-Device-Index",
        //     //         "KeyConditionExpression": "GSI1PK = :v_PK",
        //     //         "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
        //     //         "ExpressionAttributeValues": {
        //     //             ":v_PK": { "S": "DEVICE_BP_" + userid },
        //     //             ":v_ActiveStatus": { "S": "Deactive" }
        //     //         }
        //     //     }
        //     // }

        //     // if (usertype === "doctor") {
        //     //     data = {
        //     //         "TableName": "UserDetail",
        //     //         "KeyConditionExpression": "PK = :v_PK",
        //     //         "FilterExpression": "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
        //     //         "ExpressionAttributeValues": {
        //     //             ":v_PK": { "S": "DEVICE_BP_READING" },
        //     //             ":v_GSI1SK": { "S": "DEVICE_BP_" + userid },
        //     //             ":v_ActiveStatus": { "S": "Deactive" }
        //     //         }
        //     //     }
        //     // }


        //     // if (usertype === "admin") {
        //     //     data = {
        //     //         "TableName": "UserDetail",
        //     //         "KeyConditionExpression": "PK = :v_PK",
        //     //         "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
        //     //         "ExpressionAttributeValues": {
        //     //             ":v_PK": { "S": "DEVICE_BP_READING" },
        //     //             ":v_ActiveStatus": { "S": "Deactive" }
        //     //         }
        //     //     }
        //     // }

        //     axios.post('https://api.iglucose.com/readings/', data, {
        //         headers: {
        //             Accept: "application/json, text/plain, */*",
        //             // "Content-Type": "application/json",
        //             Authorization: "Bearer " + token
        //         }
        //     }
        //     ).then((response) => {
        //         const responseData = response.data;
        //         const dataSetbp = [];
        //         const reading = responseData.readings;

        //         reading.forEach((bp, index) => {
        //             console.log('p' + index, bp);
        //             let bpdata = {};

        //             bpdata.id = index;

        //             if (bp.reading_type == "blood_pressure") {
        //                 if (bp.GSI1PK !== undefined) {
        //                     bpdata.gSI1PK = bp.GSI1PK.s;
        //                 }

        //                 bpdata.username = username;
        //                 if (bp.systolic_mmhg !== undefined) {
        //                     bpdata.systolic = bp.systolic_mmhg;
        //                 }

        //                 if (bp.diastolic_mmhg !== undefined) {
        //                     bpdata.diastolic = bp.diastolic_mmhg;
        //                 }
        //                 if (bp.pulse_bpm !== undefined) {
        //                     bpdata.pulse = bp.pulse_bpm;
        //                 }

        //                 if (bp.date_recorded !== undefined) {
        //                     bpdata.date_recorded = bp.date_recorded;
        //                 }

        //                 if (bp.date_received !== undefined) {
        //                     bpdata.date_received = bp.date_received;
        //                 }

        //                 if( bp.TimeSlots !== undefined){
        //                     bpdata.timeSlots = bp.TimeSlots.s;
        //                 }

        //                 if (bp.MeasurementDateTime !== undefined) {
        //                     bpdata.measurementDateTime = bp.MeasurementDateTime.s;
        //                 }

        //                 if (bp.batteryVoltage !== undefined) {
        //                     bpdata.batteryVoltage = bp.batteryVoltage.s;
        //                 }

        //                 if (bp.signalStrength !== undefined) {
        //                     bpdata.signalStrength = bp.signalStrength.s;
        //                 }
        //                 if (bp.actionTaken !== undefined) {
        //                     bpdata.actionTaken = bp.ActionTaken.s;
        //                 }
        //             }

        //             dataSetbp.push(bpdata);
        //         });

        //         setbloodpressureData(dataSetbp);
        //     })
        // }

    }

    const fetchBloodGlucose = (userid, usertype) => {
        const token = localStorage.getItem('app_jwt');
        const isAuth = localStorage.getItem('app_isAuth');
        if (isAuth === 'yes') {
            setIsAuthenticated(true);
            setJwt(token);
            setUserId(userId);
        }
        else {
            relogin();
        }

        let data = "";
        if (usertype === "patient") {
            data = {
                "TableName": "UserDetail",
                "IndexName": "Patient-Doctor-Device-Index",
                "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
                "KeyConditionExpression": "GSI1PK = :v_PK",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_BG_" + userid },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }

        if (usertype === "doctor") {
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK",
                "FilterExpression": "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_BG_READING" },
                    ":v_GSI1SK": { "S": "DEVICE_BG_" + userid },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }


        if (usertype === "admin") {
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK",
                "FilterExpression": "ActiveStatus <> :v_ActiveStatus",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "DEVICE_BG_READING" },
                    ":v_ActiveStatus": { "S": "Deactive" }
                }
            }
        }

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/getitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            const bloodglucoseData = response.data;
            const dataSetbg = [];


            bloodglucoseData.forEach((bg, index) => {
                //   console.log('p' + index, bg);
                let bgdata = {};
                bgdata.id = index;
                bgdata.gSI1PK = bg.GSI1PK.s;
                bgdata.username = bg.UserName.s;
                if (bg.reading !== undefined) {
                    bgdata.reading = bg.reading.n;
                }
                bgdata.battery = bg.battery.n;
                bgdata.timeSlots = bg.TimeSlots.s;
                bgdata.date_recorded = bg.date_recorded.s;

                if (bg.reading_id !== undefined) {
                    bgdata.reading_id = bg.reading_id.n;
                }
                bgdata.actionTaken = bg.ActionTaken.s;
                if (bg.before_meal.bool) bgdata.meal = "Before Meal";
                if (!bg.before_meal.bool) bgdata.meal = "After Meal";

                dataSetbg.push(bgdata);
            });

            setbloodglucoseData(dataSetbg);
        })

    }


    const backUpMessages = () => {
        axios.get('/backup-messages').then((response) => {
            const messages = response.data.messages;
            // console.log(response.data);
            const inb = messages.filter(message => message.direction === 'inbound');
            let inbs = [];
            let outbs = [];
            let iset = new Set();
            inb.forEach(imessage => {
                //     alert(iset.has(imessage.from));
                if (!iset.has(imessage.from)) {
                    iset.add(imessage.from);
                    inbs.push(imessage);
                }
            });
            setInbox(inbs);
            const out = messages.filter(message => message.direction === 'outbound-api');

            let oset = new Set();
            out.forEach(omessage => {
                if (!oset.has(omessage.to)) {
                    oset.add(omessage.to);
                    outbs.push(omessage);
                }
            });
            setOutbox(outbs);
        });;
    }

    const fetchMessages = () => {
        axios.get('/messages').then((response) => {
            const messages = response.data.messages;
            //  console.log(response.data);
            const inb = messages.filter(message => message.direction === 'inbound');
            let inbs = [];
            let outbs = [];
            let iset = new Set();
            inb.forEach(imessage => {
                //     alert(iset.has(imessage.from));
                if (!iset.has(imessage.from)) {
                    iset.add(imessage.from);
                    inbs.push(imessage);
                }
            });
            setInbox(inbs);
            const out = messages.filter(message => message.direction === 'outbound-api');

            let oset = new Set();
            out.forEach(omessage => {
                if (!oset.has(omessage.to)) {
                    oset.add(omessage.to);
                    outbs.push(omessage);
                }
            });
            setOutbox(outbs);
        });
    }

    return <CoreContext.Provider value={{
        patients,
        bgData,
        bpData,
        wsData,
        deviceData,
        providerData,
        ccData,
        coachData,
        thresoldData,
        bloodglucoseData,
        bloodpressureData,
        weightData,
        weightApiData,
        fetchDeviceData,
        login,
        fetchPateintListfromApi,
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
        fetchThresold,
        backUpMessages,
        renderLoader,
        checkLocalAuth,
        addDevice,
        UpdateProfie,
        DeletePatient,
        userDetails,
        fetchProviders,
        addProvider,
        UpdateThreshold,
        fetchCareCoordinator,
        fetchCoach,
        addCareCoordinator,
        addCoach,
        UpdatePatient,
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
        careCoordinatorOptions
    }}
    >
        {props.children}
    </CoreContext.Provider>
}


export default CoreContextProvider;