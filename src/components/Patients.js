/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { CoreContext } from '../context/core-context';
import { Table, Pagination, Modal, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { PencilSquare, Trash, Person } from 'react-bootstrap-icons';
import { IconName } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Input from './common/Input';


import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue
  } from "@material-ui/data-grid";

import Loader from "react-loader-spinner";
const Moment = require('moment');
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox": {
      display: "block",
      pointerEvents:"none",
      disabled:"disabled"
    }
  }
}));


const Patients = props => {
  const classes = useStyles();

    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const [name, setName] = useState('');
    const [patientId, setPatientId] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    //const [select, setSelection] = React.useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [height, setHeight] = useState('');
    const [provider, setProvider] = useState('');
    const [coach, setCoach] = useState('');
    const [coordinator, setCoordinator] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [actionPatients, setActionPatients] = useState([]);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const handleAssignDrModalClose = () => setAssignDrShowModal(false);
    const handleAssignDrModalShow = () => setAssignDrShowModal(true);
    const [showAssignDrModal, setAssignDrShowModal] = useState(false);
    const [usertype, setuserType] = useState('');
    

    
    const editPatient = () => {

    }
    const coreContext = useContext(CoreContext);
    
    const fetchPatients = () => {
        const email = localStorage.getItem('app_userEmail');
        coreContext.userDetails(email);
        const userType = localStorage.getItem("userType");
        setuserType(userType);
        const userId = localStorage.getItem("userId");
        coreContext.fetchPatientListfromApi(userType, userId);
    }

    const fetchProviders = () => {
        coreContext.fetchProviders();
    }

    useEffect(fetchProviders, []);

    const fetchCareCoordinator = () => {
        coreContext.fetchCareCoordinator();
    }

    useEffect(fetchCareCoordinator, []);
    useEffect(fetchPatients, [coreContext.patients.length]);
   

    const fetchCoach = () => {
        coreContext.fetchCoach();
    }

    useEffect(fetchCoach, []);

    useEffect(coreContext.checkLocalAuth, []);
    useEffect(fetchPatients, []);

    function formatAMPM(date) {
      var d = new Date(date);
      //alert(d);
      
      var mm = d.getMonth() + 1;
      var dd = d.getDate();
      var yy = d.getFullYear();
      //alert(yy);
      var strTime = mm + '-' + dd + '-' + yy
      //alert(strTime);
      //console.log(strTime);
      return strTime;
    }
    const showEditForm = (patient) => {
      {console.log("checking",patient)}
        setName(patient.name);
        setBirthDate(patient.dob);
        setPhone(patient.mobile);
        setPatientId(patient.userId);
        setHeight(patient.height);
        setProvider(
          coreContext.providerOptions.filter((name)=>name.name===patient.ProviderName)[0].value
          )
          setCoordinator(coreContext.careCoordinatorOptions.filter((name)=>name.name===patient.CareName)[0].value)
       setCoach(coreContext.coachOptions.filter((name)=>name.name===patient.CoachName)[0].value)
        handleModalShow();
    }
    
    const showAssignDoctor = (patient) => {
      setName(patient.name);
      setBirthDate(patient.dob);
      setPhone(patient.mobile);
      setPatientId(patient.userId);
      setProvider(
        coreContext.providerOptions.filter((name)=>name.name===patient.ProviderName)[0].value
        )
        setCoordinator(coreContext.careCoordinatorOptions.filter((name)=>name.name===patient.CareName)[0].value)
     setCoach(coreContext.coachOptions.filter((name)=>name.name===patient.CoachName)[0].value)
      handleAssignDrModalShow();
  }
  
    
    const deletePatient = (patient) => {
        coreContext.DeletePatient(patient.userId)
    }


    const admincolumns = [
        { 
                field: "name", 
                headerName: "Patient Name",
                width: 200,
                renderCell: (params) => (
                <a   href={`/patient-summary/${btoa(params.row.userId)}`}> {params.value} </a>
            )
        },
        {
          field: 'ProviderName',
          headerName: 'Provider',
          editable: false,
          width: 200
        },
        {
          field: 'CareName',
          headerName: 'Care',
          width: 150,
          editable: false,
        },
        {
            field: 'CoachName',
            headerName: 'Coach',
            editable: false,
            width: 150
          },
          {
            field: 'height',
            headerName: 'Height',
            editable: false,
            type: "number",
            width: 125
          },
          {
            field: 'bg_reading',
            headerName: 'Glucose',
            editable: false,
            type: "number",
            width: 130
          },
          {
            field: 'Weight',
            headerName: 'Weight',
            type: "number",
            width: 125,
            editable: false,
          },
          {
            field: 'diastolic',
            headerName: 'Diastolic',
            type: "number",
            width: 140,
            editable: false,
          },
          {
            field: 'systolic',
            headerName: 'Systolic',
            type: "number",
            width: 140,
            editable: false,
          },
          {
            field: 'BMI',
            headerName: 'BMI',
            width:175,
            editable: false,
          },
          { 
            field: "", 
            headerName: "Action",
            width: 120,
            renderCell: (params) => (
                <div style={{  width: '100px' }}  >
                <a  style={{  marginRight: '5px' }} href="#" onClick={() => showEditForm(params.row)}>  <PencilSquare /></a>
                {/* {console.log("sahil",params.row)} */}
                <a style={{  marginRight: '5px' }} href="#" onClick={() => {deletePatient(params.row);fetchPatients();}}>  <Trash /></a>
                <a  style={{  marginRight: '5px' }} href="#" onClick={() => showAssignDoctor(params.row)}>  <Person /></a>
                </div>
            
        )
    }, 
  ];

    const columns = [
        { 
                field: "name", 
                headerName: "Patient Name",
                width: 200,
                renderCell: (params) => (
                <a   href={`/patient-summary/${btoa(params.row.userId)}`}> {params.value} </a>
            )
        },
        {
          field: 'ProviderName',
          headerName: 'Provider',
          editable: false,
          width: 200
        },
        {
          field: 'CareName',
          headerName: 'Care',
          width: 150,
          editable: false,
        },
        {
            field: 'CoachName',
            headerName: 'Coach',
            editable: false,
            width: 150
          },
          {
            field: 'height',
            headerName: 'Height',
            editable: false,
            type: "number",
            width: 125
          },
          {
            field: 'bg_reading',
            headerName: 'Glucose',
            editable: false,
            type: "number",
            width: 130
          },
          {
            field: 'Weight',
            headerName: 'Weight',
            type: "number",
            width: 125,
            editable: false,
          },
          {
            field: 'diastolic',
            headerName: 'Diastolic',
            type: "number",
            width: 140,
            editable: false,
          },
          {
            field: 'systolic',
            headerName: 'Systolic',
            type: "number",
            width: 140,
            editable: false,
          },
          {
            field: 'BMI',
            headerName: 'BMI',
            width:175,
            editable: false,
          },
          { 
            field: "", 
            headerName: "Action",
            width: 120,
            renderCell: (params) => (
                <div style={{  width: '100px' }}  >
                <a  style={{  marginRight: '5px' }} href="#" onClick={() => showEditForm(params.row)}>  <PencilSquare /></a>
                <a style={{  marginRight: '5px' }} href="#" onClick={() => {deletePatient(params.row);fetchPatients();}}>  <Trash /></a>
                {/* <a  style={{  marginRight: '5px' }} href="#" onClick={() => showAssignDoctor(params.row)}>  <Person /></a> */}
                </div>
            
        )
    }, 
  ];

    // const useStyles = makeStyles((theme) => (
    //     {
    //         colCell: {
    //         color: "Red"
    //     }
    //   }));
      
    // const classes = useStyles();
    
    const renderPatients = () => {
        if (coreContext.patients.length == 0) {
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
        if (coreContext.patients.length > 0 && usertype ==='admin') {
            return (
              <>
              
                <div style={{ height: 680, width: '100%' }}>
                  <DataGrid 
                  className={classes.root}
                  
                    rows={coreContext.patients}
                    columns={admincolumns}
                    pageSize={10}
                    sortModel={[{ field: 'name', sort: 'asc' }]}
       //             checkboxSelection
        
        // onSelectionModelChange={(selection) => {
        //   const newSelectionModel = selection.selectionModel;
  
        //   if (newSelectionModel.length > 1) {
        //     const selectionSet = new Set(selectionModel);
        //     const result = newSelectionModel.filter(
        //       (s) => !selectionSet.has(s)
        //     );
  
        //     setSelectionModel(result);
        //   } else {
        //     setSelectionModel(newSelectionModel);
        //   }
        // }}
        // selectionModel={selectionModel}
      />
      {console.log(coreContext.patients[selectionModel])}
                </div>
                {/* <center>{select}sa</center> */}
                </>
              );
        }
        if (coreContext.patients.length > 0 && usertype !=='admin') {
            return (
                <div style={{ height: 680, width: '100%' }}>
                  <DataGrid 
                  className={classes.root}
                    rows={coreContext.patients}
                    columns={columns}
                    pageSize={10}
                    sortModel={[{ field: 'name', sort: 'asc' }]}
                    checkboxSelection={false} 
        //hideFooterPagination
        // onSelectionModelChange={(selection) => {
        //   const newSelectionModel = selection.selectionModel;
  
        //   if (newSelectionModel.length > 1) {
        //     const selectionSet = new Set(selectionModel);
        //     const result = newSelectionModel.filter(
        //       (s) => !selectionSet.has(s)
        //     );
  
        //     setSelectionModel(result);
        //   } else {
        //     setSelectionModel(newSelectionModel);
        //   }
        // }}
        selectionModel={selectionModel}
      />
                </div>
              );
        }
    }
    // const renderbuttons=()=>{
    //   <div style={{  width: '100px' }}  >
    //   <a  style={{  marginRight: '5px' }} href="#" onClick={() => showEditForm(rows)}>  <PencilSquare /></a>
    //   <a style={{  marginRight: '5px' }} href="#" onClick={() => {deletePatient(rows);fetchPatients();}}>  <Trash /></a>
    //   <a  style={{  marginRight: '5px' }} href="#" onClick={() => showAssignDoctor(rows)}>  <Person /></a>
    //   </div>
    // }
   
    
    return <React.Fragment>
        
        
         <Table striped bordered hover responsive size='sm'>
        <caption>Patients' List  </caption>
        {/* {renderbuttons()} */}
        {/* {(usertype==='admin')?((selectionModel.length!==0)? <div style={{  width: '100px',marginLeft:'20px' }}  >
                <a  style={{  marginRight: '5px' }} href="#" onClick={() => showEditForm(coreContext.patients[selectionModel])}>  <PencilSquare /></a>
                
                <a style={{  marginRight: '5px' }} href="#" onClick={() => {deletePatient(coreContext.patients[selectionModel]);fetchPatients();}}>  <Trash /></a>
                <a  style={{  marginRight: '5px' }} href="#" onClick={() => showAssignDoctor(coreContext.patients[selectionModel])}>  <Person /></a>
                </div>: null):((selectionModel.length!==0)? <div style={{  width: '100px' }}  >
                <a  style={{  marginRight: '5px' }} href="#" onClick={() => showEditForm(coreContext.patients[selectionModel])}>  <PencilSquare /></a>
                
                <a style={{  marginRight: '5px' }} href="#" onClick={() => {deletePatient(coreContext.patients[selectionModel]);fetchPatients();}}>  <Trash /></a>
              
                </div>: null)}
                
        */}
        {renderPatients()}
         {/* {console.log("val",select)} */}
    </Table>
        
        <Modal show={showModal} onHide={handleModalClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Patient </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form autoComplete='off' onSubmit={handleSubmit(editPatient)} noValidate>
                    <div className="row">
                        <div className="col-md-6">
                            <Input label='Name' elementType='text' minLength={5} maxLength={55} placeholder='Enter name' onChange={e => setName(e.target.value)} name='name' value={name} required={true} register={register} errors={errors} />

                            <Input label='Phone' elementType='text' placeholder='Enter phone' onChange={e => setPhone(e.target.value)} required={true} minLength={5} maxLength={55} register={register} errors={errors} name='phone' value={phone} />

                            <Input label='Date of Birth' elementType='date' placeholder='Enter dob' onChange={e => setBirthDate(e.target.value)} required={true} register={register} errors={errors} name='dob' value={birthDate}/>
{console.log(birthDate)}
{/* <input type="date"/> */}
//                          <Input label='Height (Inch)' elementType='number' minLength={1} maxLength={55} placeholder='Enter height' onChange={e => setHeight(e.target.value)} name='height' value={height} required={true} register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                          {console.log("sssss",provider)}
                        <Input label='Height (Inch)' placeholder='Enter height' onChange={e => setHeight(e.target.value)} name='height' value={provider} required={true} register={register} errors={errors} />
          
                            <Input label='Provider' name='provider' required={false} register={register} errors={errors} elementType='select' value={provider} options={coreContext.providerOptions} onChange={e => setProvider(e.target.value)} />
                            {/* {console.log(coreContext.careCoordinatorOptions,coreContext.coachOptions)} */}
                            <Input label='Care Coordinator' name='coordinator' required={false} register={register} errors={errors} elementType='select' value={coordinator} options={coreContext.careCoordinatorOptions} onChange={e => setCoordinator(e.target.value)} />

                            <Input label='Coach Name' name='coach' required={false} register={register} errors={errors} elementType='select' value={coach} options={coreContext.coachOptions} onChange={e => setCoach(e.target.value)} />

                        </div>
                    </div>
                    <Input blockButton={true} value='Submit' onClick={
                        () =>{ 
                                coreContext.UpdatePatient(name, phone, birthDate, height, provider, coordinator, coach, patientId);
                                fetchPatients();
                                setShowModal(false);
                                fetchPatients();
                                fetchPatients();
                               
                             //alert("updated");
                            }
                        } elementType='button' variant='primary' />
                    <br />
                    <center> {coreContext.renderLoader()}</center>
                    <center> <Input variant='danger' label={message} elementType='label' /></center>
                </Form>
            </Modal.Body>
        </Modal>

<div style={{  width: '300px' }}>
        <Modal show={showAssignDrModal} onHide={handleAssignDrModalClose}  >
            <Modal.Header closeButton>
                <Modal.Title>Assign Care Team </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form autoComplete='off' onSubmit={handleSubmit(editPatient)} noValidate>
                    <div >
                        <div >
                            <Input label='Provider' name='coordinator' required={false} register={register} errors={errors} elementType='select' value={provider} options={coreContext.providerOptions} onChange={e => setProvider(e.target.value)} />

                            <Input label='Care Coordinator' name='care' required={false} register={register} errors={errors} elementType='select' value={coordinator} options={coreContext.careCoordinatorOptions} onChange={e => setCoordinator(e.target.value)} />

                            <Input label='Coach Name' name='coach' required={false} register={register} errors={errors} elementType='select' value={coach} options={coreContext.coachOptions} onChange={e => setCoach(e.target.value)} />

                        </div>
                    </div>
                    <Input blockButton={true} value='Submit' onClick={() => {
                            coreContext.AssignCareTeam( provider, coordinator, coach, patientId);
                            setAssignDrShowModal(false);
                            fetchPatients();
                        } 
                    }   elementType='button' variant='primary' />
                    <br />
                    <center> {coreContext.renderLoader()}</center>
                    <center> <Input variant='danger' label={message} elementType='label' /></center>
                </Form>
            </Modal.Body>
        </Modal>

        </div>
    </React.Fragment>
}

export { Patients }

