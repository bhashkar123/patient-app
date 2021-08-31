import React,{useState} from 'react';

import '../App.css'


const PatientInfo = ({handleChangeIndex,register,onChange,getValues}) => {
     const [CurrentMedicine, setCurrentMedicine] = useState("");
    
   return (
        <>
 
        <div className="container" style={{width:"70%"}}>
                   <h1>Patient Information</h1>
        <form>
            <div className="row">
        <div className="col-md-3 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
    <input type="Date" className="form-control" placeholder="Select Date" name="te" {...register("Current Date")}/>
</div>
</div>
    <label htmlFor="basic-url" className="form-label">Full Name</label>
    <div className="row">
    <div className="input-group mb-3">

  <input type="text" className="form-control " placeholder="First" {...register("First Name")} />
  <input type="text" className="form-control mx-2" placeholder="MI" {...register("Middle Name")}/>
  <input type="text" className="form-control "  placeholder="Last"{...register("Last Name")}/>
  </div>
</div>
<div className="row">
    <div className="col-md-4">
        <label htmlFor="gender">Sex:</label>
            <div className="form-group" >
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="Male"  value="Male" {...register("sex")}/>
            <label className="form-check-label" htmlFor="Male">Male</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="Female"  value="Female" {...register("sex")}/>
            <label className="form-check-label" htmlFor="Female">Female</label>
        </div>
                </div>
            </div>
    </div>
    <div className="col-md-4">
        <label  className="labelspace">Date of Birth:</label>
            <div className="form-group">
                <div className="col-md-5">
                    <input type="Date" className="form-control input-sm" name="Date of Birth" {...register("Date of Birth")}/>
                    
                </div>
            </div>
    </div>
    <div className="col">
        <label  className="labelspace">Phone:</label>
            <div className="form-group">
                <div className="col-md-12">
                    <input type="text" className="form-control input-sm" name="Phone" placeholder="Enter Phone Number" {...register("Phone Number")}/>
                    
                </div>
            </div>
    </div>
</div>
<div className="mb-3">
  <label htmlFor="Email" className="form-label">Email address</label>
  <input type="email" className="form-control" placeholder="Enter Email...." {...register("Email Address")}/>
</div>
<div className="mb-3">
  <label htmlFor="Email" className="form-label " >Address:</label>
  <input type="text" className="form-control mb-2" name="line1" {...register("Address.line1")}placeholder="Address Line1:"/>
  <input type="text" className="form-control mb-2" placeholder="Address Line2:" name="line2" {...register("Address.line2") }/>
  <div className="row ">
      <div className="col-md-4">
      <input type="text" className="form-control" placeholder="City" {...register("Address.city")}/>
      </div>
      <div className="col-md-4">
      <input type="text" className="form-control" placeholder="State" {...register("Address.State")}/>
      </div>
      <div className="col-md-4">
      <input type="Number" className="form-control" placeholder="Zip Code" {...register("Address.Zip")}/>
      </div>
  </div>

</div>
<div className="form-group col-md-5">
    <label htmlFor="exampleFormControlSelect1">Are you currently taking any medications? </label>
    <select className="form-control sahil" value={CurrentMedicine} onChange={(e)=>setCurrentMedicine(e.target.value)}>
    <option></option>
      <option value="yes">yes</option>
      <option value="no" >No</option>
     {console.log("sahil",CurrentMedicine)}
    </select>
  </div>
  {(CurrentMedicine==="yes")?<div className="form-group">
    <label htmlFor="">Please List</label>
    <textarea className="form-control" rows="3" {...register("listofMedicine")}></textarea>
  </div>:null}
 
  
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleChangeIndex()}}>Next</button>
    </form>
    </div>
  
    
    </>)
}

export default PatientInfo
