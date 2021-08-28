/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { CoreContext } from '../context/core-context';
import { Bezier, Bezier2, Cash, GraphUp } from 'react-bootstrap-icons';
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-loader-spinner";
import Moment from 'moment'

const Dashboard = props => {
    const [date, setDate] = useState();
    const [zeromin, setZeroMin] = useState();
    const [ninemin, setNineMin] = useState();
    const coreContext = useContext(CoreContext);
    let zero=[];
            const nine=[];
            const nineteen=[];
            const thirtynine=[];
            const fiftynine=[];
            const sixty=[];
            const inactive=[];
    
    useEffect(coreContext.checkLocalAuth, []);
   
    const fetchPatients = () => {
        const email = localStorage.getItem('app_userEmail');
        coreContext.userDetails(email);
        const userType = localStorage.getItem("userType");
        const userId = localStorage.getItem("userId");
        coreContext.fetchPatientListfromApi(userType, userId);
        coreContext.fetchAllTimeLog();
    }
    useEffect(fetchPatients, []);

    const fetchdpatient=(p)=>{
      coreContext.getdp(p);
      //console.log(coreContext.dpatient)
        alert(p)
    }
   // useEffect(fetchdpatient, []);
   const setPatient = (p) => {
    console.log('sahil',p);
 //   coreContext.setPatient(p);
    localStorage.setItem('d_patient', JSON.stringify(p));
}
   

    const renderTimeLogs = () => {
        if (coreContext.AlltimeLogData.length == 0) {
            return (
                <div style={{ height: 680, width: '100%',display: 'flex',  justifyContent:'center', marginTop: '10px', alignItems:'center' }}>
                     <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
            /></div>
              );
        }
        if (coreContext.AlltimeLogData.length > 0) {
            
            
            coreContext.patients.map((curr)=>{
                let patientTimelog = coreContext.AlltimeLogData.filter(app =>
                    app.UserId == curr.userId);
                    
                    
                    if(patientTimelog.length > 0){
                        let totalTimeLog=0;
                     //   console.log(patientTimelog);
                        patientTimelog.map((timelog)=>{
                             totalTimeLog=Moment.duration(timelog.timeAmount).asMinutes()+totalTimeLog;
                        });
                        if(totalTimeLog>=0 && totalTimeLog<=60){
                                zero.push(curr.userId)
                        }
                        else if(totalTimeLog>=60 && totalTimeLog<=540){
                           // setOnetonine(onetonine+1)
                           nine.push(curr)
                           //nine=nine+1;
                            
                        }
                        else if(totalTimeLog>=600 && totalTimeLog<=1140){
                            // setOnetonine(onetonine+1)
                            nineteen.push(curr)
                            //nine=nine+1;
                             
                         }
                         else if(totalTimeLog>=1200 && totalTimeLog<=2340){
                            // setOnetonine(onetonine+1)
                            thirtynine.push(curr)
                            //nine=nine+1;
                             
                         }
                         else if(totalTimeLog>=2400 && totalTimeLog<=3540){
                            // setOnetonine(onetonine+1)
                            fiftynine.push(curr.userId)
                            //nine=nine+1;
                             
                         }
                         else if(totalTimeLog>=3600){
                            // setOnetonine(onetonine+1)
                            sixty.push(curr.userId)
                            //nine=nine+1;
                             
                         }
                      
                    }
                    else{
                            inactive.push(curr.userId)
                    }

            })
            

            return (
                <div style={{ height: 680, width: '100%' }}>
                
                </div>
              );
              
        }
    }

    // const fetchTokenfromApi = () => {
    //     coreContext.fetchTokenfromApi();
    //     localStorage.setItem('token', coreContext.idToken);
    // }

    //  useEffect(fetchTokenfromApi, [coreContext.idToken.length]);


    return (<div className='card' style={{marginLeft:"100px"}}>
        <div className="card-header row">
            <div className="col-md-5">
                <h4>A Pattern Medical Clinic Dashboard</h4>

            </div>
            {/* <div className="col-md-4">
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText='Enter a date'
                    dateFormat='dd/MM/yyyy'
                />
            </div> */}
            <div className="col-md-3">
                <input type="checkbox" />  Show Only My Patients
            </div>
        </div>
        <div className="card-body">
            <h5><Bezier />  Chronic Care Management</h5>
            <table className='table table-bordered table-sm'>
                <tr>
                    <th style={{ textAlign: 'center' }}>Patients Enrolled</th>
                    <th style={{ textAlign: 'center' }}>60+ Mins</th>
                    <th style={{ textAlign: 'center' }}>40-59 Mins</th>
                    <th style={{ textAlign: 'center' }}>20-39 Mins</th>
                    <th style={{ textAlign: 'center' }}>10-19 Mins</th>
                    <th style={{ textAlign: 'center' }}>1-9 Mins</th>
                    <th style={{ textAlign: 'center' }}>0 Mins</th>
                    <th style={{ textAlign: 'center' }}>Inactive</th>
                    <th style={{ textAlign: 'center' }}>Not Enrolled</th>
                </tr>
                {renderTimeLogs()}
            
                
                
                <tr>
                    <th style={{ textAlign: 'center' }}><a href="/patients">{coreContext.patients.length}</a> </th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients"onClick={() => setPatient(sixty)}>{sixty.length}</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients"onClick={() => setPatient(fiftynine)}>{fiftynine.length}</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients"onClick={() => setPatient(thirtynine)}>{thirtynine.length}</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients"onClick={() => setPatient(nineteen)}>{nineteen.length}</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients"onClick={() => setPatient(nine)}>{nine.length}</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients" onClick={() => setPatient(zero)}>{zero.length}</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients"onClick={() => setPatient(inactive)}>{inactive.length}</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/dpatients">{zeromin}</a></th>
                </tr>
            </table>
        </div>
        <div className="card-body">
            <h5><GraphUp />  Remote Patient Monitoring</h5>
            <table className='table table-bordered table-sm'>
                <tr>
                    <th style={{ textAlign: 'center' }}>Active</th>
                    <th style={{ textAlign: 'center' }}>Patients with Devices</th>
                    <th style={{ textAlign: 'center' }}>Patients taking Readings</th>
                    <th style={{ textAlign: 'center' }}>Qualified Supplied Device</th>
                    <th style={{ textAlign: 'center' }}>40+ Mins</th>
                    <th style={{ textAlign: 'center' }}>20-39 Mins</th>
                    <th style={{ textAlign: 'center' }}>1-19 Mins</th>
                    <th style={{ textAlign: 'center' }}>0 Mins</th>
                    <th style={{ textAlign: 'center' }}>Inactive</th>
                </tr>
                <tr>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                </tr>
            </table>
        </div>
        <div className="card-body">
            <h5><Cash />  Billing & Claims</h5>
            <table className='table table-bordered table-sm'>
                <tr>
                    <th style={{ textAlign: 'center' }}>Ready to Bill</th>
                    <th style={{ textAlign: 'center' }}>Missing Info</th>
                    <th style={{ textAlign: 'center' }}>Submitted</th>
                    <th style={{ textAlign: 'center' }}>On hold</th>
                </tr>
                <tr>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>
                    <th style={{ textAlign: 'center' }}><a href="/Patients">2</a></th>

                </tr>
            </table>
        </div>
    </div>)

};



export { Dashboard }