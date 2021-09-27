import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
export default class Suppliers extends Component {
  render() {
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
                    <Nav.Item className="navitem ">Dashboard</Nav.Item>
                  </Link>
                  <Link to="/users" className="navlink">
                    <Nav.Item className="navitem">Users</Nav.Item>
                  </Link>
                  <Link to="/products" className="navlink">
                    <Nav.Item className="navitem">Products</Nav.Item>
                  </Link>
                  <Link to="/suppliers" className="navlink">
                    <Nav.Item className="navitem navitemactive">
                      Suppliers
                    </Nav.Item>
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
                className="form-control forminput"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button className="searchbutton">Search</Button>
              <Button className="addbutton">Add Supplier</Button>
              <Button className="deletebutton">Delete Supplier</Button>
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
      </Container>
    );
  }
}
