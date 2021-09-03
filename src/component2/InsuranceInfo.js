import React,{useState} from 'react';
import '../App2.css';

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
  const[SecondaryInsurerPolicy,setSecondaryInsurerPolicy]=  useState("");
  
        var newrelation;

        const addvalue=(Primaryinsurance,PrimaryInsurerName,PolicyHolderFName,PolicyHolderLName,relation,PolicyDateOfBirth,PrimaryPolicyNumber,PrimaryMemberID,Secondaryinsurance,SecondaryInsurerName,SecondaryInsurerGroupID,SecondaryInsurerPolicy,DriversLicense)=>{
            if (Primaryinsurance==="No" && DriversLicense!==""){
                const InsuranceData={
                    Primaryinsurance:Primaryinsurance,
                    PrimaryInsurerName:PrimaryInsurerName,
                    PolicyHolderFName:PolicyHolderFName,
                    PolicyHolderLName:PolicyHolderLName,
                    relation:relation,
                    PolicyDateOfBirth:PolicyDateOfBirth,
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
                PolicyDateOfBirth:PolicyDateOfBirth,
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
                <div className="col">
                
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="PrimaryInsurer"  value="yes"  />
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="PrimaryInsurer" value="No" />
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
        
        </div>
 
            </div>
            {(!Primaryinsurance)?<div className="error">Select any option</div>:null}
    </div>

{(Primaryinsurance==="yes")?<><h3>Primary insurance Information</h3>
<div className="col-md-7 mb-3">
  <label htmlFor="Primary insurance carrier's name" className="form-label">Primary insurance carrier's name</label>
  <input type="text" className="form-control" name="PrimaryInsurer" value={PrimaryInsurerName} onChange={(e)=>setPrimaryInsurerName(e.target.value)}/>

  {(!PrimaryInsurerName)?<div className="error">Primary insurance carrier's name is required</div>:null}
</div>

<label className="form-label">Policy holder's name</label>
    <div className="row">
    <div className="input-group mb-3">

  <input type="text" className="form-control " placeholder="First" name="PolicyHolderFName" value={PolicyHolderFName} onChange={(e)=>setPolicyHolderFName(e.target.value)} />

  <input type="text" className="form-control mx-2"  placeholder="Last" name="PolicyHolderLName" value={PolicyHolderLName} onChange={(e)=>setPolicyHolderLName(e.target.value)}/>
  </div>
  {(!PolicyHolderFName||!PolicyHolderLName)?<div className="error">First and Last Name are required</div>:null}

</div>

<div className="row">
        <label htmlFor="gender">Relationship to patient </label>
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

            </div>
            {(!relation)?<div className="error">Relationship to patient is required</div>:null}
    </div>
    <div className="row">
        <div className="col-md-3 mt-2">
    <label htmlFor="exampleFormControlInput1" className="form-label">Date of Birth</label>
    <input type="Date" className="form-control" placeholder="Select Date" name="PolicyHolderDateOfBirth" value={PolicyDateOfBirth} onChange={(e)=>setPolicyDateOfBirth(e.target.value)}/>
    {(!relation)?<div className="error">Date Of Birth is required</div>:null}
</div>
</div>
<div className="row">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="PrimaryMemberID" value={PrimaryMemberID} onChange={(e)=>setPrimaryMemberID(e.target.value)}/>
    {(!PrimaryMemberID)?<div className="error">Group/MemberID# is required</div>:null}
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="PrimaryPolicyNumber" value={PrimaryPolicyNumber} onChange={(e)=>setPrimaryPolicyNumber(e.target.value)} />
    {(!PrimaryPolicyNumber)?<div className="error">Policy# is required</div>:null}
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
    </div>
    {(!Secondaryinsurance)?<div className="error">Do you have a Second insurance carrier? is required</div>:null}
</div>
{(Secondaryinsurance==="yes")?<><h3>Secondary insurance Information</h3>
<div className="col-md-7 mb-3">
  <label htmlFor="Primary insurance carrier's name" className="form-label">Secondary insurance carrier's name</label>
  <input type="text" className="form-control" name="SecondaryInsurerName" value={SecondaryInsurerName} onChange={(e)=>setSecondaryInsurerName(e.target.value)}/>
  {(!SecondaryInsurerName)?<div className="error">Secondary insurance carrier's name is required</div>:null}
</div>
<div className="row">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="SecondaryGroupID" value={SecondaryInsurerGroupID} onChange={(e)=>setSecondaryInsurerGroupID(e.target.value)}/>
    {(!SecondaryInsurerGroupID)?<div className="error">Group/MemberID# is required</div>:null}
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="secondaryInsurerPolicy" value={SecondaryInsurerPolicy} onChange={(e)=>setSecondaryInsurerPolicy(e.target.value)}/>
    {(!SecondaryInsurerPolicy)?<div className="error">Policy# is required</div>:null}
</div>
</div></>:null}

</>:<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Drivers license</label>
    <input type="text" className="form-control" placeholder="Driver License"name="DriversLicense" value={DriversLicense} onChange={(e)=>setDriversLicense(e.target.value)}/>
    {(!DriversLicense)?<div className="error">DriverLicense# is required</div>:null}
</div>
}
</div>
<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5" onClick={submitInsuranceInfo}>Next</button>
</div>



            </div>
        </div>
    )
}

export default InsuranceInfo
