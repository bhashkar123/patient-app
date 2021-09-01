import React,{useState} from 'react'

const InsuranceInfo = ({handleChangeIndex,handleReduceIndex,register,errors,trigger}) => {
    const [relation,setRelation]=useState("");
    const [Primaryinsurance,setInsurance]=useState("");
    const [Secondaryinsurance,setSecondaryInsurance]=useState("");
    const handlenext=()=>{
        if(Primaryinsurance==="yes"&&Secondaryinsurance==="yes"){
            trigger(["PrimaryInsurer","PrimaryInsurerName","PolicyHolderFName","PolicyHolderLName","RelationWithPolicyHolder","PolicyDateOfBirth","PrimaryMemberID","PrimaryPolicyNumber","SecondaryInsurer","SecondaryInsurerName","SecondaryInsurerGroupID","DriversLicense"])
        }
        else if(Primaryinsurance==="yes"&&Secondaryinsurance==="no"||Secondaryinsurance===""){
            trigger(["PrimaryInsurer","PrimaryInsurerName","PolicyHolderFName","PolicyHolderLName","RelationWithPolicyHolder","PolicyDateOfBirth","PrimaryMemberID","PrimaryPolicyNumber","SecondaryInsurer","DriversLicense"])
        }
        else if(Primaryinsurance===""){
            trigger(["DriversLicense"])
        }
        else{
            trigger(["PrimaryInsurer","DriversLicense"])
        }
        

        if (Object.keys(errors).length===0){
            handleChangeIndex()
            console.log(errors)
        }
    }
    var newrelation;
    
    return (
        <div>
            <div className="container" >
                <h3>Insurance Information</h3>
                <div className="row">
    <div className="col-md-4" >
        <label htmlFor="insur">Do you have a insurance carrier? </label>
            <div className="form-group" value={Primaryinsurance} onChange={(e)=>setInsurance(e.target.value)}>
                <div className="col">
                
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="PrimaryInsurer"  value="yes"   {...register("PrimaryInsurer",{required:true})}/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="PrimaryInsurer" value="No"{...register("PrimaryInsurer",{required:true})} />
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
        
        </div>
 
            </div>
    </div>
    {errors.PrimaryInsurer && <div className="error">This field is Required</div>}                  
{(Primaryinsurance==="yes")?<><h3>Primary insurance Information</h3>
<div className="col-md-7 mb-3">
  <label htmlFor="Primary insurance carrier's name" className="form-label">Primary insurance carrier's name</label>
  <input type="text" className="form-control" {...register("PrimaryInsurerName",{required: true})}/>
  {errors.PrimaryInsurerName && <div className="error">Primary Insurance Carrier's Name is required.</div>}
  
</div>

<label className="form-label">Policy holder's name</label>
    <div className="row">
    <div className="input-group mb-3">

  <input type="text" className="form-control " placeholder="First" {...register("PolicyHolderFName",{required: true})} />

  <input type="text" className="form-control mx-2"  placeholder="Last" {...register("PolicyHolderLName",{required: true})}/>
  </div>
  {errors.PolicyHolderFName && errors.PolicyHolderLName && <div className="error">First and Last are required.</div>}

</div>

<div className="row">
        <label htmlFor="gender">Relationship to patient </label>
            <div className="form-group"  >
                <div className="col-md-12">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="Parent"  {...register("RelationWithPolicyHolder",{required: true})}/>
            <label className="form-check-label" htmlFor="parent" >Parent</label></div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="sibling" {...register("RelationWithPolicyHolder",{required: true})}/>
            <label className="form-check-label" htmlFor="sibling" >Sibling</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation"  value="Child"  {...register("RelationWithPolicyHolder",{required: true})}/>
            <label className="form-check-label" htmlFor="Child">Child</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"name="relation" value="Friend"  {...register("RelationWithPolicyHolder",{required: true})}/>
            <label className="form-check-label" htmlFor="Friend">Friend</label>
        </div>
        
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value={newrelation}  {...register("RelationWithPolicyHolder",{required: true})}/>
            <label className="form-check-label" htmlFor="sahil"><input  value={relation}  onChange={(e)=>(newrelation=setRelation(e.target.value))} type="text"/></label>
        </div>
                </div>
                {errors.RelationWithPolicyHolder && <div className="error">Relationship to patient is required.</div>}
            </div>
    </div>
    <div className="row">
        <div className="col-md-3 mt-2">
    <label htmlFor="exampleFormControlInput1" className="form-label">Date of Birth</label>
    <input type="Date" className="form-control" placeholder="Select Date" name="Date" {...register("PolicyDateOfBirth",{required: true})}/>
    {errors.PolicyDateOfBirth && <div className="error">Date of Birth is required.</div>}
</div>
</div>
<div className="row">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="group" {...register("PrimaryMemberID",{required: true})} />
    {errors.PrimaryMemberID && <div className="error">Group # is required.</div>}
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="policynumber"  {...register("PrimaryPolicyNumber",{required: true})} />
    {errors.PrimaryPolicyNumber && <div className="error">Policy / Member ID # is required.</div>}
</div>
</div>
<div className="row">
    <div className="col-md-4">
        <label htmlFor="gender">Do you have a Second insurance carrier? </label>
            <div className="form-group" value={Secondaryinsurance} onChange={(e)=>setSecondaryInsurance(e.target.value)}>
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes" {...register("SecondaryInsurer",{required: true})} />
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="No"  value="No"{...register("SecondaryInsurer",{required: true})}/>
            
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
                {errors.SecondaryInsurer && <div className="error">Do you have a second insurance carrier? is required?</div>}
            </div>
    </div>
</div>
{(Secondaryinsurance==="yes")?<><h3>Secondary insurance Information</h3>
<div className="col-md-7 mb-3">
  <label htmlFor="Primary insurance carrier's name" className="form-label">Secondary insurance carrier's name</label>
  <input type="text" className="form-control" {...register("SecondaryInsurerName",{required: true})}/>
  {errors.SecondaryInsurerName && <div className="error">
Secondary Insurance Carrier's Name is required.</div>}
  
</div>
<div className="row">
        <div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Group/MemberID#</label>
    <input type="text" className="form-control" placeholder="Group.." name="SecodaryGroup" {...register("SecondaryInsurerGroupID",{required: true})}/>
    {errors.SecondaryInsurerGroupID && <div className="error">Policy / Member ID # is required.</div>}
</div>
<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Policy#</label>
    <input type="text" className="form-control" placeholder="Policy.." name="Secondarypolicy" {...register("SecondaryInsurerPolicy")}/>
    {errors.SecondaryInsurerPolicy && <div className="error">Group # is required.</div>}
</div>
</div></>:null}

</>:<div className="col-md-5 mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Drivers license</label>
    <input type="text" className="form-control" placeholder="Policy.." name="Secondarypolicy" {...register("DriversLicense",{required: true})}/>
    {errors.DriversLicense && <div className="error">Drivers License is required.</div>}
</div>
}
</div>
<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5"onClick={()=>handlenext()}>Next</button>
</div>



            </div>
        </div>
    )
}

export default InsuranceInfo
