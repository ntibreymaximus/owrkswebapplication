import React, { useEffect, useState } from "react";

import {
  Row,
  Nav,
  NavDropdown,
  Navbar,
  Spinner,
  Col,
  Container,
  Button,
  Card,
  Table,
  Alert,
  Form,
  InputGroup,
  ProgressBar,
  Divider,
} from "react-bootstrap";

import { useAuth } from "../../Context/AuthContext";
// material ui imports
// import { DropzoneArea } from "material-ui-dropzone";
import { firestore, storageRef } from "../../../firebase";

// import AddProduct from '../../Hooks/useAddProducts';
import AddSupplier from "../../Hooks/useAddSupplier";
import style from "bootstrap/dist/css/bootstrap.min.css";

//visible header that contains LOGO and Navigation Icon
var d = new Date();
var n = d.getTime();

const AddSupplierForm = ({ closeModal }) => {
  // files to upload
  const [data, setData] = useState([]);
  const [mainError, setMainError] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(""); // sets Error from operations
  const [formError, setFormError] = useState([]); // check error from forms
  const [success, setSuccess] = useState(false);
  const { userID } = useAuth();

  const UpdateData = (item, value) => {
    setData((data) => ({ ...data, [item]: value }));
    setFormError((formError) => ({ ...formError, [item]: "" }));
  };

  const eventHandler = (event) => {
    let val = event.target.value;
    let nam = event.target.name;
    UpdateData(nam, val);
  };

  const findFormErrors = () => {
    const newErrors = {};
    // name errors
    if (!data.name || data.name === "") newErrors.name = "Cannot be blank!";
    else if (data.name.length > 100) newErrors.name = "Name is too long!";
    // food errors
    // if ( !data.email || data.email === '' ) newErrors.startDate = 'Add a valid email!'

    return newErrors;
  };

  const Submit = async () => {
    // Add Product
    const { error, code } = await AddSupplier(data, userID);

    setMainError(error);
    setSuccess(code);
    setData({ name: "", email: "" });
    setLoading(false);
    // closeModal()
  };

  const Proceed = async () => {
    // event.preventDefault();

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setFormError(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      setLoading(true);
      // uploadImage();
      Submit();
      // continue with other rendering
    }
  };

  const output = (
    <div className={style}>
      <Form noValidate validated={validated} onSubmit={Proceed} inline>
        {/* election TITLE */}
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Company Name
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="name"
              required={true}
              value={data.name}
              onChange={eventHandler}
              isInvalid={!!formError.name}
            />
            <Form.Control.Feedback type="invalid">
              {formError.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* election TITLE */}
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Supplier Email
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="email"
              name="email"
              required={true}
              value={data.email}
              onChange={eventHandler}
              isInvalid={!!formError.email}
            />
            <Form.Control.Feedback type="invalid">
              {formError.email}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Col className="text-center">
          <Button
            onClick={() => Proceed()}
            className=" btn-success text-center"
          >
            Proceed{" "}
            {loading && !error && (
              <Spinner animation="border" variant="white" />
            )}
          </Button>
        </Col>
      </Form>
    </div>
  );

  return (
    <>
      {error && (
        <Alert variant="danger">
          <h3 className="text-muted mx-auto">{error}</h3>
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          <h3 className="mx-auto">{"Supplier added Succesfuly"}</h3>
        </Alert>
      )}
      {success && (
        <Alert variant="success">
          <h3 className="mx-auto">New ID : {success}</h3>
        </Alert>
      )}
      {!error && !success && output}
    </>
  );
};

export default AddSupplierForm;
