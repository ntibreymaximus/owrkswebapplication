import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import ProductTable from "./helpers/Tables/ProductTable";
import useFetchProducts from "./Hooks/useFetchProducts";

const Products =()=> {
  
  const [productData,setProductData] = useState([])
  const [myloading,setLoading] = useState(true)
  const [myerror,setError] = useState('')

  // useEffect(()=>{
    const FetchProduct = async()=>{
          // console.log(userID);
      const {products, loading ,error} = await useFetchProducts();
      setLoading(loading);
      setProductData(products);
      setError(error);

    }
  FetchProduct();

  // },[])
 

  const results = <div>
    <ProductTable
    products ={productData}
    />
</div>;

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
          <div className="container-fluid searchoptions">
            <form className="d-flex">
              <input
                className="form-control searchforminput"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button className="searchbutton">Search</Button>
              <Button className="addbutton">Add Product</Button>
              <Button className="deletebutton">Delete Product</Button>
            </form>
          </div>
          {!myloading ? results : "Loading ..."}
        </div>
      </Container>
    );
  
}
export default Products ;