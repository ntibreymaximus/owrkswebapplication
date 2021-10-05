import React, { useState } from "react";
import { Spinner,Col } from "react-bootstrap";
import { Container, Button } from "rsuite";
import "../css/users.css";
import ViewModal from "../modal/viewModal";
import AddUserForm from "./helpers/Forms/addUserForm";
import UserTable from "./helpers/Tables/UserTable";
import useFetchUsers from "./Hooks/useFetchUsers";
import SideNavigation from "./sidenavigation";
export default function Users() {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");
  const FetchUsers = async () => {
    const { users, loading, error } = await useFetchUsers();
    setLoading(loading);
    setUserData(users);
    setError(error);
  };
  FetchUsers();

  const results = (
    <>
      <UserTable users={userData} />
    </>
  );
  return (
    <Container className="container">
      <Col md={3}>
        <SideNavigation />
      </Col>
      <Col>
      <div className="navcontent">
        <div class="container-fluid searchoptions">
          <form class="d-flex">
            <input
              className="searchforminput"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button className="searchbutton">Search</Button>
            <Button className="addbutton" onClick={() => setShow(true)}>
              Add User
            </Button>
            <ViewModal
              show={show}
              title="Add User"
              handleClose={() => setShow(false)}
            >
              <AddUserForm closeModal={() => setShow(false)} />
            </ViewModal>
            <Button className="deletebutton">Delete User</Button>
          </form>
          <div className="results">
            {!myloading ? (
              results
            ) : (
              <Spinner animation="border" variant="white" />
            )}
          </div>
        </div>
      </div>
      </Col>
    </Container>
  );
}
