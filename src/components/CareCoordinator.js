import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { Modal, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue
  } from "@material-ui/data-grid";

import Link from "@material-ui/core/Link";

const CareCoordinator = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [patientId, setPatientId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setVerificationCode('');
    }
    useEffect(resetForm, [coreContext.resetForm]);

    const fetchCareCoordinator = () => {
        const patientId = props.match.params.patient;
        setPatientId(patientId);
        coreContext.fetchCareCoordinator();
    }

    useEffect(fetchCareCoordinator, []);
    const columns = [
        { 
            field: "name", 
            headerName: "Coach Name",
            width: 300,
        },
        {
        field: 'email',
        headerName: 'Email',
        editable: false,
        width: 200
        },
          {
            field: 'phone',
            headerName: 'Phone',
            width: 200,
            editable: false,
          },
          { 
            field: "", 
            headerName: "Action",
            width: 300,
            
            renderCell: (params) => (
                <div>  <a href="#" onClick={() => showEditForm(params.row)}>  <PencilSquare /></a>
                <a href="#" onClick={() => deletePatient(params.row)}>  <Trash /></a>
                </div>
            
        )
    }, 
];

const showEditForm = (patient) => {
        
}

const deletePatient = (patient) => {
    coreContext.DeletePatient(patient.userId)
}
    const renderCoordinators = () => {
        if (coreContext.ccData.length > 0) {
            return (  <div style={{ height: 680, width: '100%' }}>
            <DataGrid
              rows={coreContext.ccData}
              columns={columns}
              pageSize={10}
              sortModel={[{ field: 'name', sort: 'asc' }]}
            />
          </div>
            );
        }
    }

    return <div className='card'>
        <h4 className="card-header">CARE COORDINATOR INFORMATION</h4>
        <div className="card-body">
            <form autoComplete={false} class="form-inline">

                <input type="text" value={name} onChange={e => setName(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Care Coordinator Name" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Enter email" />
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Enter phone" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Enter password" />
                <input type="password" value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Confirm Enter password" />

                <button type="button" class="btn btn-primary mb-2" onClick={() => coreContext.addCareCoordinator(name, email, phone, password)}>Add Care Coordinator</button>
            </form>
        </div>
        <div className="card-body">
            <table className="table table-bordered table-hover table-sm">
            {renderCoordinators()}
            </table>
        </div>
        <Modal show={coreContext.showProviderModal} onHide={coreContext.handleProviderModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Verification Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Enter the verification code sent on your Email ID</p>
                <input type="text" class="form-control" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => coreContext.verifyProviderVerificationCode(verificationCode, email, 'CareCoordinator')}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={coreContext.handleProviderModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    </div >
}



export { CareCoordinator }