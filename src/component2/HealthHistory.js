import React,{useState} from 'react';
import '../App2.css';

const HealthHistory = ({handleChangeIndex,handleReduceIndex,tab3}) => {
    const disease=["Anemia","Asthma","Arthritis","Cancer","Gout","Diabetes","Epilepsy Seizures","Heart Disease","Heart Attack","Rheumatic Fever","High Blood Pressure","Digestive Problems","Ulcerative Colitis","Hepatitis","Kidney Disease","Liver Disease","Thyroid Problems","Tuberculosis","Venereal Disease","Neurological Disorders","Bleeding Disorders","Lung Disease (Chronic Obstructive Pulmonary Disease)","None"]
    const [HealthHistory,setHealthHistry]=useState([]);
    const [Alergy, setAlergy] = useState("");
    const [mystyle,setMystyle]=useState({display:"none"})
    const Health=[];
    const addvalue=(Alergy,HealthHistory)=>{
      if(!Alergy||!HealthHistory){
        return null
      }
      else{
        const HealthData={
  
          Alergy:Alergy,
          HealthHistory:HealthHistory
        }
        tab3(HealthData)
        handleChangeIndex();
      }
      
    }
    const submitHealthHistory=(e)=>{
      setMystyle({display:"block"})
      e.preventDefault();
      addvalue(Alergy,HealthHistory);
              }

 
    return (
      <div className="container" style={{ width: "70%" }}>
        <h2>Health and Medical History</h2>
        <label  className="form-check-label"><b>Please check all tha apply:</b></label>
        <div className="row mt-2">
          {disease.map((curr) => {
            return (
              <>
                <div className="col-md-6">
                  <div className="form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="HealthHistory"
                      value={curr}
                      id="defaultCheck2"
                      onChange={(e)=>setHealthHistry([...HealthHistory,e.target.value])}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      {curr}
                    </label>
                  </div>
                 
                </div>
              </>
            );
          })}
           {(HealthHistory.length===0)?<div className="error" style={mystyle}>Please check all tha apply is required</div>:null}
          </div>
        
          
          <div className="row">
    <div className="col-md-4 mt-2">
        <label htmlFor="gender"><b>Do you have any alergy?</b> </label>
            <div className="form-group"  name="Alergy" value={Alergy} onChange={(e)=>setAlergy(e.target.value)}>
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes"/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="No" />
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
            
    </div>
    
</div>
{(!Alergy)?<div className="error" style={mystyle}>Select any one</div>:null}
<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5" onClick={submitHealthHistory}>Next</button>
</div>


        
      </div>
    );
}

export default HealthHistory
