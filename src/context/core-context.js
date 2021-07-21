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


    const fetchWSData = (userid, usertype) => {

      
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
                    ":v_PK": { "S": "DEVICE_BP_READING" },
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
            const dataSetwt = [];


            weightData.forEach((wt, index) => {
                //   console.log('p' + index, bg);
                let wtdata = {};
                wtdata.id = index;
                wtdata.gSI1PK = wt.GSI1PK.s;
                wtdata.username = wt.UserName.s;
                if (wt.DeviceId !== undefined) {
                    wtdata.DeviceId = wt.DeviceId.n;
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
                }
                if (wt.CreatedDate !== undefined) {
                    wtdata.CreatedDate = wt.CreatedDate.s;
                    wtdata.CreatedDate = new Date(wtdata.CreatedDate);
                }
               
               // bpdata.date_recorded = bp.date_recorded.s;

                if (wt.reading_id !== undefined) {
                    wtdata.reading_id = wt.reading_id.n;
                }
                wtdata.actionTaken = wt.ActionTaken.s;
              
                dataSetwt.push(wtdata);
            });

            setweightData(dataSetwt);
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
        return ent[0];
    }

    const UpdatePatient = (name, phone, birthDate, height, provider, coordinator, coach, patientId) => {
        console.log(name);
        const token = localStorage.getItem('app_jwt');
        let doctor_id = provider;
        let carecoordinator_id = coordinator;
        let carecoordinatorname = fetchNameFromId(coordinator, careCoordinatorOptions);
        let coachname = fetchNameFromId(coach, coachOptions);
        let coach_id = coach;
        const data = {
            "TableName": "UserDetail",
            "Key": {
                "PK": { "S": "patient" },
                "SK": { "S": "PATIENT_" +patientId }
            },
            "UpdateExpression":"SET GSI1SK = :v_GSI1SK, GSI1PK = :v_GSI1PK, UserName = :v_username, ContactNo = :v_mobile, DOB = :v_DOB, Height = :v_Height,CarecoordinatorName = :v_CarecoordinatorName, CarecoordinatorId = :v_CarecoordinatorId,CoachId = :v_CoachId,Coach = :v_CoachName",
            "ExpressionAttributeValues":{":v_GSI1SK":{"S":"Select Provider"},
            ":v_GSI1PK":{"S":"patient"},
            ":v_username":{"S": name},
            ":v_mobile":{"S":phone},
            //":v_IMEI":{"S":""+patient_emei+""},
            // ":v_BMI":{"S":""+patient_bmi+""},
            ":v_DOB":{"S":"" + birthDate + ""},
            ":v_Height":{"S":"" + height + ""},
            ":v_CarecoordinatorId":{"S":"" + carecoordinatorname.id + ""},
            ":v_CoachId":{"S": "" + coachname.name + ""},
            ":v_CarecoordinatorName":{"S": "" + carecoordinatorname.name + ""},
            ":v_CoachName":{"S": "" + coachname.name + ""}

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
            if (response.data === "Updated") {
                alert("Patient data Update Successfully.");
            }else
            {
                alert("Patient data did not Update  Successfully.");
            }
        });
    }

    const DeletePatient = (patientId) => {
        const token = localStorage.getItem('app_jwt');

        const data = {
            "TableName": "UserDetail",
            "Key": {
                "SK": { "S": "PATIENT_" +patientId },
                "PK": { "S": "patient" }
            },
            "UpdateExpression": "SET ActiveStatus = :v_ActiveStatus",
            "ExpressionAttributeValues": { ":v_ActiveStatus": { "S": "Deactive" } }
        };

        axios.post('https://api.apatternplus.com/api/DynamoDbAPIs/updateitem', data, {
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            if (response.data === "Updated") {
                alert("Patient Deleted Successfully.");
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

        const token = localStorage.getItem('app_jwt');
        
        let data = {
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
        if(usertype =="admin")
        {
            
            data = {
                "TableName": "UserDetail",
                "KeyConditionExpression": "PK = :v_PK AND begins_with(SK, :v_SK)",
                "FilterExpression": "DeviceStatus = :v_status",
                "ExpressionAttributeValues": {
                    ":v_PK": { "S": "patient" },
                    ":v_SK": { "S": "DEVICE_" },
                    ":v_status": { "S": "Active" }
                }
        }}
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

                if(p.DeviceId !=undefined){
                    devicedata.deviceID = p.DeviceId.s;
                }
                if(p.DeviceType !=undefined){
                    devicedata.DeviceType = p.DeviceType.s;
                }
                if(p.GSI1PK !=undefined){
                    devicedata.patientId = p.GSI1PK.s;
                  
                    if(patients.length >0){
                        let patient = patients.filter(p => p.ehrId === devicedata.patientId);
                        if(patient.length >0 ) devicedata.username =patient[0].name;
                    }else{
                        devicedata.username=username;
                    }
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


    const fetchBloodPressure = (userid, usertype) => {
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
                    ":v_PK": { "S": "DEVICE_BP_" + userid },
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
                    ":v_PK": { "S": "DEVICE_BP_READING" },
                    ":v_GSI1SK": { "S": "DEVICE_BP_" + userid },
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
                    ":v_PK": { "S": "DEVICE_BP_READING" },
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
            const bloodpressureData = response.data;
            const dataSetbp = [];


            bloodpressureData.forEach((bp, index) => {
                //   console.log('p' + index, bg);
                let bpdata = {};
                bpdata.id = index;
                bpdata.gSI1PK = bp.GSI1PK.s;
                bpdata.username = bp.UserName.s;
                if (bp.reading !== undefined) {
                    bpdata.reading = bp.reading.n;
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
                    bpdata.pulse = bp.pulse.n;
                }
                if (bp.battery !== undefined) {
                    bpdata.battery = bp.battery.n;
                }
                if (bp.TimeSlots !== undefined) {
                    bpdata.timeSlots = bp.TimeSlots.s;
                   
                }
                if (bp.MeasurementDateTime !== undefined) {
                    bpdata.MeasurementDateTime =  bp.MeasurementDateTime.s;
                    bpdata.MeasurementDateTime = new Date(bpdata.MeasurementDateTime);
                }
                if (bp.CreatedDate !== undefined) {
                    bpdata.CreatedDate = bp.CreatedDate.s;
                    bpdata.CreatedDate =  new Date(bpdata.CreatedDate);
                }
               
               // bpdata.date_recorded = bp.date_recorded.s;

                if (bp.reading_id !== undefined) {
                    bpdata.reading_id = bp.reading_id.n;
                }
                bpdata.actionTaken = bp.ActionTaken.s;
              
                dataSetbp.push(bpdata);
            });

            setbloodpressureData(dataSetbp);
        })

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