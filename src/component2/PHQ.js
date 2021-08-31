import React from 'react'

const PHQ = ({handleReduceIndex,register}) => {
    const que=["Little interest or pleasure in doing things","Feeling down, depressed or hopeless","Feeling nervous, anxious or on edge","Not being able to stop or control worrying"]
    return (
        <div className="container" style={{width:"70%"}}>
            <h2>
            PHQ-2 & GAD

            </h2>
            <h4>
            Over the last 2 weeks, how often have you been bothered by the following problems?
            </h4>
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
        <td><input className="form-check-input" type="radio" name={curr}  value="0" {...register(curr)}/></td>
        <td><input className="form-check-input" type="radio" name={curr}  value="1" {...register(curr)}/></td>
        <td><input className="form-check-input" type="radio" name={curr}  value="2"{...register(curr)} /></td>
        <td><input className="form-check-input" type="radio" name={curr}  value="3" {...register(curr)}/></td>
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
        </div>

    )
}

export default PHQ
