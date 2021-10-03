import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Row, Col, FormControl } from 'react-bootstrap';
import { Envelope, ChatLeftText, BoxArrowLeft,FileMedicalFill,FileMedical, PencilSquare, Gear, People, 
    PersonLinesFill,Speedometer,Speedometer2, PersonPlusFill, BoxArrowRight, Telephone, PersonFill,SuitHeartFill,ThermometerHigh,Weight } from 'react-bootstrap-icons';
    import { GiCook, GiAbstract071, GiAcid, GiWeight, GiAerialSignal, GiOrangeSlice, GiCagedBall } from 'react-icons/gi';
import { CoreContext } from '../../context/core-context';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { ImMenu } from "react-icons/im";
import Input from './Input';
import { useForm } from "react-hook-form";



const TopMenu = ({changestyle,showSidebar}) => {

    const coreContext = useContext(CoreContext);

    const [show, setShow] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMessageModalClose = () => setShowMessageModal(false);
    const handleMessageModalShow = () => setShowMessageModal(true);

    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [language, setLanguage] = useState('');
    const [ehrId, setEhrId] = useState('');
    const [isccm, setIsccm] = useState(false);
    const [ispcm, setIspcm] = useState(false);
    const [isrpm, setIsrpm] = useState(false);
    const [pcm, setPcm] = useState('');
    const [pp, setPp] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [patientid, setPatientid] = useState('');
    const [ispatient, setIsPatient] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [preferred, setPreferred] = useState('');
    const [phoneNotes, setPhoneNotes] = useState('');
    const [email, setEmail] = useState('');
    const [hasMobile, setHasMobile] = useState(false);
    const [sendSms, setSendSms] = useState(false);
    const [street, setStreet] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pos, setPos] = useState('');
    const [raf, setRaf] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([coreContext.patients]);
    const [patientName, setPatientName] = useState('');
    
    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const onChange = (event, { newValue }) => {
        setValue(newValue.name);
        setMobilePhone(newValue.mobile_phone);
    };

    const fetchProviders = () => {
        coreContext.fetchProviders();
    }

    useEffect(fetchProviders, []);

    // const fetchPatients = () => {
    //     coreContext.fetchPatients();
    // }

    // useEffect(fetchPatients, [coreContext.patients.length]);
    const toggleIsccm = (a) => {
        if (a) setIsccm(false); else setIsccm(true);
    }
    const toggleIspcm = (a) => {
        if (a) setIspcm(false); else setIspcm(true);
    }
    const toggleIsrpm = (a) => {
        if (a) setIsrpm(false); else setIsrpm(true);
    }
    const toggleHasMobile = (a) => {
        if (a) setHasMobile(false); else setHasMobile(true);
    }
    const toggleSendSms = (a) => {
        if (a) setSendSms(false); else setSendSms(true);
    }

    const onCreatePatientSubmit = () => {
        if (!firstName) {
            alert('Enter user name...'); return;
        } if (!lastName) {
            alert('Enter password...'); return;
        } if (!birthDate) { alert('Enter date of birth...'); return; }
        if (!gender) { alert('Choose gender...'); return; }
        if (!email) { alert('Enter email...'); return; }

        coreContext.Registration(firstName, email, mobilePhone, lastName,birthDate, pcm, pp);
        handleClose();
        // axios.post('add-patient', { firstName, lastName, birthDate, gender, language, ehrId, isccm, isrpm, pcm, pp, homePhone, mobilePhone, workPhone, preferred, phoneNotes, email, hasMobile, sendSms, street, zip, city, state, pos, raf }).then(response => {
        //     const status = response.data.status;
        //     if (status.trim() === 'success') {
        //         console.log(response.data.patient);
        //         const url = 'patient-summary/' + response.data.patient;
        //         window.location.assign(url);
        //     } else {
        //         alert('Error creating patient....');
        //     }
        // })
    }

    const onSendMessage = () => {
        axios.post('send-sms', { mobilePhone, message }).then(response => {
            const status = response.data.status;
            if (status.trim() === 'success') {
                coreContext.fetchMessages();
                coreContext.fetchThreadMessages('to', mobilePhone);
                setShowMessageModal(false);

                const url = 'patient-summary/' + patientid;

                if (!window.location.href.includes('/patient-summary/')) {
                    window.location.href = url;
                }

                //Call dashboard
                // alert('Message Sent successfully....');
            }
            else alert('Message Sending failed');
        }).catch(() => alert('Message Sending failed'));
    }


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        setMobilePhone(result.mobile_phone);
        setPatientid(result.id);
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // setMobilePhone(item.mobile_phone);
        setPatientid(item.id);

        if(item.name!=""){
           const url = '/patient-summary/' + btoa(item.userId);
            
            if (!window.location.href.includes('/patient-summary/')) {
                window.location.href = url;
            }else{
                alert('This is already patient summary page.')
            }
        }
        // the item selected
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const handleAddPatient = () => {
        setShowMessageModal(false);
        handleShow();
    }

    const onSearch = () => {
        //alert('Enter clicked!!!' + userName);  
        const userType = localStorage.getItem("userType");
        const userId = localStorage.getItem("userId");
        if(patientName=="") return;
        if(coreContext.patients.length ==0)  {
            //coreContext.fetchPatientListfromApi(userType, userId);
            alert('Please open patient information page and search.');
            return;    

        }
        let  userName = patientName.target.value;
        if(userName!=""){
            let patient = coreContext.patients.filter(app =>
                app.name.toLowerCase().includes(userName))[0];
           const url = '/patient-summary/' + btoa(patient.userId);
            
            if (!window.location.href.includes('/patient-summary/')) {
                window.location.href = url;
            }else{
                alert('This is already patient summary page.')
            }
        }
      }

    const renderPatientMenu = () => {
        const userType = localStorage.getItem("userType");
        if (userType !== 'patient') return  <NavDropdown  title={<div style={{ display: "inline-block" }}><People /> Patients </div>} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/patients"><PersonLinesFill /> List</NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={handleShow}><PencilSquare /> Add</NavDropdown.Item>
            </NavDropdown>
    }

    const renderClinicalDataMenu = () => {
        const userType = localStorage.getItem("userType");
        if (userType === 'patient') return  <NavDropdown  title={<div style={{ display: "inline-block" }}><FileMedicalFill /> Clinical Data </div>} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#"><PersonLinesFill /> Allergies</NavDropdown.Item>
                <NavDropdown.Item href="#" ><PencilSquare /> Lab Results</NavDropdown.Item>
                <NavDropdown.Item href="#" ><PencilSquare /> Medications</NavDropdown.Item>
                {/* <NavDropdown.Item href="#" onClick={handleShow}><PencilSquare /> Vitals</NavDropdown.Item> */}
            </NavDropdown>
    }

    const renderVitalMenu = () => {
        const userType = localStorage.getItem("userType");
        if (userType === 'patient') return  <NavDropdown  title={<div style={{ display: "inline-block" }}><FileMedical /> Vitals </div>} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/bloodpressure" ><GiAbstract071 size={20} /> Blood Pressure</NavDropdown.Item>
                <NavDropdown.Item href="/bloodglucose" ><GiAcid size={20} /> Blood Glucose</NavDropdown.Item>
                <NavDropdown.Item href="/weight" ><GiWeight size={20} /> Weight </NavDropdown.Item>
                <NavDropdown.Item href="/thresold"><GiAerialSignal size={20} /> Threshold</NavDropdown.Item>
            </NavDropdown>
    }

    const renderpatientSearch = () => {
        const userType = localStorage.getItem("userType");
        if (userType !== 'patient') return  <Form inline>
            <div className="row">
             {/* <input
                name="name"
                type="text"
                style={{  height: '38px', width: '200px' }}
                onKeyPress={event => {
                    setPatientName(event);
                   }}
                placeholder="Search patients..."
              /> */}
               {renderPatients()}
                    <div className='rowC'>
                        <header>
                            <div style={{ width: 420 }}>
                                <ReactSearchAutocomplete
                                    items={coreContext.patients}
                                    onSearch={handleOnSearch}
                                    onHover={handleOnHover}
                                    onSelect={handleOnSelect}
                                    onFocus={handleOnFocus}
                                    autoFocus
                                />
                            </div>
                        </header>
                        
                    </div>
               {/* <input
                name="name"
                type="button"
                width="380" value="Search" style={{ marginLeft: '5px',  height: '38px', width: '200px' }}
                onClick={onSearch}
              /> */}
              </div>
              
        {/* <FormControl 
            placeholder="Search patients..."
            aria-label="Search patients..."
            aria-describedby="basic-addon1" onKeyPress={event => {
                if (event.key === "Enter") {
                  search(event);
                }}}
          
        /> */}

    </Form>
    }
    const renderPatients = () => {
        
        if (coreContext.patients.length > 0) {

        }
    }
    return (
        <>
    <React.Fragment>
        <Navbar sticky='top' collapseOnSelect expand="lg" style={{ backgroundColor: '#012971' }} variant="dark">
            <span type="button" onClick={()=>{ showSidebar(); changestyle()}} style={{backgroundColor:"rgb(1, 41, 113)",color:"white", marginRight:"50px"}}><ImMenu/></span>
            <Navbar.Brand href="/">Patient App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard"> A PATTERN Plus Dashboard</Nav.Link>
                    
                    <NavDropdown title={<div style={{ display: "inline-block" }}><Envelope /> Mailbox </div>} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/inbox"><BoxArrowRight /> Inbox</NavDropdown.Item>
                        <NavDropdown.Item href="/outbox"><BoxArrowLeft /> Outbox</NavDropdown.Item>
                        {/* <NavDropdown.Item href="#" onClick={handleMessageModalShow}><PencilSquare /> Compose</NavDropdown.Item> */}

                    </NavDropdown>
                    <NavDropdown title={<div style={{ display: "inline-block" }}><ChatLeftText /> Messages </div>} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/telephone"><Telephone /> Call</NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={handleMessageModalShow}><ChatLeftText /> SMS</NavDropdown.Item>
                        {/* <NavDropdown.Item href="/settings"><Gear /> Settings</NavDropdown.Item> */}
                    </NavDropdown>
                   {renderPatientMenu()}
                   {renderClinicalDataMenu() } 
                   {renderVitalMenu() } 

                </Nav>
                {renderpatientSearch()}
               
                <Nav className="ml-auto">
                
                <NavDropdown className='rightDropdown' title={localStorage.getItem("userName") ? localStorage.getItem("userName") : 'Guest'} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/settings"><Gear /> Settings</NavDropdown.Item>
                        <NavDropdown.Item href="/profile"><PersonFill /> My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout"><BoxArrowRight /> Sign Out</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" onClick={handleShow}><PersonPlusFill /></Nav.Link>
                </Nav>
               
            </Navbar.Collapse>
        </Navbar >


        <Modal show={coreContext.showPatientConfirmationModal} onHide={coreContext.handlePatientConfirmationModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Verification Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Enter the verification code sent on your Email ID {firstName}</p>
                <input type="text" className='form-control' value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => coreContext.verifyProviderVerificationCode(verificationCode, firstName)}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={coreContext.handleProviderModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showMessageModal} onHide={handleMessageModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Send SMS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Mobile Number*</Form.Label>
                    {/* <Form.Control size="sm" type="text" onChange={e => setMobilePhone(e.target.value)} value={mobilePhone} placeholder="Enter mobile number" /> */}

                    {renderPatients()}
                    <div className='rowC'>
                        <header>
                            <div style={{ width: 420 }}>
                                <ReactSearchAutocomplete
                                    items={coreContext.patients}
                                    onSearch={handleOnSearch}
                                    onHover={handleOnHover}
                                    onSelect={handleOnSelect}
                                    onFocus={handleOnFocus}
                                    fuseOptions={{ keys: ["name", "mobile_phone"] }}
                                    autoFocus
                                />
                            </div>
                        </header>
                        <div>
                            <Nav.Link href="#" onClick={handleAddPatient}><PersonPlusFill /></Nav.Link>
                        </div>
                    </div>

                    {/* <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    /> */}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description*</Form.Label>
                    <Form.Control type="reset" size="sm" as="textarea" rows={3} onChange={e => setMessage(e.target.value)} value={message} placeholder="Enter message" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSendMessage}>
                    Send SMS
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>User Name*</Form.Label>
                            <Form.Control size="sm" type="text" onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="Enter user name" />
                        </Form.Group>
                    </Col>  <Col>
                        <Form.Group>
                            <Form.Label>Password*</Form.Label>
                            <Form.Control size="sm" type="password" onChange={e => setLastName(e.target.value)} value={lastName} placeholder="Enter Password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Date of Birth*</Form.Label>
                            <Form.Control size="sm" type="date" placeholder="Enter date" onChange={e => setBirthDate(e.target.value)} value={birthDate} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Gender*</Form.Label>
                            <Form.Control onChange={e => setGender(e.target.value)} value={gender} size="sm" as="select">
                                <option value=""></option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Language</Form.Label>
                            <Form.Control onChange={e => setLanguage(e.target.value)} value={language} size="sm" as="select">
                                <option value=""></option>
                                <option value='English'>English</option>
                                {/* <option value='Hindi'>Hindi</option> */}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>EHR ID</Form.Label>
                            <Form.Control onChange={e => setEhrId(e.target.value)} value={ehrId} size="sm" type="text" placeholder="Enter EHR ID" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                     Enrolled in Program
                    </Col>
                    <Col>
                        <Form.Check
                            type='checkbox'
                            label='CCM'
                            onChange={toggleIsccm}
                            value={isccm}
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type='checkbox'
                            label='PCM'
                            onChange={toggleIspcm}
                            value={ispcm}
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type='checkbox'
                            label='RPM'
                            onChange={toggleIsrpm}
                            value={isrpm}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col>
                        <h6>Care Team</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <form>
                    <Form.Label>Care Coordinator</Form.Label>
                        <Input  name='coordinator' required={false} register={register}  value={pcm} elementType='select'  options={coreContext.careCoordinatorOptions}  onChange={e => setPcm(e.target.value)} />

                    </form>
                        {/* <Form.Group>
                            <Form.Label>Care Coordinator</Form.Label>
                            <Form.Control size="sm" as="select" onChange={e => setPcm(e.target.value)} value={pcm}>
                                <option value=""></option>
                                <option value="Dykes, Kami">Dykes, Kami</option>
                                <option value="Ortiz, Lisa">Ortiz, Lisa</option>
                                <option value="Ortiz, Lisa">Ortiz, Lisa</option>

                            </Form.Control>
                        </Form.Group> */}
                    </Col>
                    <Col>
                    <form>
                    <Form.Label>Provider</Form.Label>
                        <Input  name='provider' required={false} register={register}  value={pp} elementType='select'  options={coreContext.providerOptions}  onChange={e => setPp(e.target.value)} />

                    </form>
                        {/* <Form.Group>
                            <Form.Label>Providers</Form.Label>
                            <Form.Control size="sm" as="select" onChange={e => setPp(e.target.value)} value={pp} options={coreContext.providerOptions} >
                            
                            </Form.Control>
                        </Form.Group> */}
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col>
                        <h6>Contact Information</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Home Phone</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter home phone" onChange={e => setHomePhone(e.target.value)} value={homePhone} />
                        </Form.Group>
                    </Col>  <Col>
                        <Form.Group>
                            <Form.Label>Mobile Phone</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter mobile phone" onChange={e => setMobilePhone(e.target.value)} value={mobilePhone} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Work Phone</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="212-333-1234-123" onChange={e => setWorkPhone(e.target.value)} value={workPhone} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Row>
                        <Col>Preferred Phone</Col>
                        <Col>
                            <Form.Control size="sm" as="select" onChange={e => setPreferred(e.target.value)} value={preferred} >
                                <option value=""></option>
                                <option value="Home">Home</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Work">Work</option>
                            </Form.Control>

                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Phone Notes</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Phone Notes" onChange={e => setPhoneNotes(e.target.value)} value={phoneNotes} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md='8'>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control size="sm" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                        </Form.Group>
                    </Col>
                    {/* <Col md='2'>
                        <Form.Check
                            type='checkbox'
                            label='Has Mobile'
                            onChange={toggleHasMobile}
                            value={hasMobile}
                        />

                    </Col> */}
                    <Col md='2'>
                        <Form.Check
                            type='checkbox'
                            label='Send SMS'
                            onChange={toggleSendSms}
                            value={sendSms}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Mailing address</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter Street Location" onChange={e => setStreet(e.target.value)} value={street} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter ZIP" onChange={e => setZip(e.target.value)} value={zip} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter City" onChange={e => setCity(e.target.value)} value={city} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter State" onChange={e => setState(e.target.value)} value={state} />
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Row style={{ marginTop: 20 }}>
                    <Col>
                        <h6>Additional</h6>
                    </Col>
                </Row> */}
                {/* <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>POS</Form.Label>
                            <Form.Control size="sm" as="select" onChange={e => setPos(e.target.value)} value={pos}>
                                <option value=""></option>
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Public Health Clinic">Public Health Clinic</option>
                                <option value="Rural Health Clinic">Rural Health Clinic</option>
                                <option value="Assisted Living Facility">Assisted Living Facility</option>
                                <option value="Walk In Retail Health Clinic">Walk In Retail Health Clinic</option>
                                <option value="Urgent Care Facility">Urgent Care Facility</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Risk Scope</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter RAF" onChange={e => setRaf(e.target.value)} value={raf} />
                        </Form.Group>
                    </Col>
                </Row> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onCreatePatientSubmit}>
                    Create Patient
                </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment >
   
    </>
    );
}

export default TopMenu;
