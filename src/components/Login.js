import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Badge } from 'react-bootstrap';
import { CoreContext } from '../context/core-context';
import Input from './common/Input';
import Logo from '../assets/images/logo.png';

import { LockFill } from 'react-bootstrap-icons';

const Login = (props) => {
    const coreContext = useContext(CoreContext);
    const userType = localStorage.getItem("userType");
    const login = () => {
        // if(userType ==="patient"){
        //     const userId = localStorage.getItem("userId");
        //     const patientId =userId.split("_").pop();
        //     localStorage.setItem("userId",patientId)
        //     const url = 'patient-profile/' + patientId;
        //     coreContext.login(email, password, url);
        // }else{
        coreContext.login(email, password, '/dashboard');
        // }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChangedHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangedHandler = (e) => {
        setPassword(e.target.value);
    }
    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    return (

        
        <div style={{display: 'flex',  justifyContent:'center', marginTop: '150px', alignItems:'center'}}>
            
        <div className="card" style={{width: '450px' , borderRadius: '32px'}}>
            <div style={{display: 'flex',  justifyContent:'center', marginTop: '15px'}}>
            <a href="#">  <img src={Logo} style={{ height: 50 }} alt="" /></a>
            </div>
        <div className="card-body">
        
        <Form autoComplete='off' onSubmit={handleSubmit(login)} noValidate>
                                <Input label='Email' elementType='text' minLength={5} maxLength={55} placeholder='Enter user name' onChange={onEmailChangedHandler} name='email' required={true} register={register} errors={errors} />
                                <Input label='Password' elementType='password' placeholder='Enter Password' onChange={onPasswordChangedHandler} required={true} minLength={5} maxLength={55} register={register} errors={errors} name='password' />
                                <Input blockButton={true} value='Log In' elementType='button' variant='primary' />
                                <br />
                                <center> {coreContext.renderLoader()}</center>
                                <center> <Input variant='danger' label={coreContext.message} elementType='label' /></center>
                                <center><a href="reset-password"><LockFill />  Forgot your password?</a></center>
                                <br />
                                <center><a href="sign-up"> Don't have an account ? Signup now </a> </center>
                            </Form>
        </div>
        </div>
        </div>
    );

}






export { Login };