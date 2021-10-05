import React, { Component, useState } from "react";
import { Spinner,Col } from "react-bootstrap";
import { Container, Button } from "rsuite";
import AddModal from "../modal/addModal";
import AddProductForm from "./helpers/Forms/addProductForm";
import ProductTable from "./helpers/Tables/ProductTable";
import useFetchProducts from "./Hooks/useFetchProducts";
import SideNavigation from "./sidenavigation";
import "../css/users.css";
import ViewModal from "../modal/viewModal";

export default function Transactions() {
  const [show, setShow] = useState(false);

  const [productData, setProductData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");

  const closeModal = () => {
    setShow(false);
  };
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
              Add Product
            </Button>
            <ViewModal
              title="Add Product"
              onClose={() => setShow(false)}
              show={show}
              button="Add Product"
            >
              <AddProductForm closeModal={closeModal} />
            </ViewModal>
            <Button className="deletebutton">Delete Product</Button>
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
