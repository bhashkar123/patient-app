import React from 'react'

const counter = () => {
    const [count,setcount]=useState(0);
    const increament=()=>{
        setcount(count+1);
    }
    const decrement=()=>{
        setcount(count-1);
    }
    const reset=()=>{
        setcount(0);
    }
    return (
        <div>
            <>
            <div>{count}</div>
            <Button onClick={()=>increament()}>increase</Button>
            <Button onClick={()=>decreament()}>increase</Button>
            <Button onClick={()=>reset()}>reset</Button>
            </>
        </div>
    )
}

export default counter
