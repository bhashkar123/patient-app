import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Loader from "react-loader-spinner";
import IonRangeSlider from 'react-ion-slider'
import moment from 'moment'



const Moment = require('moment');

const WeightAverage = (props) => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
    const [patientId, setPatientId] = useState('');
    const [userType, setUserType] = useState('');
    const [Days, setDays] = useState(30);

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
        
      ];

      const showEditForm = (patient) => {
      }
      const deletePatient = (patient) => {
      }


      const patientcolumns = [
        // { field: 
        //   'UserName', 
        //   headerName: 'Patient Name', 
        //   width: 200 ,  
        //   type: 'string',
        // },
        {
          field: 'weight',
          headerName: 'Weight',
          type: 'number',
          editable: false,
          width: 200
        },
        
      ];
      console.log(coreContext.weightData , "coreContext.weightData")
      //https://material-ui.com/components/data-grid/
      let avgData=[];
    let newrows=coreContext.weightData.map((curr)=>curr.UserName).filter((item, i, ar) => ar.indexOf(item) === i)
    console.log(newrows[0])
    const getweight=(value)=>{
      console.log(value ,"value")
        let averageweight=0;
        let record=0
        let today=new Date();
        let bfr=new Date().setDate(today.getDate()-Days)
        console.log( moment(new Date(bfr)).format("DD-MM-YYYY"), "bfr time diffrence")
        console.log(Days,"Days")
        console.log(coreContext.weightData , " coreContext.weightData")
        coreContext.weightData.map((curr)=>
        { 
          console.log((new Date(curr.CreatedDate)),"new Date(curr.CreatedDate)")
          console.log((new Date(bfr)),"bfa data")
          console.log(new Date(curr.CreatedDate) > new Date(bfr) ,"final checking")
          
            if (curr.UserName== value && new Date(curr.CreatedDate) > new Date(bfr) && curr.weight!==undefined){
                averageweight=averageweight+Number(curr.weight);
            record=record+1
       
        }
    }
         )
        console.log(averageweight,"averageweight") 

    return averageweight/record;

    }
    
    newrows.map((user)=>
        
        {
           let avg= {
               id:avgData.length,
                UserName:user,
                weight:getweight(user),
                }

        //    console.log(avg)
            avgData.push(avg)
           // setId(id+1)
            
      //  setAvgData([...avgdaData,avg])
      console.log(avgData , "avgData")
      return avgData
    // console.log(avgData)
        })
        
       

    
       //console.log(rows)
    










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
      
        if (coreContext.weightData.length > 0 && coreContext.weightData[0].UserName!==undefined){
        //  coreContext.weightData  = coreContext.weightData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
        return (
            <div style={{ height: 680, width: '100%' }}>
              <DataGrid
                rows={avgData}
                columns={dgcolumns}
                sortingOrder={['desc', 'asc']}
                pageSize={10}
               // sortModel={[{ field: 'sortDateColumn', sort: 'desc' }]}
              />
            </div>
          );
        }
        else{
          return(
            <div style={{ height: 60, width: '100%',display: 'flex',  justifyContent:'center', marginTop: '10px', alignItems:'center' }}>
                <h1>No data Found</h1>
                </div>)
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
        <div className='row'    >
            <div className="col-md-12">
                <div className="card">

                    <h4 className="card-header"> Select Days </h4>
                    <div className="card-body">
                        <IonRangeSlider  keyboard={true} onStart='1' onFinish={(e)=>setDays(e.from)} type='single' min={0} max={180} from={Days} to={Days} step={7} grid={true} grid_margin={true}  />
                        
                        <h3> Last {Days} days Selected</h3>
                    </div>
                </div>
            </div>
            </div>
        {renderWeight()}
        </div>
    </div >
}



export {WeightAverage}