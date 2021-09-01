import React,{useState} from 'react';
import '../App.css'


const PatientInfo = ({handleChangeIndex,register,trigger,errors}) => {
     const [CurrentMedicine, setCurrentMedicine] = useState("");
     const state=[ 'Armed Forces America','Armed Forces','Armed Forces Pacific','Alabama',
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
        var curr = new Date();
        curr.setDate(curr.getDate() + 3);
        var date = curr.toISOString().substr(0,10);
    
   return (
        <>
 
        <div className="container" >
                   <h1>Patient Information</h1>
        <form>
            <div className="row">
        <div className="col-md-3 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
    <input type="Date" defaultValue={date} className="form-control" placeholder="Select Date" name="CurrentDate" {...register("CurrentDate",{ required: true})}/>
    {/* {errors.CurrentDate && <div className="error">This field is Required</div>}     */}
</div>
</div>
    <label htmlFor="basic-url" className="form-label">Full Name</label>
    <div className="row">
    <div className="input-group mb-3">

  <input type="text" className="form-control " placeholder="First" {...register("FirstName",{ required: true})} />
  {/* {errors.FirstName && <div className="error">This field is Required</div>} */}
  <input type="text" className="form-control mx-2" placeholder="MI" {...register("MiddleName")}/>
  {/* {errors.MiddleName && <div className="error">This field is Required</div>} */}
  <input type="text" className="form-control "  placeholder="Last"{...register("LastName",{ required: true})}/>
  {/* {errors.LastName && <div className="error">This field is Required</div>} */}
  </div>
  {errors.LastName &&errors.FirstName && <div className="error">First and Last are required.</div>}
</div>
<div className="row">
    <div className="col-md-4">
        <label htmlFor="gender">Sex:</label>
            <div className="form-group" >
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="Male"  value="Male" {...register("sex",{ required: true})}/>
            
            <label className="form-check-label" htmlFor="Male">Male</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="Female"  value="Female" {...register("sex",{ required: true})}/>
            
            <label className="form-check-label" htmlFor="Female">Female</label>
        </div>
                </div>
            </div>
            {errors.sex && <div className="error">Sex is required.</div>}
    </div>
    <div className="col-md-4">
        <label  className="labelspace">Date of Birth:</label>
            <div className="form-group">
                <div className="col-md-10">
                    <input type="Date" className="form-control input-sm" name="DateOfBirth" {...register("DateOfBirth",{ required: true})}/>
                    {errors.DateOfBirth && <div className="error">Date of Birth is required.</div>}
                </div>
            </div>
    </div>
    <div className="col">
        <label  className="labelspace">Phone:</label>
            <div className="form-group">
                <div className="col-md-12">
                    <input type="text" className="form-control input-sm" name="Phone" placeholder="Enter Phone Number" {...register("PhoneNumber",{ required: true,pattern: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}x[0-9]{4}/i })}/>
                    {errors?.PhoneNumber?.type === "required"&& <div className="error">Phone is required.</div>}
                    {errors?.PhoneNumber?.type === "pattern" && (
        <div className="error">Phone must be formatted as (###)###-#### x####.
        </div>
      )}
                </div>
            </div>
    </div>
</div>
<div className="mb-3">
  <label htmlFor="Email" className="form-label">Email address</label>
  <input type="email" className="form-control" placeholder="Enter Email...." {...register("EmailAddress",{ required: true,pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}/>
  {errors?.EmailAddress?.type==="required" && <div className="error">Email is Required</div>}
  {errors?.EmailAddress?.type==="pattern" && <div className="error">Email must be formatted as name@address.xyz.</div>}
</div>
<div className="mb-3">
  <label htmlFor="Email" className="form-label " >Address:</label>
  <input type="text" className="form-control mb-2" name="line1" {...register("Address.line1")}placeholder="Address Line1:"/>
 
  <input type="text" className="form-control mb-2" placeholder="Address Line2:" name="line2" {...register("Address.line2") }/>
  <div className="row ">
      <div className="col-md-4">
      <input type="text" className="form-control" placeholder="City" {...register("Address.city",{ required: true})}/>
      </div>
      <div className="col-md-4">
      <select className="form-control"  {...register("Address.State",{ required: true})}>
      <option  value="" selected disabled>State</option>
      {state.map((curr)=>{
     return <option value={curr}>{curr}</option> })}
      </select>
      </div>
      <div className="col-md-4">
      <input  className="form-control" placeholder="Zip Code" {...register("AddressZip",{ required: true,pattern:/^[0-9]{5}-[0-9]{4}/})}/>
      {errors?.AddressZip?.type==="pattern" && <div className="error">Zip Code must be formatted as #####-####.</div>}
      </div>
    
  </div>
  {errors.Address && <div className="error">Address Line 1, City, State and Zip Code are required.</div>}
</div>
<div className="form-group col-md-5" >
    <label htmlFor="exampleFormControlSelect1">Are you currently taking any medications? </label>
    <select className="form-control sahil" {...register("CurrentMedicineStatus",{required:true})} value={CurrentMedicine} onChange={(e)=>setCurrentMedicine(e.target.value)}>
    <option></option>
      <option value="yes">yes</option>
      <option value="no" >No</option>
     {console.log("sahil",CurrentMedicine)}
    </select>
    {errors.CurrentMedicineStatus && <div className="error">Are you currently taking any medications? is required.</div>}
  </div>
  {(CurrentMedicine==="yes")?<div className="form-group">
    <label htmlFor="">Please List</label>
    <textarea className="form-control" rows="3" {...register("listofMedicine",{ required: true})}></textarea>
    {errors.listofMedicine && <div className="error">list of medicines are Required</div>}
  </div>:null}
 
  
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{return (CurrentMedicine==="yes")?trigger(["FirstName","LastName","sex","DateOfBirth","PhoneNumber","EmailAddress","Address","CurrentMedicineStatus","listofMedicine"]):trigger(["FirstName","LastName","sex","DateOfBirth","PhoneNumber","EmailAddress","Address","CurrentMedicineStatus"]),console.log(errors),(Object.keys(errors).length===0)?handleChangeIndex():null}}>Next</button>
    </form>
    </div>
  
    
    </>)
}

export default PatientInfo
