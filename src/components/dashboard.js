import React, { useState } from "react";
import { Container,Col } from "react-bootstrap";
import "../css/dashboard.css";
import "../css/sidenavigation.css";
import useFetchCount from "./Hooks/useFetchCounts";
import SideNavigation from "./sidenavigation";


export default function Dashboard (){
 const [countData, setCountData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");


  const FetchCount = async () => {
    const { count, loading, error } = await useFetchCount();
    setLoading(loading);
    setCountData(count);
    setError(error);
  };


  FetchCount()
   
    return (
      <Container className="container">
        <Col md={3}>
        <SideNavigation />
      </Col>
      <Col>
        <div className="navcontent">
          <h4 className="mx-5 my-5 text-white">
            Welcome To OWRKS<br/>
            {countData.ProductCount}<br/>
            {countData.SupplierCount}<br/>
            {countData.TransactionCount}<br/>
            {countData.UserCount}<br/>
            {countData.paymentCount}<br/>
            {countData.ProductCount}<br/>

          </h4>
        </div>
        </Col>
      </Container>
    );
  
}
