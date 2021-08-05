/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { CoreContext } from '../context/core-context';
import { Table, Pagination, Modal, Button, Form } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useForm } from "react-hook-form";
import Input from './common/Input';
import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue
  } from "@material-ui/data-grid";

import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';


const Patients = props => {

    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const [name, setName] = useState('');
    const [patientId, setPatientId] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [height, setHeight] = useState('');
    const [provider, setProvider] = useState('');
    const [coach, setCoach] = useState('');
    const [coordinator, setCoordinator] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [actionPatients, setActionPatients] = useState([]);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);
    const defaultTheme = createMuiTheme();

    const editPatient = () => {

    }
    const coreContext = useContext(CoreContext);
    
    const fetchPatients = () => {
        const email = localStorage.getItem('app_userEmail');
        coreContext.userDetails(email);
        const userType = localStorage.getItem("userType");
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

    const fetchCoach = () => {
        coreContext.fetchCoach();
    }

    useEffect(fetchCoach, []);

    useEffect(coreContext.checkLocalAuth, []);
    useEffect(fetchPatients, []);


    const showEditForm = (patient) => {
        setName(patient.name);
        setBirthDate(patient.dob);
        setPhone(patient.mobile);
        setPatientId(patient.userId);
        handleModalShow();
    }

  
    
    const deletePatient = (patient) => {
        coreContext.DeletePatient(patient.userId)
    }


    const columns = [
        { 
                field: "name", 
                headerName: "Patient Name",
                width: 250,
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
          width: 110,
          editable: false,
        },
        {
            field: 'CoachName',
            headerName: 'Coach',
            editable: false,
            width: 200
          },
          {
            field: 'height',
            headerName: 'Height',
            editable: false,
            type: "number",
            width: 150
          },
          {
            field: 'bg_reading',
            headerName: 'Glucose',
            editable: false,
            type: "number",
            width: 150
          },
          {
            field: 'Weight',
            headerName: 'Weight',
            type: "number",
            width: 150,
            editable: false,
          },
          {
            field: 'diastolic',
            headerName: 'Diastolic',
            type: "number",
            width: 150,
            editable: false,
          },
          {
            field: 'systolic',
            headerName: 'Systolic',
            type: "number",
            width: 150,
            editable: false,
          },
          {
            field: 'BMI',
            headerName: 'BMI',
            width:250,
            editable: false,
          },
          { 
            field: "", 
            headerName: "Action",
            width: 140,
            renderCell: (params) => (
                <div style={{  width: '40px', marginLeft:'70px' }}  >  <a href="#" onClick={() => showEditForm(params.row)}>  <PencilSquare /></a>
                <a href="#" onClick={() => deletePatient(params.row)}>  <Trash /></a>
                </div>
            
        )
    }, ];

    // const useStyles = makeStyles((theme) => (
    //     {
    //         colCell: {
    //         color: "Red"
    //     }
    //   }));
      
    // const classes = useStyles();
    
    const renderPatients = () => {
        if (coreContext.patients.length > 0) {
            return (
                <div style={{ height: 680, width: '100%' }}>
                  <DataGrid 
                    rows={coreContext.patients}
                    columns={columns}
                    pageSize={10}
                    sortModel={[{ field: 'name', sort: 'asc' }]}
                  />
                </div>
              );
        }
    }
   
    
    return <React.Fragment> <Table striped bordered hover responsive size='sm'>
        <caption>Patients' List  </caption>
        {renderPatients()}
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

                            <Input label='Date of Birth' elementType='date' placeholder='Enter dob' onChange={e => setBirthDate(e.target.value)} required={true} minLength={5} maxLength={55} register={register} errors={errors} name='dob' value={birthDate} />

                            <Input label='Height (Inch)' elementType='number' minLength={1} maxLength={55} placeholder='Enter height' onChange={e => setHeight(e.target.value)} name='height' value={height} required={true} register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <Input label='Provider Name' name='coordinator' required={false} register={register} errors={errors} elementType='select' value={provider} options={coreContext.providerOptions} onChange={e => setProvider(e.target.value)} />

                            <Input label='Care Coordinator' name='care' required={false} register={register} errors={errors} elementType='select' value={coordinator} options={coreContext.careCoordinatorOptions} onChange={e => setCoordinator(e.target.value)} />

                            <Input label='Coach Name' name='coach' required={false} register={register} errors={errors} elementType='select' value={coach} options={coreContext.coachOptions} onChange={e => setCoach(e.target.value)} />

                        </div>
                    </div>
                    <Input blockButton={true} value='Submit' onClick={() => coreContext.UpdatePatient(name, phone, birthDate, height, provider, coordinator, coach, patientId)} elementType='button' variant='primary' />
                    <br />
                    <center> {coreContext.renderLoader()}</center>
                    <center> <Input variant='danger' label={message} elementType='label' /></center>
                </Form>
            </Modal.Body>
        </Modal>

    </React.Fragment>
}

export { Patients }

