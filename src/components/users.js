import React, { useRef, useState } from "react";
import { Spinner, Col, Alert } from "react-bootstrap";
import { Container, Button } from "rsuite";
import "../css/users.css";
import { firestore } from "../firebase";
import ViewModal from "../modal/viewModal";
import AddUserForm from "./helpers/Forms/addUserForm";
import UserTable from "./helpers/Tables/UserTable";
import useFetchUsers from "./Hooks/useFetchUsers";
import SideNavigation from "./sidenavigation";

export default function Users() {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [data, setSearchData] = useState();
  const [myloading, setLoading] = useState(false);
  const [myferror, setError] = useState("");
  const [loading, setiLoading] = useState(true);
  const [myerror, setMError] = useState("");
  const searchRef = useRef();

  const closeModal =async()=>{
    setShow(false)
    await DoSearch()

  }

  const FetchUsers = async () => {
    const { users, loading, error } = await useFetchUsers();
    setiLoading(loading);
    setUserData(users);
    setError(error);
  };

  const Search = async () => {
    let data = [];
    let allusers = [];
    let error = "";

    if (searchRef.current.value.toString() === "") {
      // setSearchData()
      console.log("do nothing here");
      return;
    } else {
      setLoading(true);

      const users = firestore
        .collection("users")
        .where("id", "==", searchRef.current.value.toString());

      const snapshot = await users.get();
      if (snapshot.empty) {
        setMError("Customer Not Found")
        setSearchData()
        console.log("Customer Not Found")
        setLoading(false);

        return;
      }

      snapshot.forEach((doc) => {
        allusers.push(doc.data());
        setSearchData(allusers);
        setMError("");
        setLoading(false);
        return;
      });
    }
  }
  async function  DoSearch (e){
    if(e){
    e.preventDefault()
    }
    setMError("")
    await Search()
  }

  FetchUsers();

  const results = (
    <>
      <UserTable users={data ? data : userData} />
    </>
  );
  return (
    <Container className="container">
   
     <Col md={3}><SideNavigation/></Col>
     <Col>
       <div className="navcontent">
        <div class="container-fluid searchoptions">
          <form class="d-flex" onSubmit={(e)=>DoSearch(e)}>
            <input
              className="form-control searchforminput"
              type="search"
              placeholder="Search by Costumer ID"
              aria-label="Search"
              ref={searchRef}

            />
            <Button className="searchbutton" onClick={(e)=>DoSearch(e)}>Search</Button>
            <Button className="addbutton" onClick={() => setShow(true)}>
              Add Costumer
            </Button>
            <ViewModal
              show={show}
              title="Add Costumer"
              handleClose={() => closeModal()}
            >
              <AddUserForm closeModal={() => closeModal()} />
            </ViewModal>
            {/* <Button className="deletebutton">Delete Costumer</Button> */}
          </form>
          <div className="results">
          {myerror ? <Alert variant="danger">{myerror}</Alert>:
                      <div>{(!myloading && !loading ) ? results : <Spinner animation="border" variant="white"/>}</div>
                      }
          </div>
          </div>
        </div>
        </Col>
    </Container>
  );
}
