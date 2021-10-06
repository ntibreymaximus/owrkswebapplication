import React,{useState,useRef, useEffect} from 'react';
import { Alert, Col, Spinner} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import { firestore } from '../firebase';
import AddModal from "../modal/addModal";
import ViewModal from '../modal/viewModal';
import Dashboard from "./dashboard";
import AddSupplierForm from './helpers/Forms/addSupplierForm';
import SupplierTable from "./helpers/Tables/SupplierTable";
import useFetchSupplier from "./Hooks/useFetchSupplier";
import FetchSupplierById from './Hooks/useFetchSupplierById';
import SideNavigation from "./sidenavigation";

export default function Suppliers() {
  const [show, setShow] = useState(false);
  const [supplierData, setSuppplierData] = useState([]);
  const [data, setSearchData] = useState();
  const [myloading, setLoading] = useState(false);
  const [loading, setiLoading] = useState(true);
  const [myferror, setError] = useState("");
  const [myerror, setMError] = useState("");
  const searchRef = useRef();

  const closeModal =()=>{
    setShow(false)
  }
  
  const FetchSupplier = async () => {
    const { suppliers, loading, error } = await useFetchSupplier();
    setiLoading(loading);
    setSuppplierData(suppliers);
    setError(error);
  };

  

  const SearchSupplier = async () => {
 
    let data = [];
    let allusers = [];
    let error = '';

    if(searchRef.current.value.toString() === ''){
      // setSearchData()
      console.log("do nothing here")
      return;
    }else{
    setLoading(true);


    
      
      const users = firestore.collection("suppliers").where('id','==',searchRef.current.value.toString());

      const snapshot = await users.get();
      if (snapshot.empty) {
        setMError("Supplier Not Found")
        setSearchData()
        console.log("Supplier Not Found")
        setLoading(false);

        return
      }

      snapshot.forEach((doc) => {
        allusers.push(doc.data());
        setSearchData(allusers)
        setMError("")
        setLoading(false);
        return


      });
    }
  }
      
  
  const FecthData = async()=>{
    // if(typeof searchRef){
    // }else{
      // SearchSupplier()
      FetchSupplier();

    // }
  }
  FecthData();

  // useEffect(
    // setSuppplierData(data);
    // FecthData()

  // ,[])

 async function  DoSearchSupplier (){
    setMError("")
    await SearchSupplier()
  }
  const results = (
    <>
      <SupplierTable supplier={data ? data : supplierData} />
    </>
  );
  return (
    <Container className="container" >
      <Col sm={3}><SideNavigation/></Col>
      <Col>
        <div className="navcontent">
          <div class="container-fluid searchoptions">
            <form class="d-flex">
              <input
                className="form-control searchforminput"
                type="search"
                placeholder="Search by ID"
                aria-label="Search"
              ref={searchRef}

              />
              <Button className="searchbutton" onClick={()=>DoSearchSupplier()}>Search</Button>
              <Button className="addbutton" onClick={() => setShow(true)}>
                Add Supplier
              </Button>
              <ViewModal
                title="Add Supplier"
                handleClose={() => setShow(false)}
                show={show}
                // onSubmit={<Dashboard />}
                // button="Add Supplier"
              >
                <AddSupplierForm closeModal={closeModal}  />
              </ViewModal>
              <Button className="deletebutton">Delete Supplier</Button>
            </form>
          </div>
          
            {myerror ? <Alert variant="danger">{myerror}</Alert>:
                      <div>{(!myloading && !loading ) ? results : <Spinner animation="border" variant="white"/>}</div>
                      }
          
        </div>
      </Col>
    </Container>
  );
}
