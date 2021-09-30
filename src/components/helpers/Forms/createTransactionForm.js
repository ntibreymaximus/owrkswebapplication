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
import AddTransaction from "../../Hooks/useAddTransaction";

//visible header that contains LOGO and Navigation Icon
var d = new Date();
var n = d.getTime();

const AddTransactionForm = ({ closeModal, product }) => {
  // files to upload
  const [data, setData] = useState({
    productId: product.id,
    supplierId: product.supplierId,
    quantity: 0,
  });
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
    if (!data.quantity || data.quantity === "" || data.quantity === 0)
      newErrors.name = "Cannot be blank or Zero!";
    else if (data.quantity > product.inStock)
      newErrors.quantity = "Product Quantity not enough";
    // food errors
    // if ( !data.email || data.email === '' ) newErrors.startDate = 'Add a valid email!'

    return newErrors;
  };

  const Submit = async () => {
    // Add Product
    const { error, code } = await AddTransaction(data, userID);

    setMainError(error);
    setSuccess(code);
    setData({
      productId: product.id,
      supplierId: product.supplierId,
      userId: "",
      quantity: "",
      leaseState: "",
    });
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
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Product ID
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="productId"
              required={true}
              value={data.productId}
              // onChange={eventHandler}
              disabled
              isInvalid={!!formError.productId}
            />
            <Form.Control.Feedback type="invalid">
              {formError.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Supplier ID
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="supplierId"
              required={true}
              value={data.supplierId}
              // onChange={eventHandler}
              disabled
              isInvalid={!!formError.productId}
            />
            <Form.Control.Feedback type="invalid">
              {formError.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* election TITLE */}
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            User ID
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="userId"
              required={true}
              value={data.userId}
              onChange={eventHandler}
              isInvalid={!!formError.buyerId}
            />
            <Form.Control.Feedback type="invalid">
              {formError.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="row" controlId="validationCustom04">
          <Form.Label className="col-3 align-bottom my-auto text-end">
            Release Type
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              as="select"
              className=" col"
              name="leaseState"
              value={data.leaseState}
              onChange={eventHandler}
              isInvalid={!!formError.leaseState}
            >
              <option value="">Select Type</option>
              <option value={true}>Lease </option>
              <option value={false}>Paid </option>
            </Form.Control>
          </InputGroup>
        </Form.Group>

        {/* election TITLE */}
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Quantity
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="number"
              name="quantity"
              required={true}
              value={data.quantity}
              onChange={eventHandler}
              isInvalid={!!formError.quantity}
            />
            <Form.Control.Feedback type="invalid">
              {formError.quantity}
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
          <h4 className="mx-auto">{"Transaction added Succesfuly"}</h4>
        </Alert>
      )}
      {success && (
        <Alert variant="success">
          <h4 className="mx-auto">Transaction ID : {success}</h4>
        </Alert>
      )}
      {!error && !success && output}
    </>
  );
};

export default AddTransactionForm;
