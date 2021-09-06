import React,{useContext, useState,useEffect} from 'react';
import {useForm} from "react-hook-form"
import '../App2.css'
import { CoreContext } from '../context/core-context';
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

const PHQ = ({handleReduceIndex,tab5}) => {
  let history = useHistory();
  const [load,setLoad]=useState(false);
    const que=["Little interest or pleasure in doing things","Feeling down, depressed or hopeless","Feeling nervous, anxious or on edge","Not being able to stop or control worrying"]
    const coreContext = useContext(CoreContext);
    const { register, handleSubmit} = useForm();
      const onSubmit = data =>{
        tab5(data);
      coreContext.SubmitIntakeRequest();
      console.log(coreContext.result)
      
      }
      const renderloader=()=>{
        if (coreContext.result.length===0){
          return <div style={{ height: 100, width: '100%',display: 'flex',  justifyContent:'center', marginTop: '10px', alignItems:'center' }}>
            <div>Please wait till process complete, please dont refresh and click.</div>
          <Loader
     type="Circles"
     color="#00BFFF"
     height={50}
     width={50}
  /></div>
  
        }
        if(coreContext.result.length>0){
          history.push("/thankyou");
        }
        
      } 
  
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
{(load===true)?renderloader():null}
<div className="btn-grp">
<button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>handleReduceIndex()}>Back</button>
<button type="submit" className="btn btn-lg btn-primary mt-2 mx-5" onClick={()=>setLoad(true)}>Submit </button>
</div>
</form>
<div>
  
</div>
        </div>

    )
}

export default PHQ
