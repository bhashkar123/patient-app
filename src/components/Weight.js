import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';

const Weight = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
    const [patientId, setPatientId] = useState('');

    const fetchWeight = () => {

      const patient = JSON.parse(localStorage.getItem('app_patient'));
      let patientId =  localStorage.getItem("userId");
      let userType = localStorage.getItem("userType");
      if(patient != undefined){
        patientId =patient.ehrId;
        userType = 'patient';
      }
        coreContext.fetchDeviceData(patientId);
        coreContext.fetchWSData(patientId,userType);
        localStorage.setItem('app_patient', null);
    }

    //useEffect(fetchWeight, []);
    useEffect(fetchWeight, [coreContext.deviceData.length]);
   
    const columns = [
        { field: 'username', headerName: 'Patient Name', width: 200 ,  type: 'string'},
        {
          field: 'weight',
          headerName: 'Weight',
          type: 'number',
          editable: false,
          width: 200
        },
        {
          field: 'timeSlots',
          headerName: 'Time Slot',
          width: 110,
          editable: false,
          width: 200
        },
        {
            field: 'measurementDateTime',
            headerName: 'Date-Time',
            width: 110,
            editable: false,
            width: 200
          },
          {
            field: 'deviceid',
            headerName: 'Device Id',
            editable: false,
            width: 200
          },
          {
            field: 'batteryVoltage',
            headerName: 'Battery voltage',
            type: 'number',
            width: 200,
            editable: false,
          },
          {
            field: 'signalStrength',
            headerName: 'Signal Strength',
            type: 'number',
            width: 200,
            editable: false,
          },
          
          
      ];
      
      //https://material-ui.com/components/data-grid/

    const renderWeight = () => {
        if (coreContext.weightData.length > 0){
        return (
            <div style={{ height: 680, width: '100%' }}>
              <DataGrid
                rows={coreContext.weightData}
                columns={columns}
                pageSize={10}
                sortModel={[{ field: 'measurementDateTime', sort: 'desc' }]}
               
              />
            </div>
          );
        }
       
    }

    return <div className='card'>
        <h4 className="card-header">WEIGHT INFORMATION</h4>
       
        <div className="card-body">
        {renderWeight()}
        </div>
    </div >
}



export { Weight }