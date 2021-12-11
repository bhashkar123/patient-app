import React, { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Modal from '@material-ui/core/Modal';
import { CoreContext } from "../../context/core-context";
import Loader from "react-loader-spinner";

const Modal2 = ({getenduser}) => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true);}
  const handleClose = () => setOpen(false);
  const coreContext = useContext(CoreContext);
  
  useEffect(() => {
    coreContext.fetchPatientListfromApi("doctor",localStorage.getItem("userId"))
  }, []);
  const renderpatient=()=>{
    if (coreContext.patients.length === 0) {
        return (
          <div
            style={{
              height: 680,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              alignItems: "center",
            }}>
            <Loader type="Circles" color="#00BFFF" height={100} width={100} />
          </div>
        );
      }
      if(coreContext.patients.length >0){
       
       {
           coreContext.patients.map((curr)=>{
               return(
                   <>
                   <h1>{curr.name}</h1>
                   </>
               )
           })
       }
       
      }
  }
    
    return (
        <div>
            <div style={{textAlign:"right"}}>
            <Button color="secondary" variant="contained" onClick={handleOpen}>Chat</Button>
            </div>
            <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
><Box sx={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}}>
   <Typography>Whom you want to chat?</Typography>
   {coreContext.patients.map((curr)=>{
       return(<>
     <Button variant="outlined" onClick={()=>{getenduser(curr.userId);handleClose()}}>
       {curr.name}
      
     </Button>
       
       </>)
   })}
         
        </Box>
      </Modal>
     
            
        </div>
    )
}

export default Modal2
