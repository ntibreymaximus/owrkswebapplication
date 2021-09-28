import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import AddModal from "../modal/addModal";
import Dashboard from "./dashboard";
import ProductTable from "./helpers/Tables/ProductTable";
import useFetchProducts from "./Hooks/useFetchProducts";

export default function Transactions() {
  const [show, setShow] = useState(false);

  const [productData, setProductData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");
  const FetchProduct = async () => {
    const { products, loading, error } = await useFetchProducts();
    setLoading(loading);
    setProductData(products);
    setError(error);
  };
  FetchProduct();

  const results = (
    <div>
      <ProductTable products={productData} />
    </div>
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
                  <Nav.Item className="navitem">Users</Nav.Item>
                </Link>
                <Link to="/products" className="navlink">
                  <Nav.Item className="navitem navitemactive">
                    Products
                  </Nav.Item>
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
              className="form-control searchforminput"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button className="searchbutton">Search</Button>
            <Button className="addbutton" onClick={() => setShow(true)}>
              Add Product
            </Button>
            <AddModal
              title="Add Product"
              onClose={() => setShow(false)}
              show={show}
              onSubmit={<Dashboard />}
              button="Add Product"
            ></AddModal>
            <Button className="deletebutton">Delete Product</Button>
          </form>
        </div>
        <div>{!myloading ? results : "Loading ..."}</div>
      </div>
    </Container>
  );
}
