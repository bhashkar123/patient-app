/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { GiCook, GiAbstract071, GiAcid, GiWeight, GiAerialSignal, GiOrangeSlice, GiCagedBall } from 'react-icons/gi';
import { PersonFill } from 'react-bootstrap-icons';
import { NavDropdown } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const Menu2 = (props) => {


    const renderCareTeamInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin') return <React.Fragment>
            <NavDropdown title={<div style={{ display: "inline-block" }}><GiCook size={20} /> </div>} id="collasible-nav-dropdown">
                {/* <NavDropdown.Item to="/dashboard"> Dashboard</NavDropdown.Item> */}
                <NavDropdown.Item to="/provider"> Provider</NavDropdown.Item>
                <NavDropdown.Item to="/care-coordinator" > Care Coordinator</NavDropdown.Item>
                <NavDropdown.Item to="/coach"> Coach</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }

    const renderOrderInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin' || userType === 'patient') return <React.Fragment> <li className="nav-item">
            <Link className="nav-link" to="#"><GiOrangeSlice size={20} /> </Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>

        return '';
    }

    const renderDeviceInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin') return <React.Fragment> <li className="nav-item">
            <Link className="nav-link" to="/device-info"><GiCagedBall size={20} /> </Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>

        return '';
    }
    const renderAverage = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin' && userType === 'doctor') return <React.Fragment>
            <NavDropdown title={<div style={{ display: "inline-block" }}><GiCook size={20} />  </div>} id="collasible-nav-dropdown">
                {/* <NavDropdown.Item to="/dashboard"> Dashboard</NavDropdown.Item> */}
                <NavDropdown.Item to="/bloodpressureaverage"> Blood Pressure</NavDropdown.Item>
                
            </NavDropdown>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }
  
    const renderPatientInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType !== 'patient') return <React.Fragment> <li className="nav-item" >
            <Link className="nav-link" to="/patients"><PersonFill size={20} /> </Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>

        return '';
    }

    const renderDashboard = () => {

        const userType = localStorage.getItem("userType");
        const userId = localStorage.getItem("userId");
        const dUrl = userType === 'patient' ? '/patient-profile/' + userId.split("_").pop() : '/dashboard';
        if (userType === 'doctor') return <React.Fragment> <li className="nav-item">
            <Link className="nav-link" to={dUrl}><GiCagedBall size={20} /> </Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>
        else if (userType === 'patient') return <React.Fragment> <li className="nav-item">
            <Link className="nav-link" to={dUrl}><GiCagedBall size={20} /> </Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }

    return (<nav className="navbar sidemenu " variant='light' style={{ backgroundColor: "rgb(1, 41, 113)",width:"90%"}} >

        <ul className="navbar-nav " style={{  height: "900px" }}>

            {renderDashboard()}


            {renderPatientInformation()}

            {renderCareTeamInformation()}

            <li className="nav-item">
                <Link className="nav-link" to="/bloodpressure"><GiAbstract071 size={20} /> </Link>
            </li>
            <NavDropdown.Divider />
            <li className="nav-item">
                <Link className="nav-link" to="/bloodglucose"><GiAcid size={20} /> </Link>
            </li>
            <NavDropdown.Divider />
            <li className="nav-item">
                <Link className="nav-link" to="/weight"><GiWeight size={20} /></Link>
            </li>
            <NavDropdown.Divider />
            {(localStorage.getItem("userType")==="admin")?<><li className="nav-item">
                <Link className="nav-link" to="/thresold"><GiAerialSignal size={20} /> </Link>
            </li>
            <NavDropdown.Divider /></>:""}
            {renderOrderInformation()}
            {renderAverage()}
            {renderDeviceInformation()}
        </ul>

    </nav>)
}

export default Menu2;