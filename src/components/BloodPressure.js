import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';

const BloodPressure = props => {

    const coreContext = useContext(CoreContext);
    const [patientId, setPatientId] = useState('');
    
    const fetchBloodPressure = () => {
      let userType = localStorage.getItem("userType");
        

        const patient = JSON.parse(localStorage.getItem('app_patient'));
        let patientId =  localStorage.getItem("userId");
        let userName = localStorage.getItem("userName");
        if(patient != undefined){
          if(patient.ehrId !== undefined)
          {
            patientId =patient.ehrId;
            userType = 'patient';
            userName = patient.name;
          }
          
        }
       
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
          headerName: 'Time Slots',
          editable: false,
          width: 200
        },
        {
          field: 'CreatedDate',
          headerName: 'Recorded Date',
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
                    sortModel={[{ field: 'MeasurementDateTime', sort: 'desc' }]}
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