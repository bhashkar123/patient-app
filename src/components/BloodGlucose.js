import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';

const BloodGlucose = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);

    
    const [patientId, setPatientId] = useState('');

    const fetchBloodGlucose = () => {
       // const patientId =  localStorage.getItem("userId");
        let userType = localStorage.getItem("userType");
        let patient = JSON.parse(localStorage.getItem('app_patient'));
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
       
        setPatientId(patientId);
        coreContext.fetchBloodGlucose(patientId,userType);
    }

    useEffect(fetchBloodGlucose, []);
   
    const columns = [
        { field: 'username', headerName: 'Patient Name', width: 200 ,  type: 'string'},
        {
          field: 'reading',
          headerName: 'Reading',
          type: 'number',
          editable: false,
          width: 200
        },
        {
          field: 'meal',
          headerName: 'Before/After Meal',
          width: 110,
          editable: false,
          width: 200
        },
        {
            field: 'timeSlots',
            headerName: 'Recorded TimeSlot',
            width: 110,
            editable: false,
            width: 200
          },
          {
            field: 'date_recorded',
            headerName: 'Date Recorded',
            editable: false,
            width: 200
          },
          {
            field: 'reading_id',
            headerName: 'Reading Id',
            type: 'number',
            width: 200,
            editable: false,
          },
          {
            field: 'battery',
            headerName: 'Battery',
            type: 'number',
            width: 200,
            editable: false,
          },
          
          
      ];

    const renderBloodGlucose = () => {
        if (coreContext.bloodglucoseData.length > 0) {
            return (
                <div style={{ height: 680, width: '100%' }}>
                  <DataGrid
                    rows={coreContext.bloodglucoseData}
                    columns={columns}
                    pageSize={10}
                  />
                </div>
              );
            }
    }

    return <div className='card'>
        <h4 className="card-header">BLOOD GLUCOSE INFORMATION</h4>
        <div className="card-body">
        {renderBloodGlucose()}
        </div>
    </div >
}


export { BloodGlucose }