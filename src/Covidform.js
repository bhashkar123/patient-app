import './App2.css';
import InsuranceInfo from './component2/InsuranceInfo';
import PatientInfo from './component2/PatientInfo';
import HealthHistory from './component2/HealthHistory';
import COVID19 from './component2/COVID19';
import PHQ from './component2/PHQ';
import { CoreContext } from  '../src/context/core-context';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import React,{useContext, useState,useEffect} from 'react';
import logo from './logo.png'
import Helmet from 'react-helmet';


import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
function TabPanel(props) {
  const { children, value, index,...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));


const Covidform=()=> {
  
  //console.log(localStorage.getItem("dataSaved"))
  const [value, setValue] = useState(0);
  const [index,setIndex]=useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const [PatientData,SetPatientData]=useState();
  const [CovidData,SetCovidData]=useState();
  const [InsuranceData,SetInsuranceData]=useState();
  const [HealthData,SetHealthData]=useState();
  const [PHQData,SetPHQData]=useState();
  const coreContext = useContext(CoreContext);


  // Clear cache
  
  localStorage.setItem('app_isAuth', '');
  localStorage.setItem('app_jwt', '');
  localStorage.setItem('app_userId', '');
  localStorage.setItem('app_userEmail', '');
  localStorage.setItem('userName', '');
  localStorage.setItem("userType", '');
  localStorage.setItem("userId", '');
  localStorage.setItem("userEmail", '');
  localStorage.setItem("app_email", '');
  localStorage.setItem("app_userName", '');
  localStorage.setItem("patientName", '');
  localStorage.setItem("app_patient", '');

  
  const Tab1=(data)=>{
    SetPatientData(data);
   // console.log("sahil",PatientData)
}
console.log("sahil3",PatientData)
  
const Tab5=(data)=>{
  SetPHQData(data);
}

const Tab2=(data)=>{
  SetInsuranceData(data);
}

const Tab3=(data)=>{
  SetHealthData(data);
}

const Tab4=(data)=>{
  SetCovidData(data);
}

    
  const handleChangeIndex = () => {
    setValue(value+1);
  //  alert("clicked")
    setIndex(index+1);
  };
  const handleReduceIndex = () => {
    setValue(value-1);
  //  alert("clicked")
    setIndex(index-1);
  };
  const handleTabs = (tab)=>{
    if (index-tab>=0){
      
      setIndex(tab);
      setValue(tab);
}
    //setIndex(ind)
  }
    return ( <>
    <div style={{backgroundColor:"#3d403e"}}>
      <div style={{height:"5vh"}}>
        </div>
    <div className="container p-0">
    
      <div className="image"style={{width:"100%",height:"25vh",backgroundColor:"#dae4eb"}}>
      {/* <img src={require('C:\Users\Sahil Arora\Desktop\covid_Form\covid\src\logo.png')} /> */}
      <img src={logo} className="mx-auto d-block"/>
      <h2><center>A PATTERN Medical Clinic COVID-19 Intake Form</center></h2>
      </div>
      {/* //</div><div className={classes.root}> */}
      <AppBar position="static" color="default">

      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        //onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Patient information" onClick={()=>handleTabs(0)} {...a11yProps(0)} />
        <Tab label="Insurance Information" onClick={()=>handleTabs(1)} {...a11yProps(1)} />
        <Tab label="Health & Medical history" onClick={()=>handleTabs(2)} {...a11yProps(2)} />
        <Tab label="COVID-19 Questionnaire"onClick={()=>handleTabs(3)} {...a11yProps(3)} />
        <Tab label="PHQ-2 &GAD" onClick={()=>handleTabs(4)} {...a11yProps(4)} />
      </Tabs>
      </AppBar>
      
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        //onChangeIndex={handleChangeIndex}
      >
        
        <TabPanel value={value} index={index} dir={theme.direction}>
        <PatientInfo handleChangeIndex={handleChangeIndex} tab1={Tab1}/>
        </TabPanel>
         <TabPanel value={value} index={index} dir={theme.direction}>
        <InsuranceInfo handleChangeIndex={handleChangeIndex}handleReduceIndex={handleReduceIndex} tab2={Tab2}/>
        </TabPanel>
        <TabPanel value={value} index={index} dir={theme.direction}>
        <HealthHistory handleChangeIndex={handleChangeIndex} handleReduceIndex={handleReduceIndex} tab3={Tab3}/>
        </TabPanel>
        <TabPanel value={value} index={index} dir={theme.direction}>
        <COVID19 handleChangeIndex={handleChangeIndex}handleReduceIndex={handleReduceIndex}tab4={Tab4}/>
        </TabPanel>
        <TabPanel value={value} index={index} dir={theme.direction}>
           <PHQ  handleChangeIndex={handleChangeIndex}handleReduceIndex={handleReduceIndex} tab5={Tab5}/>
        </TabPanel> 
    
        </SwipeableViews>
        
    </div>
    </div>
        </>
    );
}

export default Covidform;