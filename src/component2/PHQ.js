import React from 'react';
import {useForm} from "react-hook-form"
import '../App2.css'

const PHQ = ({handleReduceIndex,tab5}) => {
    const que=["Little interest or pleasure in doing things","Feeling down, depressed or hopeless","Feeling nervous, anxious or on edge","Not being able to stop or control worrying"]
    const { register, handleSubmit} = useForm();
      const onSubmit = data => tab5(data);
      
      
    return (
        <div className="container" >

            <h2>
            PHQ-2 & GAD

            </h2>
            <h4>
            Over the last 2 weeks, how often have you been bothered by the following problems?
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
            <table class="table">
  <thead>
    <tr>
      <th scope="col" style={{width:"70%"}}></th>
      <th scope="col">0 - Not at all</th>
      <th scope="col">1 - Several days</th>
      <th scope="col">2 - More than half the days	 </th>
      <th scope="col">3 - Nearly every         </th>
    </tr>
  </thead>
  <tbody>
      {que.map((curr)=>{
          return(
              <>
              <tr>
        <td>{curr}</td>
        <td><input className="form-check-input" type="radio" name={curr}  value="0" ref={register}/></td>
        <td><input className="form-check-input" type="radio" name={curr}  value="1" ref={register}/></td>
        <td><input className="form-check-input" type="radio" name={curr}  value="2" ref={register}/></td>
        <td><input className="form-check-input" type="radio" name={curr}  value="3" ref={register}/></td>
       
     </tr>
              </>
          )
      })}
      
    </tbody>
</table>
<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>handleReduceIndex()}>Back</button>
<button type="submit" className="btn btn-lg btn-primary mt-2 mx-5">Submit</button>
</div>
</form>
        </div>

    )
}

export default PHQ
