import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import "../css/users.css";
import ViewModal from "../modal/viewModal";
import AddUserForm from "./helpers/Forms/addUserForm";
import UserTable from "./helpers/Tables/UserTable";
import useFetchUsers from "./Hooks/useFetchUsers";
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
      <div className="navbar">
        <Sidebar className="sidenavigation">
          <Sidenav>
            <Sidenav.Header className="sidebarheader">
              <h3 className="sidebarheaderh3">Welcome to</h3>
              <h1 className="sidebarheaderh1">OWRKS</h1>
            </Sidenav.Header>
            <Sidenav.Body className="sidenavigationbody">
              <Nav>
                <Link to="/dashboard" className="navlink">
                  <Nav.Item className="navitem">Dashboard</Nav.Item>
                </Link>
                <Link to="/users" className="navlink">
                  <Nav.Item className="navitem navitemactive">Users</Nav.Item>
                </Link>
                <Link to="/products" className="navlink">
                  <Nav.Item className="navitem">Products</Nav.Item>
                </Link>
                <Link to="/suppliers" className="navlink">
                  <Nav.Item className="navitem">Suppliers</Nav.Item>
                </Link>
                <Link to="/transactions" className="navlink">
                  <Nav.Item className="navitem">Transactions</Nav.Item>
                </Link>
                <Link to="/">
                  <Button className="logoutbutton">Logout</Button>
                </Link>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
      </div>
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
          <div>
            {!myloading ? (
              results
            ) : (
              <Spinner animation="border" variant="white" />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
