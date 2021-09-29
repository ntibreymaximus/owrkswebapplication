import React, { useEffect, useState } from 'react';

import { Row,Nav,NavDropdown,Navbar ,Spinner, Col, Container, Button, Card , Table,Alert,Form,InputGroup,ProgressBar,Divider} from 'react-bootstrap';

import { useAuth } from '../../Context/AuthContext';
// material ui imports
// import { DropzoneArea } from "material-ui-dropzone";
import { firestore, storageRef } from '../../../firebase';

import AddProduct from '../../Hooks/useAddProducts';
// import 'bootstrap/dist/css/bootstrap.min.css';

//visible header that contains LOGO and Navigation Icon
var d = new Date();
var n = d.getTime();

const AddProductForm =({closeModal})=>{
     // files to upload
  const [data, setData] = useState([]);
  const [mainError, setMainError] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(''); // sets Error from operations
  const [formError, setFormError] = useState([]); // check error from forms
  const [success,setSuccess]=useState(false)
  const { userID } = useAuth()


  const UpdateData =(item,value)=>{
    setData(data => ({...data, [item]:value}))
    setFormError(formError => ({...formError, [item]:''}))
  }
  

    const eventHandler = (event) => {
        let val = event.target.value;
        let nam = event.target.name;
        UpdateData(nam,val)
    };


    const findFormErrors = () => {
        const newErrors = {}
        // name errors
        if ( !data.name || data.name === '' ) newErrors.name = 'Cannot be blank!'
        else if ( data.name.length > 100 ) newErrors.name = 'Name is too long!'
        // food errors
        // if ( !data.email || data.email === '' ) newErrors.startDate = 'Add a valid email!'
    
        

        return newErrors;
    }

    
    const Submit = async ()=>{ 
        // Add Product
        const {error,success} = await AddProduct(data,userID);
        
        setMainError(error);
        setSuccess(success);
        setData('');
        closeModal()

   }

     
    
    const Proceed = async () => {
        // event.preventDefault();
    
        const newErrors = findFormErrors()
            // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setFormError(newErrors)
            } else {
            // No errors! Put any logic here for the form submission!
            setLoading(true)
                // uploadImage();
                Submit();
                // continue with other rendering
            }
        
    };

    const output = <>
           <Form noValidate validated={validated} onSubmit={Proceed} inline>

                {/* election TITLE */}
                <Form.Group className="row" controlId="validationCustom01">
                    <Form.Label className="col-3 align-bottom text-end mx-auto">
                    Product Name
                    </Form.Label>
                    <InputGroup className="form-input col">

                    <Form.Control
                    className=""
                    type="text"
                    name="name"
                    required ={true}
                    value={data.name}
                    onChange={eventHandler}
                    isInvalid={ !!formError.name }
                    />
                    <Form.Control.Feedback type="invalid">
                {formError.name}
                </Form.Control.Feedback>
                </InputGroup>
                </Form.Group> 

                {/* election TITLE */}
                <Form.Group className="row" controlId="validationCustom01">
                    <Form.Label className="col-3 align-bottom text-end mx-auto">
                    quantity
                    </Form.Label>
                    <InputGroup className="form-input col">

                    <Form.Control
                    className=""
                    type="number"
                    name="quantity"
                    required ={true}
                    value={data.quantity}
                    onChange={eventHandler}
                    isInvalid={ !!formError.quantity }
                    />
                    <Form.Control.Feedback type="invalid">
                {formError.quantity}
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
                    required ={true}
                    value={data.supplierId}
                    onChange={eventHandler}
                    isInvalid={ !!formError.supplierId }
                    />
                    <Form.Control.Feedback type="invalid">
                {formError.supplierId}
                </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>
                <Form.Group className="row" controlId="validationCustom04">
                    <Form.Label className="col-3 align-bottom my-auto text-end">
                    Lease Type 
                    </Form.Label>
                    <InputGroup className="form-input col" >
                    
                    <Form.Control
                    as="select"
                    className=" col"
                    name="leaseState"
                    value={data.leaseState}
                    onChange={eventHandler}
                    isInvalid={ !!formError.leaseState }
                    
                    >
                    <option value=''>Select Type</option>
                    <option value={true}>Lease </option>
                    <option  value={false}>Paid </option>
                    </Form.Control>
                    </InputGroup>
                </Form.Group>


                <Col className="text-center">
                    <Button
                    onClick={()=>Proceed()}
                    className=" btn-success text-center"
                    >
                    Proceed {(loading && !error)   &&  <Spinner animation="border" variant="white"/> }
                    </Button>

                </Col>
                </Form>

    </>

    return(
        <>
        {(error ) && <Alert variant="danger"><h3 className="text-muted mx-auto">{error}</h3></Alert>}
            
            {success && <Alert variant="success"><h3 className="mx-auto">{"Product added Succesfuly"}</h3></Alert> }
            {(!error && !success)   &&  output }

            
        </>
     
    );
}

export default AddProductForm;