import React,{useState,useContext} from 'react';
import '../App2.css'
import { useForm } from "react-hook-form";
import { CoreContext } from '../context/core-context';
import DatePicker from "react-datepicker";
import { ArrowRight } from 'react-bootstrap-icons';
//import "react-datepicker/dist/react-datepicker.css";



const PatientInfo = ({handleChangeIndex,tab1}) => {
    var curr = new Date();
   var date= curr.setDate(curr.getDate());
    //curr.setDate(curr.getDate() + 3);
   // var date = curr.toISOString().substr(0,10);
    const coreContext = useContext(CoreContext);
    const [CurrentDate, setCurrentDate] = useState(date);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const [DateOfBirth,setDateOfBirth]=useState("");
    const [EmailAddress, setEmailAddress] = useState("");
    const [Address1, setAddress1] = useState("");
 const [Address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip,setZip]=useState("");

    const [CurrentMedicineStatus, setCurrentMedicineStatus] = useState("");
    const [listofMedicine, setlistofMedicine] = useState("");
    const [PhoneNumber,setPhoneNumber]=useState("");
    const [mystyle,setMystyle]=useState({display:"none"})
  //  const onSubmit = data => console.log(data);
     const [CurrentMedicine, setCurrentMedicine] = useState("");
     const stateList=[ 'Armed Forces America','Armed Forces','Armed Forces Pacific','Alabama',
        'Alaska','American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        "Idaho",
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
       ' Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming']
        const addvalue=(CurrentDate,FirstName,LastName,sex,DateOfBirth,PhoneNumber,EmailAddress,Address1,Address2,city,state,zip,CurrentMedicine,listofMedicine)=>{
            if (!FirstName||!FirstName||!LastName||!sex||!DateOfBirth||!PhoneNumber||!EmailAddress||!Address1||!Address2||!city||!state||!zip||!CurrentMedicine){
                return null  
                         
            }
            
            else{
            const PatientData={
                CurrentDate: formatDate(CurrentDate),
                FirstName: FirstName,
                LastName: LastName,
                sex: sex,
                DateOfBirth: formatDate(DateOfBirth),
                PhoneNumber: PhoneNumber,
                EmailAddress: EmailAddress,
                Address1: Address1,
                Address2: Address2,
                city: city,
                state: state,
                zip: zip,
                CurrentMedicineStatus: CurrentMedicine,
                listofMedicine:listofMedicine
            }
            tab1(PatientData);
            coreContext.getTab1data(PatientData);
            handleChangeIndex();
        }
        }
        const formatDate=(c)=>{
           // alert(Date(CurrentDate))
            var date = new Date(c);
            return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
    
        }
        const submitPatientInfo=(e)=>{
            setMystyle({display:"block"})
            
           e.preventDefault();
           addvalue(CurrentDate,FirstName,LastName,sex,DateOfBirth,PhoneNumber,EmailAddress,Address1,Address2,city,state,zip,CurrentMedicine,listofMedicine);
                   }
    
   return (
        <>
 
        <div className="container" >
                   <h1>Patient Information</h1>
        <form >
            <div className="row">
        <div className="col-md-3 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
    <DatePicker selected={CurrentDate} className="form-control" placeholderText="select date" onChange={(e) => setCurrentDate(e)}  />
    
    {/* <input type="text" className="form-control" placeholder="Select Date" value={CurrentDate} id="datepicker" name="CurrentDate" onChange={(e)=>setCurrentDate(e.target.value)}/> */}
   
</div>
</div>
    <label htmlFor="basic-url" className="form-label">Full Name</label>
    <div className="row mx-1">
    <div className="input-group mb-3 ">

  <input type="text" className="form-control " placeholder="First" name="FirstName" value={FirstName} onChange={(e)=>setFirstName(e.target.value)} />
  
  <input type="text" className="form-control mx-2" placeholder="MI" />
  
  <input type="text" className="form-control "  placeholder="Last"name="LastName" value={LastName} onChange={(e)=>setLastName(e.target.value)} />
  
  </div>
  {(!FirstName ||!LastName)?<div className="error" style={mystyle}>First and Last are required.</div>:null}
  
</div>
<div className="row">
    <div className="col-md-4">
        <label htmlFor="gender">Sex:</label>
            <div className="form-group" name="sex" value={sex} onChange={(e)=>setSex(e.target.value)} >
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sex"  value="Male"/>
            
            <label className="form-check-label" htmlFor="Male">Male</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sex"  value="Female"/>
            
            <label className="form-check-label" htmlFor="Female">Female</label>
        </div>
                </div>
                {(!sex)?<div className="error" style={mystyle}> sex are required.</div>:null}
            </div>
  
    </div>
    <div className="col-md-4">
        
            <div className="form-group">
            <label  className="labelspace mx-3">Date of Birth:</label>
                <div className="col-md-12">
                <DatePicker className="form-control input-sm" placeholderText="select date" selected={DateOfBirth} onChange={(e) => setDateOfBirth(e)} style={{
            height: "50px"
          }}/>
               
                    {/* <input type="Date" className="form-control input-sm" name="DateOfBirth" value={DateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)} /> */}
  
                </div>
            </div>
            {(!DateOfBirth)?<div className="error" style={mystyle}>Date of Birth is required.</div>:null}
    </div>
    <div className="col">
        <label  className="labelspace mx-3" >Phone:</label>
            <div className="form-group">
                <div className="col-md-12">
                    <input type="text" className="form-control input-sm" Placeholder="Phone"name="PhoneNumber" value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                   
                </div>
            </div>
            {(!PhoneNumber)?<div className="error" style={mystyle}>Phone Number is required.</div>:null}
    </div>
</div>
<div className="mb-3">
  <label htmlFor="Email" className="form-label">Email address</label>
  <input type="email" className="form-control" placeholder="Enter Email...." name="EmailAddress" value={EmailAddress} onChange={(e)=>setEmailAddress(e.target.value)} />
  {(!EmailAddress)?<div className="error" style={mystyle}>Email Address required.</div>:null}
 </div>
<div className="mb-3">
  <label className="form-label " >Address:</label>
  <input type="text" className="form-control mb-2" placeholder="Address Line1:" name="Address1" value={Address1} onChange={(e)=>setAddress1(e.target.value)} />
 
  <input type="text" className="form-control mb-2" placeholder="Address Line2:" name="Address2" value={Address2} onChange={(e)=>setAddress2(e.target.value)}/>
  <div className="row ">
      <div className="col-md-4">
      <input type="text" className="form-control" placeholder="City" name="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
      </div>
      <div className="col-md-4">
      <select className="form-control"  name="state" value={state} onChange={(e)=>setState(e.target.value)}>
      <option  value="" selected disabled>State</option>
      {stateList.map((curr)=>{
     return <option value={curr}>{curr}</option> })}
      </select>
      </div>
      <div className="col-md-4">
      <input  className="form-control" placeholder="Zip Code"name="zip" value={zip} onChange={(e)=>setZip(e.target.value)}/>
      
      </div>
    
  </div>
  {(!Address1||!zip||!state||!city)?<div className="error" style={mystyle}>AddressLine1,city,state,zip are required</div>:null}
  {(!Address2)?<div className="error" style={mystyle}>AddressLine2 is required</div>:null}

</div>
<div className="form-group col-md-5" style={{marginLeft:"-10px"}} >
    <label htmlFor="exampleFormControlSelect1">Are you currently taking any medications? </label>
    <select className="form-control sahil" name="CurrentMedicine" value={CurrentMedicine} onChange={(e)=>setCurrentMedicine(e.target.value)}>
    <option></option>
      <option value="yes">yes</option>
      <option value="no" >No</option>
  
    </select>
    {(!CurrentMedicine)?<div className="error" style={mystyle}>Are you currently taking any medications? is required.</div>:null}
  </div>
  {(CurrentMedicine==="yes")?<div className="form-group" name="ListOfmedicine" value={listofMedicine} onChange={(e)=>setlistofMedicine(e.target.value)}>
    <label htmlFor="">Please List</label>
    <textarea className="form-control" rows="3" ></textarea>
    {(!listofMedicine)?<div className="error" style={mystyle}>List of medicines are required.</div>:null}
  </div>  
  :null}
 
  
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={submitPatientInfo} >Next</button>

    </form>
    </div>
  
    
    </>)
}

export default PatientInfo
