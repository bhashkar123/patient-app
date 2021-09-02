import { Tab } from '@material-ui/core';
import React,{useState} from 'react'
import '../App2.css';
import { useForm } from "react-hook-form";

const COVID19 = ({handleChangeIndex,handleReduceIndex,errors,trigger,register}) => {
  const [Travell, setTravell] = useState("");
  const handlenext=()=>{

    
    if(Travell==="no"&& Travell===""){
      trigger(["ContactWithCOVIDPerson","SyptomsOnsetDiagnosesDuration","Travelled","CovidSymptom"])
    }
    else{
      trigger(["ContactWithCOVIDPerson","SyptomsOnsetDiagnosesDuration","Travelled","CovidSymptom","Citiesvisited"])
    }
    if (Object.keys(errors).length===0){
      handleChangeIndex()
      console.log(errors)
  }
  }
    const symptoms=["High fever","Cough","Difficulty in breathing","Persistent pain or pressure in the chest","Body aches","Nasal congestion","Runny nose","Sore throat","Diarrhea","None"]
    return (
        <div className="container" >
            <h2>COVID-19 Questionnaire</h2>
            <div className="row">
    <div className="col-md-8 mt-2">
        <label htmlFor="gender"><b>Have you had close contact with someone with COVID-19? </b> </label>
            <div className="form-group" >
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes"{...register("ContactWithCOVIDPerson",{required:true})}/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="No"  value="No" {...register("ContactWithCOVIDPerson",{required:true})}/>
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
    </div>
</div>
{errors.ContactWithCOVIDPerson && <div className="error">This filed is Required</div>}
<div className="form-group">
  
    <label htmlFor=""><b>Describe your main concerns (symptoms, onset, diagnoses, duration, etc.) or none. </b></label>
    <textarea className="form-control" rows="3" {...register("SyptomsOnsetDiagnosesDuration")}></textarea>
    {errors.SyptomsOnsetDiagnosesDuration && <div className="error">Describe your main concerns (symptoms, onset, diagnoses, duration, etc.) or none. is required.</div>}
  </div>
  <div className="row">
    <div className="col-md-6 mt-2">
        <label htmlFor="gender"><b>Have you travelled in the past (1) month? </b> </label>
            <div className="form-group" value={Travell} onChange={(e)=>setTravell(e.target.value)}>
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes" {...register("Travelled",{required:true})}/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="No"  value="No"{...register("Travelled",{required:true})}/>
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
    </div>
</div>
{errors.Travelled && <div className="error">Have you travelled in the past (1) month? is required.</div>}
{(Travell==="yes")?<div className="form-group">
    <label htmlFor=""><b>Please specify the details of the cities/countries visited in the last month. </b></label>
    <textarea className="form-control" rows="3" {...register("Citiesvisited",{required:true})}></textarea>
    {errors.Citiesvisited && <div className="error">
Please specify the details of the cities/countries visited in the last month. is required.</div>}
  </div>:null}


<label  className="form-check-label"><b>Please check all tha apply:</b></label>
        <div className="row mt-2">
          {symptoms.map((curr) => {
            return (
              <>
                <div className="col-md-6">
                  <div className="form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck2"
                      {...register("CovidSymptom",{required:true})}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      {curr}
                    </label>
                  </div>
                </div>
              </>
            );
          })}
           {errors.CovidSymptom && <div className="error">Please check the symptoms that apply: is required.</div>}
       </div>
       <div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5"  onClick={()=>handlenext()}>Next</button>
</div>


        </div>
    )
}

export default COVID19
