import { Tab } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../App2.css';


const COVID19 = ({handleChangeIndex,handleReduceIndex,tab4}) => {
  const [Travell, setTravell] = useState("");
  const [ContactWithCOVIDPerson, setContactWithCOVIDPerson] = useState("");
  const [SyptomsOnsetDiagnosesDuration, setSyptomsOnsetDiagnosesDuration] = useState("");
  const [Travelled, setTravelled] = useState("");
  const [CovidSymptom, setCovidSymptom] = useState([]);
  const [Citiesvisited, setCitiesvisited] = useState("");
  const [mystyle,setMystyle]=useState({display:"none"})
  

  const addvalue=(Travell,ContactWithCOVIDPerson,SyptomsOnsetDiagnosesDuration,CovidSymptom,Citiesvisited)=>{
    if(!Travell||!ContactWithCOVIDPerson||!ContactWithCOVIDPerson||!CovidSymptom){
      return null
    }
    else if(Travell==="yes"&&Citiesvisited!==""){
      const CovidData={
        Travell: Travell,
        ContactWithCOVIDPerson:ContactWithCOVIDPerson,
        SyptomsOnsetDiagnosesDuration:SyptomsOnsetDiagnosesDuration,
        CovidSymptom:CovidSymptom,
        Citiesvisited:Citiesvisited
        
      }
      tab4(CovidData)
      handleChangeIndex();
    } 
    
    else{
      const CovidData={
        Travell: Travell,
        ContactWithCOVIDPerson:ContactWithCOVIDPerson,
        SyptomsOnsetDiagnosesDuration:SyptomsOnsetDiagnosesDuration,
        CovidSymptom:CovidSymptom,
        Citiesvisited:Citiesvisited
      }
      tab4(CovidData)
      handleChangeIndex();
    }
    
  }
  const submitCovidHistory=(e)=>{
    e.preventDefault();
    setMystyle({display:"block"})
    addvalue(Travell,ContactWithCOVIDPerson,SyptomsOnsetDiagnosesDuration,CovidSymptom,Citiesvisited);
    
  }


 
    const symptoms=["High fever","Cough","Difficulty in breathing","Persistent pain or pressure in the chest","Body aches","Nasal congestion","Runny nose","Sore throat","Diarrhea","None"]
    return (
        <div className="container" >
            <h2>COVID-19 Questionnaire</h2>
            <div className="row">
    <div className="col-md-8 mt-2">
        <label htmlFor="gender"><b>Have you had close contact with someone with COVID-19? </b> </label>
            <div className="form-group" name="ContactWithCovidPerson" value={ContactWithCOVIDPerson} onChange={(e)=>setContactWithCOVIDPerson(e.target.value)} >
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="Contact"  value="yes"/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="Contact"  value="No" />
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
            {(!ContactWithCOVIDPerson)?<div className="error" style={mystyle}>Select any one option</div>:null}
    </div>
   
</div>

<div className="form-group">
  
    <label htmlFor=""><b>Describe your main concerns (symptoms, onset, diagnoses, duration, etc.) or none. </b></label>
    <textarea className="form-control" rows="3" name="SyptomsOnsetDiagnosesDuration" value={SyptomsOnsetDiagnosesDuration} onChange={(e)=>setSyptomsOnsetDiagnosesDuration(e.target.value)} ></textarea>
    {(!SyptomsOnsetDiagnosesDuration)?<div className="error" style={mystyle}>Describe your main concerns (symptoms, onset, diagnoses, duration, etc.) or none. is required</div>:null}
  </div>
  <div className="row">
    <div className="col-md-6 mt-2">
        <label htmlFor="gender"><b>Have you travelled in the past (1) month? </b> </label>
            <div className="form-group" name="Travell" value={Travell} onChange={(e)=>setTravell(e.target.value)}>
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes"/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="No"/>
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
            {(!Travell)?<div className="error" style={mystyle}>Select any one option</div>:null}
    </div>
    
</div>

{(Travell==="yes")?<div className="form-group">
    <label htmlFor=""><b>Please specify the details of the cities/countries visited in the last month. </b></label>
    <textarea className="form-control" rows="3"  name="CityVisited" value={Citiesvisited} onChange={(e)=>setCitiesvisited(e.target.value)}></textarea>
    {(!Citiesvisited)?<div className="error" style={mystyle}>Please specify the details of the cities/countries visited in the last month. is required</div>:null}
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
                      value={CovidSymptom}
                      name="covidSymptom"
                      onChange={(e)=>setCovidSymptom([...CovidSymptom,e.target.value])}
                      id="defaultCheck2"
                      
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      {curr}
                    </label>
                  </div>
                </div>
              </>
            );
          })}
         {(CovidSymptom.length===0)?<div className="error" style={mystyle}>Please check all tha apply</div>:null}
       </div>
       <div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5"  onClick={submitCovidHistory}>Next</button>
</div>


        </div>
    )
}

export default COVID19
