import React,{useState} from 'react'

const InsuranceInfo = ({handleChangeIndex,handleReduceIndex,register}) => {
    const [relation,setRelation]=useState("");
    const [Primaryinsurance,setInsurance]=useState("");
    const [Secondaryinsurance,setSecondaryInsurance]=useState("");
    var newrelation;
    
    return (
        <div>
            <div className="container" style={{width:"70%"}}>
                <h3>Insurance Information</h3>
                <div className="row">
    <div className="col-md-4">
        <label htmlFor="gender">Do you have a insurance carrier? </label>
            <div className="form-group" value={Primaryinsurance} onChange={(e)=>setInsurance(e.target.value)} >
                <div className="col">
                    {console.log("sahilassa",Primaryinsurance)}
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="insuranceCarrier"  value="yes" {...register("PrimaryInsurer")}/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="insuranceCarrier" value="No" {...register("PrimaryInsurer")}/>
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
    </div>

{(Primaryinsurance==="yes")?<><h3>Primary insurance Information</h3>
<div className="col-md-7 mb-3">
  <label htmlFor="Primary insurance carrier's name" className="form-label">Primary insurance carrier's name</label>
  <input type="text" className="form-control" {...register("Primary insurer name")}/>
  
</div>

<label className="form-label">Policy holder's name</label>
    <div className="row">
    <div className="input-group mb-3">

  <input type="text" className="form-control " placeholder="First" {...register("PolicyHolderFName")} />

  <input type="text" className="form-control mx-2"  placeholder="Last" {...register("PolicyHolderLName")}/>
  </div>
</div>

<div className="row">
        <label htmlFor="gender">Relationship to patient </label>
            <div className="form-group"  >
                <div className="col-md-12">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="Parent"  {...register("RelationWithPolicyHolder")}/>
            <label className="form-check-label" htmlFor="parent" >Parent</label></div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="sibling" {...register("RelationWithPolicyHolder")}/>
            <label className="form-check-label" htmlFor="sibling" >Sibling</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation"  value="Child"  {...register("RelationWithPolicyHolder")}/>
            <label className="form-check-label" htmlFor="Child">Child</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"name="relation" value="Friend"  {...register("RelationWithPolicyHolder")}/>
            <label className="form-check-label" htmlFor="Friend">Friend</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value={newrelation}  {...register("RelationWithPolicyHolder")}/>
            <label className="form-check-label" htmlFor="sahil"><input  value={relation}  onChange={(e)=>(newrelation=setRelation(e.target.value))} type="text"/></label>
        </div>
                </div>
            </div>
    </div>
    <div className="row">
        <div className="col-md-3 mt-2">
    <label htmlFor="exampleFormControlInput1" className="form-label">Date of Birth</label>
    <input type="Date" className="form-control" placeholder="Select Date" name="Date" {...register("PolicyDateOfBirth")}/>
</div>
</div>
<div className="row">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="group" {...register("Group/MemberID")} />
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="policynumber"  {...register("PolicyNumber")} />
</div>
</div>
<div className="row">
    <div className="col-md-4">
        <label htmlFor="gender">Do you have a Second insurance carrier? </label>
            <div className="form-group" value={Secondaryinsurance} onChange={(e)=>setSecondaryInsurance(e.target.value)}>
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes" {...register("SecondaryInsurer")} />
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="No"  value="No"{...register("SecondaryInsurer")}/>
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
    </div>
</div>
{(Secondaryinsurance==="yes")?<><h3>Secondary insurance Information</h3>
<div className="col-md-7 mb-3">
  <label htmlFor="Primary insurance carrier's name" className="form-label">Secondary insurance carrier's name</label>
  <input type="text" className="form-control" {...register("SecondaryInsurerName")}/>
  
</div>
<div className="row">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="SecodaryGroup" {...register("SecondaryInsurerGroup/MemberID#")}/>
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="Secondarypolicy" {...register("SecondaryInsurerPolicy#")}/>
</div>
</div></>:null}

</>:<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Drivers license</label>
    <input type="text" className="form-control" placeholder="Policy.." name="Secondarypolicy" {...register("DriversLicense#")}/>
</div>
}
</div>
<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5" onClick={()=>{handleChangeIndex()}}>Next</button>
</div>



            </div>
        </div>
    )
}

export default InsuranceInfo
