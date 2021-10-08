import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";
import { Modal, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import Input from "./common/Input";

import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@material-ui/data-grid";

import Link from "@material-ui/core/Link";

const Coach = (props) => {
  const coreContext = useContext(CoreContext);

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const fetchCoach = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchCoach();
  };

  useEffect(coreContext.checkLocalAuth, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [patientId, setPatientId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setVerificationCode("");
  };
  useEffect(resetForm, [coreContext.resetForm]);

  useEffect(fetchCoach, []);

  const columns = [
    {
      field: "name",
      headerName: "Coach Name",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      editable: false,
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
      editable: false,
    },
    {
      field: "",
      headerName: "Action",
      width: 300,

      renderCell: (params) => (
        <div>
          {" "}
          <a href="#" onClick={() => showEditForm(params.row)}>
            {" "}
            <PencilSquare />
          </a>
          <a href="#" onClick={() => deletePatient(params.row)}>
            {" "}
            <Trash />
          </a>
        </div>
      ),
    },
  ];

  const showEditForm = (patient) => {
    setName(patient.name);
    setPhone(patient.phone);
    setEmail(patient.email);
    //setPatientId(patient.id);
    setPatientId(patient.doctor_id);
    handleModalShow();
  };

  const deletePatient = (patient) => {
    coreContext.DeleteCareTeam(patient.doctor_id, "coach", "Coach");
  };

  const renderCoach = () => {
    if (coreContext.coachData.length > 0) {
      return (
        <div style={{ height: 680, width: "100%" }}>
          <DataGrid
            rows={coreContext.coachData}
            columns={columns}
            pageSize={10}
            sortModel={[{ field: "name", sort: "asc" }]}
          />
        </div>
      );
    }
  };

  return (
    <div className="card">
      <h4 className="card-header">COACH INFORMATION</h4>
      <div className="card-body">
        <form class="form-inline">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Coach Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Enter email"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Enter phone"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Enter password"
          />
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Confirm Enter password"
          />

          <button
            type="button"
            class="btn btn-primary mb-2"
            onClick={() => coreContext.addCoach(name, email, phone, password)}>
            Add Coach
          </button>
        </form>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-hover table-sm">
          {renderCoach()}
        </table>
      </div>
      <Modal
        show={coreContext.showProviderModal}
        onHide={coreContext.handleProviderModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the verification code sent on your Email ID</p>
          <input
            type="text"
            class="form-control"
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
                "Coach"
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

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Coach </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Input
                label="Name"
                elementType="text"
                minLength={5}
                maxLength={55}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
                required={true}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Input
                label="Phone"
                elementType="text"
                placeholder="Enter phone"
                onChange={(e) => setPhone(e.target.value)}
                required={true}
                minLength={5}
                maxLength={55}
                register={register}
                errors={errors}
                name="phone"
                value={phone}
              />
            </div>
          </div>

          <Input
            blockButton={true}
            value="Submit"
            onClick={() =>
              coreContext.UpdateCoach(name, phone, email, patientId)
            }
            elementType="button"
            variant="primary"
          />
          <br />
          <center> {coreContext.renderLoader()}</center>
          <center>
            {" "}
            <Input variant="danger" label={message} elementType="label" />
          </center>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export { Coach };
