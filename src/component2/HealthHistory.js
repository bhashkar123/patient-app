import React from 'react'
import './App2.css';

const HealthHistory = ({handleChangeIndex,handleReduceIndex,errors,trigger,register}) => {
    const disease=["Anemia","Asthma","Arthritis","Cancer","Gout","Diabetes","Epilepsy Seizures","Heart Disease","Heart Attack","Rheumatic Fever","High Blood Pressure","Digestive Problems","Ulcerative Colitis","Hepatitis","Kidney Disease","Liver Disease","Thyroid Problems","Tuberculosis","Venereal Disease","Neurological Disorders","Bleeding Disorders","Lung Disease (Chronic Obstructive Pulmonary Disease)","None"]
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
                      value={curr}
                      id="defaultCheck2"
                      {...register("HealthHistory",{required:true})}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      {curr}
                    </label>
                  </div>
                </div>
              </>
            );
          })}
          {errors.HealthHistory && <div className="error">Please check all that apply: is required.</div>}
          <div className="row">
    <div className="col-md-4 mt-2">
        <label htmlFor="gender"><b>Do you have any alergy?</b> </label>
            <div className="form-group" >
                <div className="col">
                <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="yes"  value="yes"{...register("Alergy",{required:true})}/>
            <label className="form-check-label" htmlFor="yes">yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="No"  value="No" {...register("Alergy",{required:true})}/>
            <label className="form-check-label" htmlFor="No">No</label>
        </div>
                </div>
            </div>
    </div>
</div>
{errors.Alergy && <div className="error">Do you have any allergies?</div>}
<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>{handleReduceIndex()}}>Back</button>
<button type="button" className="btn btn-lg btn-primary mt-2 mx-5" onClick={()=>{return trigger(["HealthHistory","Alergy"]),(Object.keys(errors).length===0)?handleChangeIndex():null}}>Next</button>
</div>


        </div>
      </div>
    );
}

export default HealthHistory
