import React from "react";
import { NavLink } from "react-router-dom";
import "../css/sidenavigation.css";
import { Nav, Sidebar, Sidenav, Button } from "rsuite";

export default function SideNavigation() {
  return (
    <Sidebar className="sidenavigation">
      <Sidenav>
        <Sidenav.Header className="sidebarheader">
          <h3 className="sidebarheaderh3">WELCOME TO</h3>
          <h1 className="sidebarheaderh1">OWRKS</h1>
        </Sidenav.Header>
        <Sidenav.Body className="sidenavigationbody">
          <Nav>
            <NavLink
              to="/dashboard"
              activeClassName="navitemactive"
              className="navlink"
            >
              <Nav.Item className="navitem ">Dashboard</Nav.Item>
            </NavLink>
            <NavLink
              to="/customers"
              activeClassName="navitemactive"
              className="navlink"
            >
              <Nav.Item className="navitem">Customers</Nav.Item>
            </NavLink>
            <NavLink
              to="/products"
              activeClassName="navitemactive"
              className="navlink"
            >
              <Nav.Item className="navitem">Products</Nav.Item>
            </NavLink>
            <NavLink
              to="/suppliers"
              activeClassName="navitemactive"
              className="navlink"
            >
              <Nav.Item className="navitem">Suppliers</Nav.Item>
            </NavLink>
            <NavLink
              to="/transactions"
              activeClassName="navitemactive"
              className="navlink"
            >
              <Nav.Item className="navitem">Transactions</Nav.Item>
            </NavLink>
            {/* <NavLink
              to="/admin"
              activeClassName="navitemactive"
              className="navlink"
            >
              <Nav.Item className="navitem">Admin</Nav.Item>
            </NavLink> */}
            <NavLink to="/" activeClassName="navitemactive">
              <Button className="logoutbutton">Logout</Button>
            </NavLink>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
}
