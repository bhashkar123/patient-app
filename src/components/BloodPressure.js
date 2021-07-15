import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';

const BloodPressure = props => {

    const coreContext = useContext(CoreContext);
    const [patientId, setPatientId] = useState('');
    
    const fetchBloodPressure = () => {
        const patientId =  localStorage.getItem("userId");
        const userType = localStorage.getItem("userType");
        coreContext.fetchBloodPressure(patientId,userType);
    }

    useEffect(fetchBloodPressure, []);
   
    const columns = [
        { field: 'username', headerName: 'Patient Name', width: 200 ,  type: 'string'},
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
          width: 110,
          editable: false,
          width: 200
        },
        {
            field: 'pulse',
            headerName: 'Pulse',
            width: 110,
            editable: false,
            width: 200
          },
          {
            field: 'timeSlots',
            headerName: 'Time Slots',
            editable: false,
            width: 200
          },
          {
            field: 'date_recorded',
            headerName: 'Date Time',
            type: 'number',
            width: 200,
            editable: false,
          },
          ,
          {
            field: 'date_received',
            headerName: 'Date Time',
            type: 'number',
            width: 200,
            editable: false,
          },
         
          
          
      ];

    const renderBloodPressure = () => {
        if (coreContext.bloodpressureData.length > 0) {
            return (
                <div style={{ height: 680, width: '100%' }}>
                  <DataGrid
                    rows={coreContext.bloodpressureData}
                    columns={columns}
                    pageSize={10}
                  />
                </div>
              );
        }
    }

    return <div className='card'>
    <h4 className="card-header">BLOOD PRESSURE INFORMATION</h4>
    <div className="card-body">
    {renderBloodPressure()}
    </div>
</div >
}



export { BloodPressure }