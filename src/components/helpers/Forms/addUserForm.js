import React, { useEffect, useState } from 'react';

import { Row,Nav,NavDropdown,Navbar ,Spinner, Col, Container, Button, Card , Table,Alert,Form,InputGroup,ProgressBar,Divider} from 'react-bootstrap';

import { useAuth } from '../../Context/AuthContext';
// material ui imports
// import { DropzoneArea } from "material-ui-dropzone";
import { firestore, storageRef } from '../../../firebase';

// import AddProduct from '../../Hooks/useAddProducts';
import AddUser from '../../Hooks/useAddUser';
 import style from 'bootstrap/dist/css/bootstrap.min.css';

//visible header that contains LOGO and Navigation Icon
var d = new Date();
var n = d.getTime();

const AddUserForm =({closeModal})=>{
     // files to upload
  const [data, setData] = useState([]);
  const [mainError, setMainError] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(''); // sets Error from operations
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
    if (!data.firstname || data.firstname === "") newErrors.firstname = "Cannot be blank!";
    else if (data.firstname.length > 100) newErrors.firstname = "Name is too long!";
    // food errors
    if ( !data.email || data.email === '' ) newErrors.startDate = 'Add a valid email!';

    return newErrors;
  };

  const Submit = async () => {
    // Add Product
    const { error, success } = await AddUser(data, userID);

    setMainError(error);
    setSuccess(success);
    setData({ name: "", email: "" });
    setLoading(false);
    // closeModal()
  };

  const Proceed = async () => {
    // event.preventDefault();
    setLoading(true);

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setFormError(newErrors);
      setLoading(false);

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
        {/*user details */}
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            First Name
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="firstname"
              required={true}
              value={data.firstname}
              onChange={eventHandler}
              isInvalid={!!formError.firstname}
            />
            <Form.Control.Feedback type="invalid">
              {formError.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Last Name
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="lastname"
              required={true}
              value={data.lastname}
              onChange={eventHandler}
              isInvalid={!!formError.lastname}
            />
            <Form.Control.Feedback type="invalid">
              {formError.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Costumer Email
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

        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Company or Venture Name
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="company"
              required={true}
              value={data.company}
              onChange={eventHandler}
              isInvalid={!!formError.company}
            />
            <Form.Control.Feedback type="invalid">
              {formError.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group  className="row">
          <Form.Label  className="col-3 align-bottom text-end mx-auto">
            ID Type
          </Form.Label>
          <InputGroup className="form-input col">

              <Form.Check
                inline
                type="radio"
                label="Voters ID"
                value="Voters ID"
                onChange={eventHandler}
                name="Idtype"
              />
              <Form.Check
                inline
                type="radio"
                label="National ID"
                value="National ID"
                name="Idtype"
                onChange={eventHandler}

            
              />
              <Form.Check
                inline
                type="radio"
                label="Drivers License"
                value="Drivers License"
                name="Idtype"
                onChange={eventHandler}

              />
            </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
           ID Number
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="idnumber"
              required={true}
              value={data.idnumber}
              onChange={eventHandler}
              isInvalid={!!formError.idnumber}
            />
            <Form.Control.Feedback type="invalid">
              {formError.idnumber}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Bussiness Registration ID
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="bussinessID"
              required={true}
              value={data.bussinessId}
              onChange={eventHandler}
              isInvalid={!!formError.bussinessId}
            />
            <Form.Control.Feedback type="invalid">
              {formError.bussinessId}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Shop Address
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="address"
              required={true}
              value={data.address}
              onChange={eventHandler}
              isInvalid={!!formError.address}
            />
            <Form.Control.Feedback type="invalid">
              {formError.address}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <hr/>
        <h3>Guarantor's Info</h3>
        <hr/>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            First Name
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="gfirstname"
              required={true}
              value={data.gfirstname}
              onChange={eventHandler}
              isInvalid={!!formError.gfirstname}
            />
            <Form.Control.Feedback type="invalid">
              {formError.gfirstname}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Last Name
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="glastname"
              required={true}
              value={data.glastname}
              onChange={eventHandler}
              isInvalid={!!formError.glastname}
            />
            <Form.Control.Feedback type="invalid">
              {formError.glastname}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Email
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="email"
              name="gemail"
              required={true}
              value={data.gemail}
              onChange={eventHandler}
              isInvalid={!!formError.gemail}
            />
            <Form.Control.Feedback type="invalid">
              {formError.gemail}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group  className="row">
          <Form.Label  className="col-3 align-bottom text-end mx-auto">
            ID Type
          </Form.Label>
          <InputGroup className="form-input col">

              <Form.Check
                inline
                type="radio"
                label="Voters ID"
                value="Voters ID"
                onChange={eventHandler}
                name="gIdtype"
              />
              <Form.Check
                inline
                type="radio"
                label="National ID"
                value="National ID"
                name="gIdtype"
                onChange={eventHandler}

            
              />
              <Form.Check
                inline
                type="radio"
                label="Drivers License"
                value="Drivers License"
                name="gIdtype"
                onChange={eventHandler}

              />
            </InputGroup>
        </Form.Group>
       
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            ID Number
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="gId"
              required={true}
              value={data.gId}
              onChange={eventHandler}
              isInvalid={!!formError.gId}
            />
            <Form.Control.Feedback type="invalid">
              {formError.gId}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="row" controlId="validationCustom01">
          <Form.Label className="col-3 align-bottom text-end mx-auto">
            Residential Address
          </Form.Label>
          <InputGroup className="form-input col">
            <Form.Control
              className=""
              type="text"
              name="gaddress"
              required={true}
              value={data.gaddress}
              onChange={eventHandler}
              isInvalid={!!formError.gaddress}
            />
            <Form.Control.Feedback type="invalid">
              {formError.gaddress}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>


       
        
        <Col className="text-center">
          <Button
            onClick={() => Proceed()}
            className=" btn-success text-center my-1"
          >
            Proceed{" "}
            {loading && !error && (
              <Spinner animation="border" variant="white" />
            )}
          </Button>
        </Col>
      </Form>
    </div>
    )

    return(
        <>
        {(error ) && <Alert variant="danger"><h3 className="text-muted mx-auto">{error}</h3></Alert>}
            
            {success && <Alert variant="success"><h3 className="mx-auto">{"Costumer added Succesfuly"}</h3></Alert> }
            {success && <Alert variant="success"><h3 className="mx-auto">New Costumer ID : {success}</h3></Alert>}
            {(!error && !success)   &&  output }

            
        </>
     
    );
}

export default AddUserForm;