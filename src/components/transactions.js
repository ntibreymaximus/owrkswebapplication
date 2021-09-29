import React, { Component, useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import AddModal from "../modal/addModal";
import Dashboard from "./dashboard";
import SideNavigation from "./sidenavigation";


export default function Transactions() {
  const [show, setShow] = useState(false);
  return (
    <Container className="container">
      <Col md={3} ><SideNavigation/></Col>
      <Col className="mt-4">
        <div className="navcontent">
            <div class="container-fluid searchoptions">
              <form class="d-flex">
                <input
                  className="form-control searchforminput"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Button className="searchbutton">Search</Button>
                <Button className="addbutton" onClick={() => setShow(true)}>
                  Add Transaction
                </Button>
                <AddModal
                  title="Add Transaction"
                  onClose={() => setShow(false)}
                  show={show}
                  onSubmit={<Dashboard />}
                  button="Add Transaction"
                ></AddModal>
                <Button className="deletebutton">Delete Transaction</Button>
              </form>
            </div>
            <div>
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </Col>
    </Container>
  );
}
