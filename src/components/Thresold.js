import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import IonRangeSlider from 'react-ion-slider';


const Thresold = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);

    const [thData, setThData] = useState([]);
    const [bgMin, setBgMin] = useState(0);
    const [bgMax, setBgMax] = useState(0);
    const [userType, setUserType] = useState('');

    const [bmiMin, setBmiMin] = useState(0);
    const [bmiMax, setBmiMax] = useState(0);

    const [diastolicMin, setDiastolicMin] = useState(0);
    const [diastolicMax, setDiastolicMax] = useState(0);

    const [systolicMin, setSystolicMin] = useState(0);
    const [systolicMax, setSystolicMax] = useState(0);

    const [weightMin, setWeightMin] = useState(0);
    const [weightMax, setWeightMax] = useState(0);
    const [patient, setPatient] = useState({});
    const [patientId, setPatientId] = useState({});

    const fetchThresold = () => {
        // const p = JSON.parse(localStorage.getItem('app_patient'));
        // setPatient(p);
        const uId = localStorage.getItem("userId");
        setUserType(localStorage.getItem("userType"));
        const patientId = uId.split("_").pop();
        setPatient(patientId);
        coreContext.fetchThresold("ADMIN", localStorage.getItem("userType"));
        //  setThData(coreContext.thresoldData);



        /// setting default value
        if (coreContext.thresoldData.length === 0) {
            let thdata = {};
            const thDatas = [];
            thdata.Element_value = 'Blood Glucose';
            thdata.bg_low = 0;
            thdata.bg_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'BMI';
            thdata.bmi_low = 0;
            thdata.bmi_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Diastolic';
            thdata.diastolic_low = 0;
            thdata.diastolic_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Systolic';
            thdata.systolic_high = 0;
            thdata.systolic_low = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Weight';
            thdata.weight_low = 0;
            thdata.weight_high = 10;
            thDatas.push(thdata);
            setThData(thDatas);
        }
        else {
            setThData(coreContext.thresoldData);

            if (coreContext.thresoldData[0]) {
                setBgMin(coreContext.thresoldData[0].bg_low);
                setBgMax(coreContext.thresoldData[0].bg_high);
            }
            else {
                setBgMin(0);
                setBgMax(0);
            }



            if (coreContext.thresoldData[1]) {
                setBmiMin(coreContext.thresoldData[1].bmi_low);
                setBmiMax(coreContext.thresoldData[1].bmi_high);
            }
            else {
                setBmiMin(0);
                setBmiMax(0);
            }


            if (coreContext.thresoldData[2]) {
                setDiastolicMin(coreContext.thresoldData[2].diastolic_low);
                setDiastolicMax(coreContext.thresoldData[2].diastolic_high);
            }
            else {
                setDiastolicMin(0);
                setDiastolicMax(0);
            }



            if (coreContext.thresoldData[3]) {
                setSystolicMin(coreContext.thresoldData[3].systolic_low);
                setSystolicMax(coreContext.thresoldData[3].systolic_high);
            }
            else {
                setSystolicMin(0);
                setSystolicMax(0);
            }


            if (coreContext.thresoldData[4]) {
                setWeightMin(coreContext.thresoldData[4].weight_low);
                setWeightMax(coreContext.thresoldData[4].weight_high);
            }
            else {
                setWeightMin(0);
                setWeightMax(0);
            }

        }


    }

    useEffect(fetchThresold, [coreContext.thresoldData.length]);


    const onBGChange = (e) => {
        setBgMin(e.from);
        setBgMax(e.to);
        console.log(e.from, e.to);
    }

    const onBMIChange = (e) => {
        setBmiMin(e.from);
        setBmiMax(e.to);
    }



    const onDiastolicChange = (e) => {
        setDiastolicMin(e.from);
        setDiastolicMax(e.to);
    }
    const onSystolicChange = (e) => {
        setSystolicMin(e.from);
        setSystolicMax(e.to);
    }
    const onWeightChange = (e) => {
        setWeightMin(e.from);
        setWeightMax(e.to);
    }

    const UpdateThreshold = () => {
        console.log(bgMin, bgMax, bmiMin, bmiMax, diastolicMin, diastolicMax, systolicMin, systolicMax, weightMin, weightMax);;
    }


    return <React.Fragment>
        <div className='row'>
            <div className="col-md-6">
                <div className="card">
                    <div>
                        {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("ADMIN_" + patient.userId, 'bg', bgMax, bgMin, userType)} class="btn btn-primary mb-2 float-right"> Update</button> : ''}
                    </div>
                    <h4 className="card-header"> {thData[0] ? thData[0].Element_value : 'Blood Glucose'} (mg / dl) </h4>
                    <div className="card-body">
                        <IonRangeSlider keyboard={true} onStart={e => onBGChange(e)} onFinish={e => onBGChange(e)} type='double' min={0} max={500} from={bgMin} to={bgMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card">
                    <div>
                        {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("ADMIN_" + patient.userId, 'bmi', bmiMax, bmiMin, userType)} class="btn btn-primary mb-2 float-right"> Update</button> : ''}
                    </div>
                    <h4 className="card-header"> {thData[1] ? thData[1].Element_value : 'BMI'} (kg / m2) </h4>
                    <div className="card-body">
                        <IonRangeSlider keyboard={true} onFinish={e => onBMIChange(e)} type='double' min={0} max={100} from={bmiMin} to={bmiMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card">
                    <div>
                        {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("ADMIN_" + patient.userId, 'Diastolic', diastolicMax, diastolicMin, userType)} class="btn btn-primary mb-2 float-right"> Update</button> : ''}
                    </div>
                    <h4 className="card-header"> {thData[2] ? thData[2].Element_value : 'Diastolic'} (mmHg) </h4>
                    <div className="card-body">
                        <IonRangeSlider keyboard={true} onFinish={e => onDiastolicChange(e)} type='double' min={0} max={500} from={diastolicMin} to={diastolicMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card">
                    <div>
                        {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("ADMIN_" + patient.userId, 'Systolic', systolicMax, systolicMin, userType)} class="btn btn-primary mb-2 float-right"> Update</button> : ''}
                    </div>
                    <h4 className="card-header"> {thData[3] ? thData[3].Element_value : 'Systolic'} (mmHg) </h4>
                    <div className="card-body">
                        <IonRangeSlider keyboard={true} onFinish={e => onSystolicChange(e)} type='double' min={0} max={500} from={systolicMin} to={systolicMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card">
                    <div>
                        {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("ADMIN_" + patient.userId, 'Weight', weightMax, weightMin, userType)} class="btn btn-primary mb-2 float-right"> Update</button> : ''}   </div>
                    <h4 className="card-header"> {thData[4] ? thData[4].Element_value : 'Weight'} (lb) </h4>
                    <div className="card-body">
                        <IonRangeSlider keyboard={true} onFinish={e => onWeightChange(e)} type='double' min={50} max={700} from={weightMin} to={weightMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>

}

export { Thresold }