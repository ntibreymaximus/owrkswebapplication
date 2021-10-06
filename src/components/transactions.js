import React, { useRef, useState } from "react";
import { Col, Spinner,Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import { firestore } from "../firebase";
import AddModal from "../modal/addModal";
import ViewModal from "../modal/viewModal";
import Dashboard from "./dashboard";
import TransactionTable from "./helpers/Tables/TransactionTable";
import useFetchTransaction from "./Hooks/useFetchTransaction";
import SideNavigation from "./sidenavigation";


export default function Transactions() {
  const [show, setShow] = useState(false);
  const [data, setSearchData] = useState();
  const [transactionData, setTransactionData] = useState([]);
  const [myloading, setLoading] = useState(false);
  const [myferror, setError] = useState("");
  const [loading, setiLoading] = useState(true);
  const [myerror, setMError] = useState("");
  const searchRef = useRef();

  const closeModal =()=>{
    setShow(false)
  }
  
  const FetchTransaction = async () => {
    const { users, loading, error } = await useFetchTransaction();
    setiLoading(loading);
    setTransactionData(users);
    setError(error);
  };

  const Search = async () => {
 
    let data = [];
    let allusers = [];
    let error = '';

    if(searchRef.current.value.toString() === ''){
      // setSearchData()
      console.log("do nothing here")
      return;
    }else{
    setLoading(true);


    
      
      const users = firestore.collection("transactions").where('id','==',searchRef.current.value.toString());

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
  async function  DoSearch (){
    setMError("")
    await Search()
  }
  FetchTransaction();
  const results = (
    <>
      <TransactionTable transactions={data ? data : transactionData} />
    </>
  );

  return (
    <Container className="container">
      <Col md={3} ><SideNavigation/></Col>
      <Col >
        <div className="navcontent">
            <div class="container-fluid searchoptions">
              <form class="d-flex">
                <input
                  className="form-control searchforminput"
                  type="search"
                  placeholder="Search by Transaction ID"
                  aria-label="Search"
                  ref={searchRef}

                />
                <Button className="searchbutton" onClick={()=>DoSearch()}>Search</Button>
                <Button className="addbutton" onClick={() => setShow(true)}>
                  Add Transaction
                </Button>
                <ViewModal
                  title="Add Transaction"
                  handleClose={() => setShow(false)}
                  show={show}
                  // onSubmit={<Dashboard />}
                  button="Add Transaction"
                ></ViewModal>
                <Button className="deletebutton">Delete Transaction</Button>
              </form>
            </div>
            <div>
          
          </div>
          <div>
          {myerror ? <Alert variant="danger">{myerror}</Alert>:
                      <div>{(!myloading && !loading ) ? results : <Spinner animation="border" variant="white"/>}</div>
                      }
          </div>
        </div>
      </Col>
    </Container>
  );
}
