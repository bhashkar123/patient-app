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
const Menu = (props) => {


    const renderCareTeamInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin') return <React.Fragment>
            <NavDropdown title={<div style={{ display: "inline-block" }}><GiCook size={20} /> Care Team </div>} id="collasible-nav-dropdown">
                {/* <NavDropdown.Item to="/dashboard"> Dashboard</NavDropdown.Item> */}
                <NavDropdown.Item href="/provider"> Provider</NavDropdown.Item>
                <NavDropdown.Item href="/care-coordinator" > Care Coordinator</NavDropdown.Item>
                <NavDropdown.Item href="/coach"> Coach</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }
    const renderAverage = () => {

        const userType = localStorage.getItem("userType");
        if (userType !== 'patient') return <React.Fragment>
            <NavDropdown title={<div style={{ display: "inline-block" }}><GiCook size={20} /> Average </div>} id="collasible-nav-dropdown">
                {/* <NavDropdown.Item to="/dashboard"> Dashboard</NavDropdown.Item> */}
                <NavDropdown.Item to="/bloodpressureaverage"> Blood Pressure</NavDropdown.Item>
                <NavDropdown.Item to="/bloodglucoseaverage"> Blood Glucose</NavDropdown.Item>
                <NavDropdown.Item to="/weightaverage"> Weight</NavDropdown.Item>
                
            </NavDropdown>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }

    const renderOrderInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin' || userType === 'patient') return <React.Fragment> <li className="nav-item">
            <Link className="nav-link" to="#"><GiOrangeSlice size={20} /> Orders</Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>

        return '';
    }

    const renderDeviceInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin') return <React.Fragment> <li className="nav-item">
            <Link className="nav-link" to="/device-info"><GiCagedBall size={20} /> Device information</Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>

        return '';
    }

  
    const renderPatientInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType !== 'patient') return <React.Fragment> <li className="nav-item" >
            <Link className="nav-link" to="/patients"><PersonFill size={20} /> Patient Information</Link>
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
            <Link className="nav-link" to={dUrl}><GiCagedBall size={20} /> Dashboard</Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>
        else if (userType === 'patient') return <React.Fragment> <li className="nav-item">
            <Link className="nav-link" to={dUrl}><GiCagedBall size={20} /> Dashboard</Link>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }

    return (<nav className="navbar sidemenu" variant='light' style={{ backgroundColor: "rgb(1, 41, 113)" }} >

        <ul className="navbar-nav col-12 pr-2" style={{  height: "900px" }}>

            {renderDashboard()}


            {renderPatientInformation()}

            {renderCareTeamInformation()}

            <li className="nav-item">
                <Link className="nav-link" to="/bloodpressure"><GiAbstract071 size={20} /> Blood Pressure</Link>
            </li>
            <NavDropdown.Divider />
            <li className="nav-item">
                <Link className="nav-link" to="/bloodglucose"><GiAcid size={20} /> Blood Glucose</Link>
            </li>
            <NavDropdown.Divider />
            <li className="nav-item">
                <Link className="nav-link" to="/weight"><GiWeight size={20} /> Weight</Link>
            </li>
            <NavDropdown.Divider />
            {(localStorage.getItem("userType")==="admin")?<><li className="nav-item">
                <Link className="nav-link" to="/thresold"><GiAerialSignal size={20} /> Thresold</Link>
            </li> <NavDropdown.Divider /></>:""}
           {/* /<NavDropdown.Divider /> */}
            {renderOrderInformation()}
            {/* {renderAverage()} */}
            {renderDeviceInformation()}
        </ul>

    </nav>)
}

export default Menu;