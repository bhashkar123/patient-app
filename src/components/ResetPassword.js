import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Badge } from "react-bootstrap";
import { CoreContext } from "../context/core-context";
import Input from "./common/Input";

const ResetPassword = (props) => {
  const coreContext = useContext(CoreContext);
  const login = () => {
    coreContext.resetPassword(email, "/dashboard");
  };

  const [email, setEmail] = useState("");

  const onEmailChangedHandler = (e) => {
    setEmail(e.target.value);
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-title mx-auto">
              <h5>
                <Badge variant="success">
                  Enter your email and password reset code will sent to you!
                </Badge>
              </h5>
            </div>
            <div className="card-body">
              <Form
                autoComplete="off"
                onSubmit={handleSubmit(login)}
                noValidate>
                <Input
                  label="Email"
                  elementType="email"
                  minLength={5}
                  maxLength={55}
                  placeholder="Enter Email"
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
                  blockButton={true}
                  value="Send"
                  elementType="button"
                  variant="primary"
                />
                <br />
                <center> {coreContext.renderLoader()}</center>
                <center>
                  {" "}
                  <Input
                    variant="danger"
                    label={coreContext.message}
                    elementType="label"
                  />
                </center>
                <br />
                <br />
                <center>
                  <a href="login"> Remember it ? Sign in here </a>{" "}
                </center>
                <br />
                <br />
                <center>
                  <span>
                    {" "}
                    Don't have an account ? Please Contact A Pattern Medical
                    Clinic (423) 455-2711{" "}
                  </span>{" "}
                  {/* <a href="sign-up">
                    {" "}
                    Don't have an account ? Please Contact A Pattern Medical
                    Clinic @ (423) 455-2711{" "}
                  </a>{" "} */}
                </center>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ResetPassword };
