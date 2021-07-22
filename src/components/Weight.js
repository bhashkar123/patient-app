import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';
const Moment = require('moment');

const Weight = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
    const [patientId, setPatientId] = useState('');

    const fetchWeight = () => {
      const patient = JSON.parse(localStorage.getItem('app_patient'));
      let patientId =  localStorage.getItem("userId");
      console.log('Ashok'+patientId);
      
      let userType = localStorage.getItem("userType");
      let userName = localStorage.getItem("userName");
      if(patient != undefined){
        if(patient.ehrId !== undefined)
        {
          patientId =patient.ehrId;
          userType = 'patient';
        userName = patient.name;
        }
        
      }
      
      coreContext.fetchWSData(patientId,userType);
     
    }
    useEffect(fetchWeight, [coreContext.weightData.length]);
   
    const columns = [
        { field: 
          'username', 
          headerName: 'Patient Name', 
          width: 200 ,  
          type: 'string'},
        {
          field: 'weight',
          headerName: 'Weight',
          type: 'number',
          editable: false,
          width: 200
        },
        {
            field: 'MeasurementDateTime',
            headerName: 'Date-Time',
            width: 110,
            editable: false,
            width: 500
          },
          {
            field: 'timeSlots',
            headerName: 'Time Slots',
            width: 110,
            editable: false,
            width: 200
          },
          {
            field: 'DeviceId',
            headerName: 'Device Id',
            editable: false,
            width: 200
          },
      ];
      
      //https://material-ui.com/components/data-grid/

    const renderWeight = () => {
        if (coreContext.weightData.length > 0){
          coreContext.weightData  = coreContext.weightData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
        return (
            <div style={{ height: 680, width: '100%' }}>
              <DataGrid
                rows={coreContext.weightData}
                columns={columns}
                pageSize={10}
              />
            </div>
          );
        }
       
    }

    return <div className='card'>
        <h4 className="card-header">WEIGHT INFORMATION</h4>
        <div style={{ display: "flex", paddingTop:'10px' }}>
        <button  style={{ marginLeft: "94%"  }} onClick={() => fetchWeight()}>
          Refresh
        </button>
      </div>
        <div className="card-body">
        {renderWeight()}
        </div>
    </div >
}



export { Weight }