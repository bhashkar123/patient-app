/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CoreContext } from '../context/core-context';
import { GenderMale, GenderFemale, PencilSquare,  Trash } from 'react-bootstrap-icons';
import DatePicker from "react-datepicker";
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "react-datepicker/dist/react-datepicker.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import Input from './common/Input';
import { useStopwatch } from 'react-timer-hook';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import IonRangeSlider from 'react-ion-slider';
import { DataGrid } from '@material-ui/data-grid';

import {Weight} from './Weight';
import {BloodGlucose} from './BloodGlucose';
import { BloodPressure } from './BloodPressure';
import { BloodPressureAverage } from './BloodPressureAverage';
import { BloodGlucoseAverage } from './BloodGlucoseAverage';
import {WeightAverage} from './WeightAverage';
import Moment from 'moment';
import context from 'react-bootstrap/esm/AccordionContext';
import { Thresold } from './Thresold';
import Alert from './common/Alert';



const PatientSummary  = props =>  {
    
    
    const coreContext = useContext(CoreContext);
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const [showNotesTextBox, setShowNotesTextBox] = useState(false);
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [bgMin, setBgMin] = useState(0);
    const [bgMax, setBgMax] = useState(0);
    const [bmiMin, setBmiMin] = useState(0);
    const [bmiMax, setBmiMax] = useState(0);
    const [PatientId, setPatientId] = useState("");
    const [t1,sett1]=useState("");

    const [diastolicMin, setDiastolicMin] = useState(0);
    const [diastolicMax, setDiastolicMax] = useState(0);

    const [systolicMin, setSystolicMin] = useState(0);
    const [systolicMax, setSystolicMax] = useState(0);

    const [weightMin, setWeightMin] = useState(0);
    const [weightMax, setWeightMax] = useState(0);

    const [patient, setPatient] = useState('');
    const [patientId, setpatientId] = useState('');
    const [message, setMessage] = useState('');
    const [threadMobile, setThreadMobile] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [thData, setThData] = useState([]);
    const [timerLogs, setTimerLog] = useState([]);
    const [taskType, setTaskType] = useState('');
    const [performedBy, setPerformedBy] = useState('');
    const [endDT, setendDT] = useState('');
    const [startDT, setstartDT] = useState('');
    const [totalLogtime, settotalLogtime] = useState(0);

    
    const greeting = 'Welcome to React';
    const [Prompt,setDirty, setPristine] = Alert();
    
    const fetchCareCoordinator = () => {
        const patientId = props.match.params.patient;
        setPatientId(patientId);
        coreContext.fetchCareCoordinator();
    }
    useEffect(fetchCareCoordinator, []);

    const fetchProviders = () => {
        const patientId = props.match.params.patient;
        setPatientId(patientId);
        coreContext.fetchProviders();
    }
    useEffect(fetchProviders, [coreContext.providerData.length]);
    const fetchCoach = () => {
        const patientId = props.match.params.patient;
        setPatientId(patientId);
        coreContext.fetchCoach();
    }

    useEffect(fetchCoach, []);


const tt=[...coreContext.providerData,...coreContext.ccData,...coreContext.coachData]





   
    const fetchPatient = () => {
        const patientId = atob(props.match.params.patient);
        const usertype = localStorage.getItem("userType");
        setUserType(localStorage.getItem("userType"));
        setUserId(localStorage.getItem("userId"));
        setUserName(localStorage.getItem("userName"));
        setpatientId(patientId);
        //let patientData = JSON.parse(localStorage.getItem('app_patient'));

        //setPatient(patientData);
        coreContext.fetchPatientListfromApi('patient', patientId);
        
        coreContext.fetchThresold("PATIENT_" + patientId, userType);

        coreContext.fetchTimeLog("PATIENT_" + patientId);
        console.log("PATIENT_" + patientId)
        let totaltime=0
        console.log("Sahil")
        console.log("akshy")
        coreContext.timeLogData.map((curr)=>{
            totaltime=totaltime+ Moment.duration(curr.timeAmount).asMinutes()
        })
        console.log(coreContext.timeLogData)
        
        console.log("totaltime",totaltime)    

        //coreContext.fetchTaskTimerUser();

        coreContext.fetchDeviceData("PATIENT_" + patientId);
        /// setting default value
        if (coreContext.thresoldData.length === 0) {
            let thdata = {};
            const thDatas = [];
            thdata.Element_value = 'Blood Glucose';
            thdata.bg_low = 0;
            thdata.bg_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'BMI';
            thdata.bmi_low = 0;
            thdata.bmi_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Diastolic';
            thdata.diastolic_low = 0;
            thdata.diastolic_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Systolic';
            thdata.systolic_high = 0;
            thdata.systolic_low = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Weight';
            thdata.weight_low = 0;
            thdata.weight_high = 10;
            thDatas.push(thdata);
            setThData(thDatas);
        }
        else {
            setThData(coreContext.thresoldData);

            var bgdata = coreContext.thresoldData.filter(a => a.Element_value === 'Blood Glucose');

            if (bgdata.length >0) {
                setBgMin(bgdata[0].bg_low);
                setBgMax(bgdata[0].bg_high);
            }
            else {
                setBgMin(0);
                setBgMax(0);
            }

            var bpdata = coreContext.thresoldData.filter(a => a.Element_value === 'BMI');
            if (bpdata.length >0 ) {
                setBmiMin(bpdata[0].bmi_low);
                setBmiMax(bpdata[0].bmi_high);
            }
            else {
                setBmiMin(0);
                setBmiMax(0);
            }

            var dialostic = coreContext.thresoldData.filter(a => a.Element_value === 'DIASTOLIC');

            if (dialostic.length > 0) {
                setDiastolicMin(dialostic[0].diastolic_low);
                setDiastolicMax(dialostic[0].diastolic_high);
            }
            else {
                setDiastolicMin(0);
                setDiastolicMax(0);
            }

            var systolic = coreContext.thresoldData.filter(a => a.Element_value === 'SYSTOLIC');
            if (systolic.length >0) {
                setSystolicMin(systolic[0].systolic_low);
                setSystolicMax(systolic[0].systolic_high);
            }
            else {
                setSystolicMin(0);
                setSystolicMax(0);
            }

            var weight = coreContext.thresoldData.filter(a => a.Element_value === 'Weight');

            if (weight.length >0) {
                setWeightMin(weight[0].weight_low);
                setWeightMax(weight[0].weight_high);
            }
            else {
                setWeightMin(0);
                setWeightMax(0);
            }

        }

    }

    useEffect(fetchPatient, [coreContext.thresoldData.length]);

    //useEffect(fetchPatient, [coreContext.timeLogData.length]);
    

    //useEffect(fetchPatient, [coreContext.patient]);

    useEffect(coreContext.checkLocalAuth, []);


    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

   

    const onBGChange = (e) => {
        setBgMin(e.from);
        setBgMax(e.to);
        console.log(e.from, e.to);
    }

    const onBMIChange = (e) => {
        setBmiMin(e.from);
        setBmiMax(e.to);
    }



    const onDiastolicChange = (e) => {
        setDiastolicMin(e.from);
        setDiastolicMax(e.to);
    }
    const onSystolicChange = (e) => {
        setSystolicMin(e.from);
        setSystolicMax(e.to);
    }
    const onWeightChange = (e) => {
        setWeightMin(e.from);
        setWeightMax(e.to);
    }

    const columns = [
        { field: 
          'taskType', 
          headerName: 'Task Type', 
          width: 200 ,  
          type: 'string'},
        {
          field: 'performedBy',
          headerName: 'Performed By',
          type: 'number',
          editable: false,
          width: 200
        },
        {
            field: 'performedOn',
            headerName: 'Performed On',
            width: 110,
            editable: false,
            width: 500
          },
          {
            field: 'timeAmount',
            headerName: 'Time Amount',
            editable: false,
            type: Number,
            width: 200
          },
          {
            field: 'startDT',
            headerName: 'Start Date',
            width: 200,
            editable: false
           
          },
          {
            field: 'endDT',
            headerName: 'End Date',
            editable: false,
            width: 200
          },
      ];
      

      const renderTimelogs = () =>{
        if (coreContext.timeLogData.length > 0) {
            return coreContext.timeLogData.map((tl, index) => {
                return <tr>
                    <td>{tl.taskType} </td>
                    <td>{tl.performedBy} </td>
                    <td>{tl.performedOn} </td>
                    <td>{tl.timeAmount} </td>
                    <td>{tl.startDT} </td>
                    <td>{tl.endDT} </td>
                </tr>
            });
        }
    }  


    const renderTaskTimer = () =>{
        if (coreContext.tasktimerUserData.length > 0) {
            return coreContext.tasktimerUserData.map((tl, index) => {
                return <tr>
                    <td>{tl.user_id} </td>
                    <td>{tl.user_name} </td>
                </tr>
            });
        }
    }  
       
     
       
    // const renderTimelogs = () =>{
    //     if (timerLogs.length > 0){
    //       //  timerLogs  = timerLogs.sort((a,b) => new Moment(b.startDT) - new Moment(a.startDT));
    //       return (
    //           <div style={{ height: 680, width: '100%' }}>
    //             <DataGrid
    //               rows={timerLogs}
    //               columns={columns}
    //               pageSize={10}
    //             />
    //           </div>
    //         );
    //       }
   
    // }
   // const deleteDevice = (patient) => {
     //   alert('Hi how are you');
        //coreContext.DeletePatient(patient.userId)
  //  }

    const deleteDevice = (deviceData) => {
        coreContext.DeleteDeviceData(deviceData.id);
    }


    const renderDeviceData = () => {
        if (coreContext.deviceData.length > 0) {
            return coreContext.deviceData.map((deviceData, index) => {
                return <tr>
                    <td>{deviceData.DeviceType} </td>
                    <td>{deviceData.deviceID} </td>
                    <td> {deviceData.Action} <a style={{  marginRight: '5px' }} href="#" onClick={() => deleteDevice(deviceData)}>  <Trash /></a></td>
                </tr>
            
            });
        }

    }

const renderThreads = () => {
        if (coreContext.threads.length > 0) {
            return coreContext.threads.map((message => {
                return <div style={{ fontWeight: 'bold', lineHeight: 1 }} className="card-body"><span className={message.direction === 'inbound' ? 'float-left' : 'float-right'}>{message.body}</span><br />
                    <span className={message.direction === 'inbound' ? 'float-left' : 'float-right'} style={{ fontSize: 8 }}>Time : {message.date}</span>
                </div>

            }))
        }
    }

    const onSendMessage = () => {
        axios.post('send-sms', { mobilePhone: threadMobile, message }).then(response => {
            const status = response.data.status;
            if (status.trim() === 'success') {
                //coreContext.fetchMessages();
                //coreContext.fetchThreadMessages('from', threadMobile);
            }
        }).catch(() => alert('Message Sending failed'));
    }

    const renderTopDetails = () => {
        if (coreContext.patient)
            return <div className="row">
                <div className="col-md-3" style={{ fontWeight: 'bold' }}>{coreContext.patient.name}</div>
                <div className="col-md-3" style={{ fontWeight: 'bold' }}>{'DOB : ' + coreContext.patient.dob}</div>
                <div className="col-md-2" style={{ fontWeight: 'bold' }}>{coreContext.patient.gender === 'Male' ? <GenderMale /> : <GenderFemale />}{coreContext.patient.gender}</div>
                <div className="col-md-4" style={{ fontWeight: 'bold' }}>EHR ID : {coreContext.patient.ehrId}</div>
            </div>
    }

    const renderAddModifyFlags = () => {
        if (coreContext.patient)
            return <div className="row">
                <div className="col-md-3">Flags : <PencilSquare /></div>
            </div>
    }



    const renderAddNotes = () => {
        if (coreContext.patient)
            return <div className="card" style={{ backgroundColor: '#b8b133' }}>
                <div className='card-body' onClick={() => setShowNotesTextBox(true)}> {showNotesTextBox ? <input type="text" className='form-control' placeholder='Enter notes' value={notes} onChange={e => setNotes(e.target.value)} /> : 'Click here to add some notes for the patient'} </div>
            </div>
    }


    const renderExpandCollapse = () => {
        if (coreContext.patient)
            return <div className="row">
                <div className="col-md-3">  <a href='#'>Expand All</a></div>
                <div className="col-md-3">  <a href='#'>Collapse All</a></div>
            </div>
    }

    const renderPatientinformation = () => {
        if (coreContext.patients.length >0 ){
            coreContext.patient = coreContext.patients[0];
        }
        if (coreContext.patient ){
            localStorage.setItem('ehrId',coreContext.patient.ehrId );
            return <div className="row" style={{ marginLeft: '10px', backgroundColor: 'white' }}>
                <MDBCard className="border row col-md-6" >
                    <MDBCardBody>
                        <MDBCardTitle>Patient Information</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                <b style={{ paddingRight: '10px' }}>Height:</b>{coreContext.patient.height}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Weight:</b>{coreContext.patient.Weight}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>BMI      :</b>   {coreContext.patient.BMI}
                            </div>
                        </MDBCardText>

                    </MDBCardBody>
                </MDBCard>
                <MDBCard className="border row col-md-6">
                    <MDBCardBody>
                        <MDBCardTitle>Care Team</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                <b style={{ paddingRight: '10px' }}>Provider Name:</b>{coreContext.patient.ProviderName}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Care Coordinator:</b>{coreContext.patient.CareName}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Coach     :</b>  {coreContext.patient.CoachName}
                            </div>
                        </MDBCardText>

                    </MDBCardBody>
                </MDBCard>
            </div>
       }    

}

    
    const [timelogIdCounter, settimelogIdCounter] = useState(1);

    const handleSelect  = (index) => {
        console.log(index);
        let _timerLog = {};
        if(index ==7) {
           setstartDT(new Date());
        }
        if(index !=7){
            setendDT(new Date());
        }

        if(index ==8){
            pause();//
          
            // after pause then should add in list.
            _timerLog.id = timelogIdCounter;
            _timerLog.taskType = taskType;
            _timerLog.performedBy = performedBy;
            _timerLog.performedOn = Moment(date).format('MMM-DD-YYYY hh:mm:ss A') ;
            _timerLog.timeAmount = minutes +":"+ seconds;
            _timerLog.startDT = Moment(startDT).format('MMM-DD-YYYY hh:mm:ss A') ; 
            _timerLog.endDT = Moment(endDT).format('MMM-DD-YYYY hh:mm:ss A') ; 
            _timerLog.username = userName;
           
            if(_timerLog.performedOn !=="Invalid date")
            {
                coreContext.timeLogData.push(_timerLog);
            }
            //timerLogs.push(_timerLog);
            
           
            //setTimerLog(timerLogs);
            console.log(index);
            if(totalLogtime  > 0){
                settotalLogtime(totalLogtime + seconds);
            }else {
                settotalLogtime(seconds);
            }
            settimelogIdCounter(timelogIdCounter+1);
           
        
        }
    }
    
    const handleLeaveTab  = (index) => {
        if(index ==7){
            console.log('leave');
            console.log(index +'leave');
        }
    }

    function doSomething(value) {

        console.log("doSomething called by child with value:", value);
      }

    const renderTabs = () => {
        if (coreContext.patient)
            return <Tabs  onSelect={index => handleSelect(index)} onMouseLeave={index => handleLeaveTab(index)}>
                <TabList>
                    <Tab onClick={pause}>Conditions</Tab>
                    <Tab onClick={pause}>Programs</Tab>
                    <Tab onClick={pause}>Assesments</Tab>
                    <Tab onClick={pause}>Clinical Data</Tab>
                    <Tab onClick={pause}>Billing</Tab>
                    <Tab onClick={pause}>Alerts</Tab>
                    <Tab onClick={pause}>Documents</Tab>
                    <Tab onClick={reset}>Task Timer</Tab>
                    {/* <Tab onClick={pause}>Time Logs</Tab> */}
                    <Tab eventKey={'TimeLog'}>Time Logs</Tab>
                    <Tab onClick={pause}>Devices</Tab>
                    <Tab onClick={pause}>Portal</Tab>
                </TabList>

                <TabPanel>
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
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Programs
                        </h4>
                        <div className="card-body">
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="primary">CCM</Button>
                                <Button variant="secondary">RPM</Button>
                            </ButtonGroup>
                            <table className='table table-bordered table-sm'>
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
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Assesments
                        </h4>
                        <div className="card-body">
                            This patient does not yet have any assessments.
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Clinical Data
                        </h4>
                        <div className="card-body">
                            <Tabs>
                                <TabList>
                                    <Tab onClick={pause}>Allergies</Tab>
                                    <Tab onClick={pause}>Lab Results</Tab>
                                    <Tab onClick={pause}>Medications</Tab>
                                    <Tab onClick={pause}>Vitals</Tab>
                                </TabList>
                                <TabPanel>
                                    Allergies
                                </TabPanel>
                                <TabPanel>
                                    Lab Results
                                </TabPanel>
                                <TabPanel>
                                    Medications
                                </TabPanel>
                                <TabPanel>
                                    <Tabs>
                                        <TabList>
                                            <Tab onClick={pause}>Blood Pressure</Tab>
                                            <Tab onClick={pause}>Blood Pressure Average</Tab>
                                            <Tab onClick={pause}>Blood Glucose</Tab>
                                            <Tab onClick={pause}>Blood GLucose Average</Tab>
                                            <Tab onClick={pause}>Weight</Tab>
                                            <Tab onClick={pause}>Weight Average</Tab>
                                            <Tab onClick={pause}>Thresold</Tab>
                                        </TabList>
                                        <TabPanel>
                                        <div className='card'>
                                             {/* <BloodPressure ></BloodPressure> */}
                                             <BloodPressure doSomething={doSomething} value={1}></BloodPressure>
                                        </div>
                                           

                                        </TabPanel>
                                        <TabPanel>
                                        <div className='card'>
                                             <BloodPressureAverage/>
                                             </div>
                                           

                                        </TabPanel>
                                        <TabPanel>
                                        <div className='card'>
                                            <BloodGlucose></BloodGlucose>
                                             {/* <h4 className="card-header">Blood Glucose</h4>
                                         <div className="card-body">
                                             {renderVitalDataBG()}
                                        </div> */}
                                        </div>
                                        </TabPanel>
                                        <TabPanel>
                                        <div className='card'>
                                             <BloodGlucoseAverage/>
                                        </div>
                                           

                                        </TabPanel>
                                        <TabPanel>
                                        <div className="card-body">
                                            <Weight></Weight>
                                            
                                        </div>
                                        </TabPanel>
                                        <TabPanel>
                                        <div className='card'>
                                             
                                             <WeightAverage/>
                                        </div>
                                           

                                        </TabPanel>
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
                            <Button className="mr-4" size="sm" variant="danger">New Allergy</Button>   <input type="checkbox" />  Patient has no allergies.
                            <table className='table table-bordered table-sm mt-4'>
                                <th>Allergy</th>
                                <th>Category</th>
                                <th>Reaction</th>
                                <th>Active</th>
                                <th>Critical</th>
                                <th>Date Identified</th>
                                <th>Actions</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Billing
                        </h4>
                        <div className="card-body">
                            Status Filter <br />
                            <select name="" id="">
                                <option value="">Ready to Bill</option>
                            </select>
                            <br /><br />
                            <table className='table table-bordered table-sm mt-4'>
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
                        <h4 className="card-header">
                            Alert
                        </h4>
                        <div className="card-body">
                            Date Range <br />
                            <input type="text" className="form-control" placeholder="" />
                            <br /><br />
                            <table className='table table-bordered table-sm mt-4'>
                                <th>Priority</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>View</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Document
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">Document Type</div>
                                <div className="col-md-3">Date Range</div>
                                <div className="col-md-3">Search</div>
                                <div className="col-md-3">Upload File</div>
                            </div>
                            <br /> <br />

                            <table className='table table-bordered table-sm mt-4'>
                                <th>Document Type</th>
                                <th>Document Description</th>
                                <th>Document Date</th>
                                <th>Actions</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Task Timer
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        Task Type 
                                        <select value={(t1==='Other')?t1:taskType} onChange={e => {setTaskType(e.target.value);setDirty();sett1(e.target.value);}} className="form-control mb-2 mr-sm-2">
                                            <option value="SelectTask">Select a Task Type</option>
                                            <option value="CaseCoordination">Case Coordination</option>
                                            <option value="CarePlanReconciliation">Care Plan Reconciliation</option>
                                            <option value="Other">Others...</option>
                                        </select>
                                        
                                        {console.log("sahil",taskType)}
                                        {(t1==='Other')?
   
    <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter other value.." value={taskType}  onChange={(e)=>setTaskType(e.target.value)}/>
  :null}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            Performed By
                                            {/* {renderTaskTimer()} */}
                                            <select value={performedBy} onChange={e => {setPerformedBy(e.target.value);setDirty();}} className="form-control mb-2 mr-sm-2">
                                                <option value="SelectUser">Select a User</option>
                                                {tt.map((curr)=>{
                                                    return <option value={(!curr.name)?curr.provider:curr.name}> {(!curr.name)?curr.provider:curr.name}</option>
                                                })}
                                                
                                               
                                                
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            Performed On
                                            <DatePicker className='form-control mt-2'
                                                selected={date}
                                               // onChange={(date) => setDate(date)}
                                                onChange={(date) => {setDate(date);setDirty();}}
                                                placeholderText='Enter a date'
                                                dateFormat='MM/dd/yyyy'
                                            />
                                        </div>
                                    </div>
                                </div>
                                 
                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel >
                    <div className="card">
                        <h4 className="card-header">
                            Time Logs
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    Total Time Logs (min: sec): {totalLogtime}
                                </div>
                            </div>

                            {/* {renderTimelogs()} */}
                            <table className='table table-bordered table-sm mt-4'>
                                <tr>
                                    <th>Task Type</th>
                                    <th>Performed By</th>
                                    <th>Performed On</th>
                                    <th>Time Amount</th>
                                    <th>Start Date/Time</th>
                                    <th>End Date/Time</th>
                                </tr>

                                <tbody>
                                            {renderTimelogs()}
                                        </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Devices
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">Enable Measurements</div>
                                <div className="col-md-3"><input type="text" className="form-control" placeholder="Select one to add" /></div>

                            </div>
                            <br />

                            <table className='table table-bordered table-sm mt-4'>
                                <th>Enabled Metric</th>
                                <th>Description</th>
                                <th>Device</th>
                                <th>Actions</th>
                            </table>
                            <br />

                            <div className="row">
                                <div className="col-md-8">
                                    <h6><span className="badge badge-primary">Provider Registered Devices</span></h6>
                                    <table className="table table-bordered table-striped table-hover table-sm">
                                        <thead>
                                            <tr>
                                                <th>Device Name</th>
                                                <th>Device ID</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderDeviceData()}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-4">
                                    <form>
                                        <h6><span className="badge badge-primary"> Add a Device</span></h6>
                                        <select value={deviceType} onChange={e => setDeviceType(e.target.value)} className="form-control mb-2 mr-sm-2">
                                            <option value="">Select Device</option>
                                            <option value="BP">Blood Pressure</option>
                                            <option value="BG">Blood Glucose</option>
                                            <option value="WS">Weight</option>
                                        </select>
                                        <input type="text" value={deviceId} onChange={e => setDeviceId(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter device ID " />
                                        <button type='button' onClick={() => coreContext.addDevice(deviceType, deviceId, patientId)} className="btn btn-primary mb-2">Add Device</button>
                                    </form>
                                </div>
                            </div>
                            <div className="card" style={{ backgroundColor: '#b8b133' }}>
                                <div className='card-body' onClick={() => setShowNotesTextBox(true)}> This patient has not any supplied devices to their portal. You will NOT be able to bill for 99453 or 99454. </div>
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
                        <h4 className="card-header">
                            Portal
                        </h4>
                        <div className="card-body">
                            Portal Status:   <Button variant="success">Enable Portal Status</Button>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
    }

    return (<div className='card'>
          <div className="btn btn-primary mb-2 float-right" style={{ backgroundColor: 'transparent' }} id="stopwatch">
                                                <span className="min-time"><span className="time-txt">min</span><span className="time-num">{minutes}</span></span>
                                                <span className="dots">:</span>
                                                <span className="sec-time"><span className="time-txt">sec</span><span className="time-num">{seconds}</span></span>
                                                <button id="startTimer" className="btn btn-sm btn-success" onClick={start}>Start</button>
                                                <button id="pauseTimer" className="btn btn-sm btn-warning" onClick={pause}>Pause</button>
                                                <button id="resetTimer" className="btn btn-sm btn-danger" onClick={reset}>Reset</button>
                                                <button type='button'  onClick={() => {coreContext.UpdateTimeLog( coreContext.timeLogData, patientId, userName );setPristine();setPerformedBy("");setTaskType("");setDate("");sett1("");}} className="btn btn-sm btn-success"> Update Time Log</button> 
                                            </div>
                                           
        <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderTopDetails()}</div>
        <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderAddModifyFlags()}</div>
        <div className="card-header">{renderAddNotes()}</div>

        <div className="row">
            <div className="col-md-8">
                <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderExpandCollapse()}</div>
                <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderPatientinformation()} </div>

            </div>
            <div className="col-md-4">
                <div style={{ fontSize: 12 }} className="card shadow p-3 mb-2 mt-3 bg-white rounded">
                    <div style={{ height: '140px', overflowY: 'auto' }}>
                        {renderThreads()}
                    </div>

                    <div>
                        <Form.Label>Send a reply</Form.Label>
                        <Form.Control autoFocus size="sm" as="textarea" rows={2} onChange={e => onSendMessage(e.target.value)} value={message} placeholder="Enter your message" />
                    </div>

                </div>
            </div>
        </div>
        {Prompt}
        <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderTabs()}</div>

    </div>)

};



export { PatientSummary }