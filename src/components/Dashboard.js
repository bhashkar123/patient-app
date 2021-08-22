/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { CoreContext } from '../context/core-context';
import { Bezier, Bezier2, Cash, GraphUp } from 'react-bootstrap-icons';
import "react-datepicker/dist/react-datepicker.css";


const Dashboard = props => {
    const [date, setDate] = useState();
    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);

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