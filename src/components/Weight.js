import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';



const Moment = require('moment');

const Weight = (props) => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
    const [patientId, setPatientId] = useState('');

    const fetchWeight = () => {
        let userType = localStorage.getItem("userType");
        let patientId = localStorage.getItem("userId");
        // check page if left side menu.
        if(window.location.href.substring('weight')> 0)
        {

        }
        if(window.location.href.indexOf('patient-summary') >0 )
        {
            patientId = localStorage.getItem("ehrId");
            userType = 'patient';
            // clear this otherwise will be problem
            localStorage.removeItem("ehrId");
        }
      
      coreContext.fetchWSData(patientId,userType);
     
    }
    useEffect(fetchWeight, [coreContext.weightData.length]);
   

    const columns = [
        { field: 
          'UserName', 
          headerName: 'Patient Name', 
          width: 200 ,  
          type: 'string',
          renderCell: (params) => (
            <a  href={`/patient-summary/${btoa(params.row.userId)}`}> {params.row.UserName} </a>
          )
        },
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



export {Weight}