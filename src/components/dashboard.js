import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import "../css/dashboard.css";
import "../css/sidenavigation.css";
export default class Dashboard extends Component {
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
                    <Nav.Item className="navitem navitemactive">
                      Dashboard
                    </Nav.Item>
                  </Link>
                  <Link to="/users" className="navlink">
                    <Nav.Item className="navitem">Users</Nav.Item>
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
        <div className="navcontent"></div>
      </Container>
    );
  }
}
