import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Badge, Modal, Button } from "react-bootstrap";
import { CoreContext } from "../context/core-context";
import Input from "./common/Input";

import { LockFill } from "react-bootstrap-icons";

const SignUp = (props) => {
  const coreContext = useContext(CoreContext);
  const registerUser = () => {
    coreContext.Registration(userName, email, phone, password, birthDate);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const onEmailChangedHandler = (e) => {
    setEmail(e.target.value);
    setUserName(e.target.value);
  };

  const onUserNameChangedHandler = (e) => {
    setUserName(e.target.value);
  };

  const onPhoneChangedHandler = (e) => {
    setPhone(e.target.value);
  };

  const onDOBChangedHandler = (e) => {
    setEmail(e.target.value);
    setBirthDate(e.target.value);
  };

  const onPasswordChangedHandler = (e) => {
    if (e.target.value !== rePassword)
      setMessage("Password and Confirm password do not match !");
    else setMessage("");
    setPassword(e.target.value);
  };

  const onRePasswordChangedHandler = (e) => {
    if (password !== e.target.value)
      setMessage("Password and Confirm password do not match !");
    else setMessage("");
    setRePassword(e.target.value);
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Modal
            show={coreContext.showPatientConfirmationModal}
            onHide={coreContext.handlePatientConfirmationModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Verification Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Enter the verification code sent on your Email ID </p>
              <input
                type="text"
                className="form-control"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() =>
                  coreContext.verifyProviderVerificationCode(
                    verificationCode,
                    email,
                    "",
                    "/login"
                  )
                }>
                Submit
              </Button>
              <Button
                variant="secondary"
                onClick={coreContext.handleProviderModalClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-title mx-auto">
              <h3>
                <Badge variant="success">Sign Up</Badge>
              </h3>
            </div>
            <div className="card-body">
              <Form
                autoComplete="off"
                onSubmit={handleSubmit(registerUser)}
                noValidate>
                <Input
                  label="User Name"
                  elementType="text"
                  minLength={5}
                  maxLength={55}
                  placeholder="Enter user name"
                  name="userName"
                  required={true}
                  register={register}
                  errors={errors}
                />

                <Input
                  label="Phone"
                  elementType="text"
                  placeholder="Enter phone"
                  onChange={onPhoneChangedHandler}
                  required={true}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="phone"
                />

                <Input
                  label="Date of Birth"
                  elementType="date"
                  placeholder="Enter DOB"
                  onChange={onDOBChangedHandler}
                  required={true}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="dob"
                />

                <Input
                  label="Email"
                  elementType="email"
                  minLength={5}
                  maxLength={55}
                  placeholder="Enter email"
                  onChange={onEmailChangedHandler}
                  name="email"
                  required={true}
                  register={register}
                  errors={errors}
                  pattern={
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                  }
                />

                <Input
                  label="Password"
                  elementType="password"
                  placeholder="Enter Password"
                  onChange={onPasswordChangedHandler}
                  required={true}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="password"
                />

                <Input
                  label="Confirm Password"
                  elementType="password"
                  placeholder="Re-enter Password"
                  onChange={onRePasswordChangedHandler}
                  required={true}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="password"
                />

                <Input
                  disabled={password !== rePassword}
                  blockButton={true}
                  value="Register"
                  elementType="button"
                  variant="primary"
                />
                <br />
                <center> {coreContext.renderLoader()}</center>
                <center>
                  {" "}
                  <Input variant="danger" label={message} elementType="label" />
                </center>
                <br />
                <br />
                <center>
                  <a href="reset-password">
                    <LockFill /> Forgot your password?
                  </a>
                </center>
                <br />
                <br />
                <center>
                  <a href="login"> Already have an account ? Sign In </a>{" "}
                </center>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
