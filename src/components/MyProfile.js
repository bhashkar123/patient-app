import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Badge, Button } from "react-bootstrap";
import { CoreContext } from "../context/core-context";
import Input from "./common/Input";
import ImageUploader from "./common/UploadImage";
import { LockFill } from "react-bootstrap-icons";
import { DataGrid } from "@material-ui/data-grid";

const MyProfile = (props) => {
  const coreContext = useContext(CoreContext);
  const [deviceType, setDeviceType] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [patientid, setpatientId] = useState("");
  const updateUser = () => {
    coreContext.UpdateProfie(
      userName,
      email,
      phone,
      birthDate,
      height,
      weight,
      bmi
    );
  };

  const getUserData = () => {
    const patient = JSON.parse(localStorage.getItem("app_patient"));
    const pId = localStorage.getItem("userId");
    // coreContext.fetchDeviceData(pId);
    const patientId = pId.split("_").pop();

    setpatientId(patientId);
    setEmail(patient.userEmail);
    setUserName(patient.userName);
    setPhone(patient.phone);
    setBirthDate(patient.dob);
    setHeight(patient.height);
    setWeight(patient.weight);
    setBMI(patient.bmi);

    coreContext.fetchDeviceData(
      "PATIENT_" + patientId,
      patient.userName,
      "patient",
      "patient"
    );
    if (patient.userName.includes("||0")) {
      const u = patient.userName.replace("||0", "");
      setUserName(u);
      coreContext.UpdateProfie(
        u,
        patient.userEmail,
        patient.phone,
        patient.dob,
        patient.height,
        patient.weight,
        patient.bmi
      );
    }
  };

  useEffect(getUserData, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [timeZones, setTimeZones] = useState([
    { value: "", name: "Select Time Zone" },
    { value: "EST + 1", name: "Eastern  Time" },
    { value: "EST + 0", name: "Central  Time" },
    { value: "EST - 1", name: "Mountain Daylight  Time" },
    { value: "EST - 2", name: "Pacific Mountain  Time" },
    { value: "EST - 3", name: "Alaska  Time" },
    { value: "EST - 4", name: "Hawaii  Time" },
  ]);

  const renderImageUploader = () => {
    return (
      <Form.Group>
        <Form.Label>
          <h6>
            <Badge variant="dark">Upload Image</Badge>
          </h6>
        </Form.Label>
        <ImageUploader onImagesSelected={onImagesSelected} />
      </Form.Group>
    );
  };

  const onImagesSelected = (pictures) => {
    setSelectedImages(pictures);
  };

  const onEmailChangedHandler = (e) => {
    setEmail(e.target.value);
  };

  const onHeightChangedHandler = (e) => {
    setHeight(e.target.value);
  };

  const onWeightChangedHandler = (e) => {
    setWeight(e.target.value);
  };

  const onBMIChangedHandler = (e) => {
    setBMI(e.target.value);
  };

  const onTimeZoneChangedHandler = (e) => {
    setTimeZone(e.target.value);
  };

  const onUserNameChangedHandler = (e) => {
    setUserName(e.target.value);
  };

  const onPhoneChangedHandler = (e) => {
    setPhone(e.target.value);
  };

  const onDOBChangedHandler = (e) => {
    setBirthDate(e.target.value);
  };

  const columns = [
    {
      field: "deviceName",
      headerName: "Device Name",
      width: 200,
      type: "string",
    },
    {
      field: "deviceID",
      headerName: "Device ID",
      type: "number",
      width: 200,
      editable: false,
    },
  ];
  const renderDeviceData = () => {
    // if (coreContext.deviceData.length > 0) {
    //     return coreContext.deviceData.map((deviceData, index) => {
    //         return <tr>
    //             {/* <td> {++index}</td> */}
    //             <td>{deviceData.deviceName} </td>
    //             <td>{deviceData.deviceID} </td>
    //         </tr>
    //     });
    // }
    if (coreContext.deviceData.length > 0) {
      return (
        <div style={{ height: 680, width: "100%" }}>
          <DataGrid
            rows={coreContext.deviceData}
            columns={columns}
            pageSize={10}
          />
        </div>
      );
    }
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-title mx-auto">
              <h3>
                <Badge variant="success">My Profile</Badge>
              </h3>
            </div>
            <div className="card-body">
              <Form
                autoComplete="off"
                onSubmit={handleSubmit(updateUser)}
                noValidate>
                <Input
                  label="Name"
                  value={userName}
                  elementType="text"
                  minLength={5}
                  maxLength={55}
                  placeholder="Enter name"
                  onChange={onUserNameChangedHandler}
                  name="userName"
                  required={true}
                  register={register}
                  errors={errors}
                />

                <Input
                  label="Email"
                  elementType="email"
                  value={email}
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
                  label="Phone"
                  elementType="text"
                  value={phone}
                  placeholder="Enter phone"
                  onChange={onPhoneChangedHandler}
                  required={false}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="phone"
                />

                <Input
                  label="Date of Birth"
                  elementType="date"
                  value={birthDate}
                  placeholder="Enter DOB"
                  onChange={onDOBChangedHandler}
                  required={false}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="dob"
                />

                <Input
                  label="Height (Inch)"
                  value={height}
                  elementType="number"
                  placeholder="Enter height in Inch"
                  onChange={onHeightChangedHandler}
                  required={false}
                  minLength={1}
                  maxLength={5}
                  register={register}
                  errors={errors}
                  name="height"
                />

                <Input
                  label="Weight (Lob)"
                  value={weight}
                  elementType="number"
                  placeholder="Enter weight"
                  onChange={onWeightChangedHandler}
                  required={false}
                  minLength={1}
                  maxLength={5}
                  register={register}
                  errors={errors}
                  name="weight"
                />

                <Input
                  label="BMI"
                  value={bmi}
                  elementType="number"
                  placeholder="Enter BMI"
                  onChange={onBMIChangedHandler}
                  required={false}
                  minLength={1}
                  maxLength={5}
                  register={register}
                  errors={errors}
                  name="bmi"
                />

                <Input
                  label="Time Zone"
                  name="timeZone"
                  required={false}
                  register={register}
                  errors={errors}
                  elementType="select"
                  value={timeZone}
                  options={timeZones}
                  onChange={onTimeZoneChangedHandler}
                />

                {renderImageUploader()}

                <center> {coreContext.renderLoader()}</center>
                <center>
                  {" "}
                  <Input variant="danger" label={message} elementType="label" />
                </center>

                <Input
                  blockButton={true}
                  value="Save"
                  elementType="button"
                  variant="primary"
                />
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-title mx-auto">
              <h3>
                <Badge variant="success">Device</Badge>
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h6>
                    <span class="badge badge-primary">
                      Provider Registered Devices
                    </span>
                  </h6>
                  {renderDeviceData()}
                </div>

                <div className="col-md-12">
                  <form>
                    <h6>
                      <span class="badge badge-primary"> Add a Device</span>
                    </h6>
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="form-control mb-3 mr-sm-2">
                      <option value="">Select Device</option>
                      <option value="BP">Blood Pressure</option>
                      <option value="BG">Blood Glucose</option>
                      <option value="WS">Weight</option>
                    </select>
                    <input
                      type="text"
                      value={deviceId}
                      onChange={(e) => setDeviceId(e.target.value)}
                      class="form-control mb-2 mr-sm-2"
                      placeholder="Enter device ID "
                    />
                    <button
                      type="button"
                      onClick={() =>
                        coreContext.addDevice(deviceType, deviceId, patientid)
                      }
                      class="btn btn-primary mb-2">
                      Add Device
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MyProfile };
