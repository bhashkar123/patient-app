import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Loader from "react-loader-spinner";



const Moment = require('moment');

const Weight = (props) => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
    const [patientId, setPatientId] = useState('');
    const [userType, setUserType] = useState('');

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
        setUserType(userType);
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
            headerName: 'Date Recorded',
            width: 310,
            editable: false,
            type: 'date',
          width: 200,
          valueFormatter: (params) => {
            const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
             return `${valueFormatted}`;
           },
            
          },
          {
            field: 'CreatedDate',
            headerName: 'Date Received',
            width: 200,
            editable: false,
            type: 'date',
          width: 200,
          valueFormatter: (params) => {
            const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
             return `${valueFormatted}`;
           },
           
          },
          {
            field: 'DeviceId',
            headerName: 'Device Id',
            editable: false,
            width: 200
          },
          {
            field: 'readingId',
            headerName: 'Reading Id',
            type: 'number',
            editable: false,
            width: 200
          },
          { 
            field: "sortDateColumn", 
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
        { field: 
          'UserName', 
          headerName: 'Patient Name', 
          width: 200 ,  
          type: 'string',
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
            headerName: 'Date Recorded',
            width: 110,
            editable: false,
            width: 300,
            type: 'date',
          width: 200,
          valueFormatter: (params) => {
            const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
             return `${valueFormatted}`;
           },
          },
          {
            field: 'CreatedDate',
            headerName: 'Date Received',
            width: 200,
            editable: false,
            type: 'date',
          width: 200,
          valueFormatter: (params) => {
            const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
             return `${valueFormatted}`;
           },
           
          },
          {
            field: 'DeviceId',
            headerName: 'Device Id',
            editable: false,
            width: 200
          },
          {
            field: 'readingId',
            headerName: 'Reading Id',
            type: 'number',
            editable: false,
            width: 200
          },
          { 
            field: "sortDateColumn", 
            headerName: "Action"
           
          }         

      ];
      
      //https://material-ui.com/components/data-grid/

    const renderWeight = () => {
      if (coreContext.weightData.length == 0) {
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
      let dgcolumns = columns;
      if(userType === 'patient'){
         dgcolumns = patientcolumns;
      }
      
        if (coreContext.weightData.length > 0){
        //  coreContext.weightData  = coreContext.weightData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
        return (
            <div style={{ height: 680, width: '100%' }}>
              <DataGrid
                rows={coreContext.weightData}
                columns={dgcolumns}
                sortingOrder={['desc', 'asc']}
                pageSize={10}
                sortModel={[{ field: 'sortDateColumn', sort: 'desc' }]}
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