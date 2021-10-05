import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Container, Button } from "rsuite";
import AddModal from "../modal/addModal";
import Dashboard from "./dashboard";
import SupplierTable from "./helpers/Tables/SupplierTable";
import useFetchSupplier from "./Hooks/useFetchSupplier";
import SideNavigation from "./sidenavigation";


export default function Suppliers() {
  const [show, setShow] = useState(false);
  const [supplierData, setSuppplierData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");
  const FetchSupplier = async () => {
    const { users, loading, error } = await useFetchSupplier();
    setLoading(loading);
    setSuppplierData(users);
    setError(error);
  };
  FetchSupplier();
  const results = (
    <>
      <SupplierTable supplier={supplierData} />
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
              Add Supplier
            </Button>
            <AddModal
              title="Add Supplier"
              onClose={() => setShow(false)}
              show={show}
              onSubmit={<Dashboard />}
              button="Add Supplier"
            ></AddModal>
            <Button className="deletebutton">Delete Supplier</Button>
          </form>
          <div className="results">{!myloading ? results : "Loading ..."}</div>
        </div>
      </div>
      </Col>
    </Container>
  );
}
