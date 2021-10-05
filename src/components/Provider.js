import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { Modal, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useForm } from "react-hook-form";
import Input from './common/Input';


import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue
  } from "@material-ui/data-grid";

import Link from "@material-ui/core/Link";
import IconButton from '@material-ui/core/IconButton';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    textField: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      margin: theme.spacing(1, 0.5, 1.5),
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
      '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
  { defaultTheme },
);

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  function QuickSearchToolbar(props) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </div>
    );
  }
  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };
  
  
const Provider = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [patientId, setPatientId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [searchText, setSearchText] = React.useState("");
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const [showModal, setShowModal] = useState(false);
    const [rows, setRows] = React.useState(coreContext.providerData);
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = coreContext.providerData.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setRows(filteredRows);
      };
      React.useEffect(() => {
        setRows(coreContext.providerData);
      }, [coreContext.providerData]);

    const editProvider = () => {

    }

    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const fetchProviders = () => {
        const patientId = props.match.params.patient;
        setPatientId(patientId);
        coreContext.fetchProviders();
    }

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setVerificationCode('');
    }
    useEffect(resetForm, [coreContext.resetForm]);

    useEffect(fetchProviders, [coreContext.providerData.length]);

    const columns = [
        { 
            field: "provider", 
            headerName: "Provider",
            width: 300,
        },
        {
        field: 'email',
        headerName: 'Email',
        editable: false,
        width: 300
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

    const onEmailChangedHandler = (e) => {
      setEmail(e.target.value);
      setName(e.target.value);
    }


    const showEditForm = (patient) => {
         setName(patient.provider);
         setPhone(patient.phone);
         setEmail(patient.email);
         //setPatientId(patient.id);
         setPatientId(patient.doctor_id);
        handleModalShow();
    }

    const deletePatient = (patient) => {
        coreContext.DeleteCareTeam(patient.doctor_id,"doctor","Provider");
    }

  
    const renderProviders = () => {
        if (coreContext.providerData.length > 0) {
            return (  <div style={{ height: 680, width: '100%' }}>
            <DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
              rows={rows}
              columns={columns}
              pageSize={10}
              sortModel={[{ field: 'provider', sort: 'asc' }]}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  onChange: (event) => requestSearch(event.target.value),
                  clearSearch: () => requestSearch("")
                }
              }}
            />
          </div>
            );
        }
    }

    return <div className='card'>
        <h4 className="card-header">PROVIDER INFORMATION</h4>
        <div className="card-body">
            <form class="form-inline">
                <input type="email" value={email} onChange={onEmailChangedHandler} class="form-control mb-2 mr-sm-2" placeholder="Enter email" />
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Enter phone" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Enter password" />
                <input type="password" value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} class="form-control mb-2 mr-sm-2" placeholder="Confirm Enter password" />
                <input type="text" readOnly= {true} value={name}  class="form-control mb-2 mr-sm-2" placeholder="Enter User Name" />
              
                <button type="button" class="btn btn-primary mb-2" onClick={() => coreContext.addProvider(name, email, phone, password)}>Add Provider</button>
            </form>
        </div>
        <div className="card-body">
        <table className="table table-bordered table-hover table-sm">
        {renderProviders()}
            </table>
        </div>

        <Modal show={coreContext.showProviderModal} onHide={coreContext.handleProviderModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Verification Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Enter the verification code sent on your Email ID</p>
                <input type="text" className='form-control' value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => coreContext.verifyProviderVerificationCode(verificationCode, email, 'Provider')}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={coreContext.handleProviderModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={showModal} onHide={handleModalClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Provider </Modal.Title>
            </Modal.Header>
            <Modal.Body  >
              
                    <div className="row" >
                         <div className="col-md-6" >
                            <Input label='Name' elementType='text' minLength={5} maxLength={55} placeholder='Enter name' onChange={e => setName(e.target.value)} name='name' value={name} required={true} register={register} errors={errors} />
                     </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                    <Input label='Phone' elementType='text' placeholder='Enter phone' onChange={e => setPhone(e.target.value)} required={true} minLength={5} maxLength={55} register={register} errors={errors} name='phone' value={phone} />
                    </div>
                    </div>
                    
                    <Input blockButton={true} value='Submit' onClick={() => coreContext.UpdateProvider(name, phone, email, patientId)} elementType='button' variant='primary' />
                    <br />
                    <center> {coreContext.renderLoader()}</center>
                    <center> <Input variant='danger' label={message} elementType='label' /></center>
              
            </Modal.Body>
        </Modal>

    </div >
}



export { Provider }