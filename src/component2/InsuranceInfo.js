import React,{useState} from 'react';
import '../App2.css';
import DatePicker from "react-datepicker";
const InsuranceInfo = ({handleChangeIndex,handleReduceIndex,tab2}) => {
    const [relation,setRelation]=useState("");
    const [Primaryinsurance,setInsurance]=useState("");
    const [Secondaryinsurance,setSecondaryInsurance]=useState("");
    const [PrimaryInsurerName, setPrimaryInsurerName] = useState("");
    const [PolicyHolderFName, setPolicyHolderFName] = useState("");
    const [PolicyHolderLName, setPolicyHolderLName] = useState("");
    const [RelationWithPolicyHolder, setRelationWithPolicyHolder] = useState("");
    const [PolicyDateOfBirth,setPolicyDateOfBirth]=useState();
    const [PrimaryPolicyNumber, setPrimaryPolicyNumber] = useState("");
    const [SecondaryInsurer, setSecondaryInsurer] = useState("");
    const [PrimaryMemberID, setPrimaryMemberID] = useState("");
    const [SecondaryInsurerName, setSecondaryInsurerName] = useState("");
    const [SecondaryInsurerGroupID,setSecondaryInsurerGroupID]=useState("");
    const [DriversLicense,setDriversLicense]=useState("");
    const [mystyle,setMystyle]=useState({display:"none"})
  const[SecondaryInsurerPolicy,setSecondaryInsurerPolicy]=  useState("");
  const formatDate=(c)=>{
    // alert(Date(CurrentDate))
     var date = new Date(c);
     return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())

 }
  
        var newrelation;

        const addvalue=(Primaryinsurance,PrimaryInsurerName,PolicyHolderFName,PolicyHolderLName,relation,PolicyDateOfBirth,PrimaryPolicyNumber,PrimaryMemberID,Secondaryinsurance,SecondaryInsurerName,SecondaryInsurerGroupID,SecondaryInsurerPolicy,DriversLicense)=>{
            if (Primaryinsurance==="No" && DriversLicense!==""){
                const InsuranceData={
                    Primaryinsurance:Primaryinsurance,
                    PrimaryInsurerName:PrimaryInsurerName,
                    PolicyHolderFName:PolicyHolderFName,
                    PolicyHolderLName:PolicyHolderLName,
                    relation:relation,
                    PolicyDateOfBirth:formatDate(PolicyDateOfBirth),
                    PrimaryPolicyNumber:PrimaryPolicyNumber,
                    PrimaryMemberID:PrimaryMemberID,
                    Secondaryinsurance:Secondaryinsurance,
                    SecondaryInsurerName:SecondaryInsurerName,
                    SecondaryInsurerGroupID:SecondaryInsurerGroupID,
                    SecondaryInsurerPolicy:SecondaryInsurerPolicy,
                    DriversLicense:DriversLicense
                }
                tab2(InsuranceData)
                handleChangeIndex();
            }
            
            else if (!PrimaryInsurerName||!PolicyHolderFName||!PolicyHolderLName||!relation||!PolicyDateOfBirth||!PrimaryMemberID||!PrimaryPolicyNumber||!Secondaryinsurance){
                return null
            }
            else if(Secondaryinsurance==="yes" &&(!SecondaryInsurerName||!SecondaryInsurerGroupID||!SecondaryInsurerPolicy)){
                    return null
            }
            else{
            const InsuranceData={
                Primaryinsurance:Primaryinsurance,
                PrimaryInsurerName:PrimaryInsurerName,
                PolicyHolderFName:PolicyHolderFName,
                PolicyHolderLName:PolicyHolderLName,
                relation:relation,
                PolicyDateOfBirth:formatDate(PolicyDateOfBirth),
                PrimaryPolicyNumber:PrimaryPolicyNumber,
                PrimaryMemberID:PrimaryMemberID,
                Secondaryinsurance:Secondaryinsurance,
                SecondaryInsurerName:SecondaryInsurerName,
                SecondaryInsurerGroupID:SecondaryInsurerGroupID,
                SecondaryInsurerPolicy:SecondaryInsurerPolicy,
                DriversLicense:DriversLicense
            }
            tab2(InsuranceData)
            handleChangeIndex();
        }
        }

        const submitInsuranceInfo=(e)=>{
            setMystyle({display:"block"})
            e.preventDefault();
            addvalue(Primaryinsurance,PrimaryInsurerName,PolicyHolderFName,PolicyHolderLName,relation,PolicyDateOfBirth,PrimaryPolicyNumber,PrimaryMemberID,Secondaryinsurance,SecondaryInsurerName,SecondaryInsurerGroupID,SecondaryInsurerPolicy,DriversLicense);
                    }
     
    
    return (
        <div>
            <div className="container" >
                <h3>Insurance Information</h3>
                <div className="row">
    <div className="col-md-4" >
        <label htmlFor="insur">Do you have a insurance carrier? </label>
            <div className="form-group" defaualtValue="no" value={Primaryinsurance} onChange={(e)=>setInsurance(e.target.value)}>
                
                
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="PrimaryInsurer"  value="yes"  />
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="PrimaryInsurer" value="No" />
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
        
        
 
            </div>
            {(!Primaryinsurance)?<div className="error" style={mystyle} style={mystyle}>Select any option</div>:null}
    </div>
    {(Primaryinsurance==="No")?
    <div className="col-md-5 mb-3 mx-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Drivers license</label>
    <input type="text" className="form-control" placeholder="Driver License"name="DriversLicense" value={DriversLicense} onChange={(e)=>setDriversLicense(e.target.value)}/>
    {(!DriversLicense)?<div className="error" style={mystyle} style={mystyle}>DriverLicense# is required</div>:null}
</div>:null}
    </div>

{(Primaryinsurance==="yes")?<><h3>Primary insurance Information</h3>
<div className="row mx-1">
{/* <div className="col-md-12 mb-3"> */}
  <label htmlFor="Primary insurance carrier's name" className="form-label">Primary insurance carrier's name</label>
  <input type="text" className="form-control" name="PrimaryInsurer" value={PrimaryInsurerName} onChange={(e)=>setPrimaryInsurerName(e.target.value)}/>

  {(!PrimaryInsurerName)?<div className="error" style={mystyle} style={mystyle}>Primary insurance carrier's name is required</div>:null}

{/* </div> */}
</div>

<label className="form-label mx-1">Policy holder's name</label>
    <div className="row mx-1">
    <div className="input-group mb-3">

  <input type="text" className="form-control " placeholder="First" name="PolicyHolderFName" value={PolicyHolderFName} onChange={(e)=>setPolicyHolderFName(e.target.value)} />

  <input type="text" className="form-control mx-2"  placeholder="Last" name="PolicyHolderLName" value={PolicyHolderLName} onChange={(e)=>setPolicyHolderLName(e.target.value)}/>
  </div>
  {(!PolicyHolderFName||!PolicyHolderLName)?<div className="error" style={mystyle} style={mystyle}>First and Last Name are required</div>:null}

</div>
<label className="mx-1"htmlFor="gender">Relationship to patient </label>
<div className="row mx-1">
        
            <div className="form-group" name="relation" value={relation} onChange={(e)=>setRelation(e.target.value)} >
                <div className="col-md-12">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="Parent"  />
            <label className="form-check-label" htmlFor="parent" >Parent</label></div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="sibling" />
            <label className="form-check-label" htmlFor="sibling" >Sibling</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation"  value="Child"  />
            <label className="form-check-label" htmlFor="Child">Child</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"name="relation" value="Friend"  />
            <label className="form-check-label" htmlFor="Friend">Friend</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value={newrelation} />
            <label className="form-check-label" htmlFor="sahil"><input  value={newrelation}  onChange={(e)=>(newrelation=e.target.value)} type="text"/></label>
        </div>
                </div>
                {(!relation)?<div className="error" style={mystyle} style={mystyle}>Relationship to patient is required</div>:null}

            </div>
            
    </div>
    <div className="row ">
        <div className="col-md-12 mt-2">
    <label htmlFor="exampleFormControlInput1" className="form-label">Date of Birth</label><br/>
    
    {/* <input type="Date" className="form-control" placeholder="Select Date" name="PolicyHolderDateOfBirth" value={PolicyDateOfBirth} onChange={(e)=>setPolicyDateOfBirth(e.target.value)}/> */}
    <DatePicker selected={PolicyDateOfBirth} className="form-control policyDOB" placeholderText="select date" onChange={(e) => setPolicyDateOfBirth(e)}  />
    {(!relation)?<div className="error" style={mystyle} style={mystyle}>Date Of Birth is required</div>:null}
</div>
</div>
<div className="row mt-2">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="PrimaryMemberID" value={PrimaryMemberID} onChange={(e)=>setPrimaryMemberID(e.target.value)}/>
    {(!PrimaryMemberID)?<div className="error" style={mystyle} style={mystyle}>Group/MemberID# is required</div>:null}
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="PrimaryPolicyNumber" value={PrimaryPolicyNumber} onChange={(e)=>setPrimaryPolicyNumber(e.target.value)} />
    {(!PrimaryPolicyNumber)?<div className="error" style={mystyle} style={mystyle}>Policy# is required</div>:null}
</div>
</div>
<div className="row">
    <div className="col-md-4">
        <label htmlFor="gender">Do you have a Second insurance carrier? </label>
            <div className="form-group" value={Secondaryinsurance} onChange={(e)=>setSecondaryInsurance(e.target.value)}>
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes"  />
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="No"/>
            
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>

            </div>
            {(!Secondaryinsurance)?<div className="error" style={mystyle} style={mystyle}>Do you have a Second insurance carrier? is required</div>:null}
    </div>
    
   
</div>
{(Secondaryinsurance==="yes")?<><h3>Secondary insurance Information</h3>
<div className="row">
<div className="col-md-7 mb-3">
  <label htmlFor="Primary insurance carrier's name" className="form-label">Secondary insurance carrier's name</label>
  <input type="text" className="form-control" name="SecondaryInsurerName" value={SecondaryInsurerName} onChange={(e)=>setSecondaryInsurerName(e.target.value)}/>
  
</div>
{(!SecondaryInsurerName)?<div className="error" style={mystyle} style={mystyle}>Secondary insurance carrier's name is required</div>:null}
</div>
<div className="row">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="SecondaryGroupID" value={SecondaryInsurerGroupID} onChange={(e)=>setSecondaryInsurerGroupID(e.target.value)}/>
    {(!SecondaryInsurerGroupID)?<div className="error" style={mystyle} style={mystyle}>Group/MemberID# is required</div>:null}
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="secondaryInsurerPolicy" value={SecondaryInsurerPolicy} onChange={(e)=>setSecondaryInsurerPolicy(e.target.value)}/>
    {(!SecondaryInsurerPolicy)?<div className="error" style={mystyle} style={mystyle}>Policy# is required</div>:null}
</div>
</div></>:null}


</>:null}


<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5" onClick={submitInsuranceInfo}>Next</button>
</div>
</div>


            </div>
        
    )
}

export default InsuranceInfo
