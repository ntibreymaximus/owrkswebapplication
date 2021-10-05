import React, { Component, useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import AddModal from "../modal/addModal";
import Dashboard from "./dashboard";
import TransactionTable from "./helpers/Tables/TransactionTable";
import useFetchTransaction from "./Hooks/useFetchTransaction";
import SideNavigation from "./sidenavigation";

export default function Transactions() {
  const [show, setShow] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");

  const closeModal = () => {
    setShow(false);
  };

  const FetchTransaction = async () => {
    const { users, loading, error } = await useFetchTransaction();
    setLoading(loading);
    setTransactionData(users);
    setError(error);
  };

  FetchTransaction();
  const results = (
    <>
      <TransactionTable transactions={transactionData} />
    </>
  );
  return (
    <Container className="container">
      <Col md={3}>
        <SideNavigation />
      </Col>
      <Col>      <div className="navcontent">
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
