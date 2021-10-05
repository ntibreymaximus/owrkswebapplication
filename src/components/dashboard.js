<<<<<<< HEAD
import React, { useState } from "react";
import { Container, Col } from "react-bootstrap";
=======
import React, { Component } from "react";
import { Col,Container } from "react-bootstrap";
>>>>>>> parent of ead132c (formatting update)
import { Link } from "react-router-dom";
import "../css/dashboard.css";
import "../css/sidenavigation.css";
import useFetchCount from "./Hooks/useFetchCounts";
import SideNavigation from "./sidenavigation";
export default function Dashboard() {
  const [countData, setCountData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");

  const FetchCount = async () => {
    const { count, loading, error } = await useFetchCount();
    setLoading(loading);
    setCountData(count);
    setError(error);
  };

  FetchCount();

  return (
    <Container className="container">
      <Col md={3}>
        <SideNavigation />
      </Col>
      <Col>
        <div className="navcontent">
          <div className="dashboard">
            <div class="row">
              <div class="col-sm-6">
                <div class="card text-center">
                  <div class="card-body">
                    <h1 class="card-title">{countData.UserCount}</h1>
                    <p class="card-text">ACTIVE CUSTOMERS</p>
                    <Link to="/customers" class="button">
                      VIEW CUSTOMERS
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card text-center">
                  <div class="card-body">
                    <h1 class="card-title">{countData.SupplierCount}</h1>
                    <p class="card-text">ACTIVE SUPPLIERS</p>
                    <Link to="/suppliers" class="button">
                      VIEW SUPPLIERS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <div class="row">
              <div class="col-sm-6">
                <div class="card text-center">
                  <div class="card-body">
                    <h1 class="card-title">{countData.ProductCount}</h1>
                    <p class="card-text">AVAILABLE PRODUCTS</p>
                    <Link to="/products" class="button">
                      VIEW PRODUCTS
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card text-center">
                  <div class="card-body">
                    <h1 class="card-title">{countData.TransactionCount}</h1>
                    <p class="card-text">COMPLETED TRANSACTIONS</p>
                    <Link to="/transactions" class="button">
                      VIEW TRANSACTIONS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Container>
  );
}
