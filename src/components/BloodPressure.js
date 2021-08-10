import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
const Moment = require('moment');

const BloodPressure = props => {

    const coreContext = useContext(CoreContext);
    const [patientId, setPatientId] = useState('');
    const [userType, setUserType] = useState('');
    const [disablelink, setdisablelink] = useState(false);
    
    const fetchBloodPressure = () => {

        let userType = localStorage.getItem("userType");
        let patientId = localStorage.getItem("userId");
        setdisablelink(false);
        // check page if left side menu.
        if(window.location.href.substring('bloodpressure')> 0)
        {

        }
        if(window.location.href.indexOf('patient-summary') >0 )
        {
            patientId = localStorage.getItem("ehrId");
            userType = 'patient';
            // clear this otherwise will be problem
            localStorage.removeItem("ehrId");
            setdisablelink(true);
        }
        setUserType(userType);
        
        coreContext.fetchBloodPressure(patientId,userType);
       
    }

    useEffect(fetchBloodPressure, [coreContext.bloodpressureData.length]);
   
    const columns = [
      { 
        field: 'UserName', 
        headerName: 'Patient Name', 
        width: 200 ,  
        type: 'string',
        renderCell: (params) => (
          <a  disable = {disablelink} href={`/patient-summary/${btoa(params.row.userId)}`}> {params.row.UserName} </a>
        )
      },
      {
        field: 'systolic',
        headerName: 'Systolic',
        type: 'number',
        editable: false,
        width: 200
      },
      {
        field: 'diastolic',
        headerName: 'Diastolic',
        type: 'number',
        editable: false,
        width: 200
      },
      {
          field: 'pulse',
          headerName: 'Pulse',
          width: 200,
          editable: false,
          type: 'number',
        },
        {
          field: 'MeasurementDateTime',
          headerName: 'Date Recorded',
          editable: false,
          width: 200
        },
        {
          field: 'CreatedDate',
          headerName: 'Date Received',
          width: 200,
          editable: false
         
        },
        {
          field: 'deviceId',
          headerName: 'Device Id',
          editable: false,
          width: 200
        },
        {
          field: 'readingId',
          headerName: 'Reading Id',
          width: 200,
          editable: false
         
        },
        { 
          field: "", 
          headerName: "Action",
          width: 300,
          
          renderCell: (params) => (
              <div>  <a href="#" onClick={() => showEditForm(params.row)}>  <PencilSquare /></a>
              <a href="#" onClick={() => deletePatient(params.row)}>  <Trash /></a>
              </div>
          
      )
          }         
    ];

    const showEditForm = (patient) => {
    }
    const deletePatient = (patient) => {
    }

    const patientcolumns = [
      { 
        field: 'UserName', 
        headerName: 'Patient Name', 
        width: 200 ,  
        type: 'string',
        
      },
      {
        field: 'systolic',
        headerName: 'Systolic',
        type: 'number',
        editable: false,
        width: 200
      },
      {
        field: 'diastolic',
        headerName: 'Diastolic',
        type: 'number',
        editable: false,
        width: 200
      },
      {
          field: 'pulse',
          headerName: 'Pulse',
          width: 200,
          editable: false,
          type: 'number',
        },
        {
          field: 'MeasurementDateTime',
          headerName: 'Date Recorded',
          editable: false,
          width: 200
        },
        {
          field: 'CreatedDate',
          headerName: 'Date Received',
          width: 200,
          editable: false
         
        },
        {
          field: 'deviceId',
          headerName: 'Device Id',
          editable: false,
          width: 200
        },
        {
          field: 'readingId',
          headerName: 'Reading Id',
          width: 200,
          editable: false
         
        },
    ];

    const renderBloodPressure = () => {
     let dgcolumns = columns;
     if(userType === 'patient'){
        dgcolumns = patientcolumns;
     }
     
     if (coreContext.bloodpressureData.length > 0) {
      //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
        return (
            <div style={{ height: 680, width: '100%' }}>
              <DataGrid
                rows={coreContext.bloodpressureData}
                columns={dgcolumns}
                pageSize={10}
              />
            </div>
          );
     }
        
    }

    return <div className='card'>
    <h4 className="card-header">BLOOD PRESSURE INFORMATION</h4>
    <div style={{ display: "flex", paddingTop:'10px' }}>
        <button  style={{ marginLeft: "94%"  }} onClick={() => fetchBloodPressure()}>
          Refresh
        </button>
      </div>
    <div className="card-body">
    {renderBloodPressure()}
    </div>
</div >
}



export { BloodPressure }