import { render } from "@testing-library/react";
import React, { useState,  } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { Divider } from "rsuite";
import useFetchPaymentByUserId from "../../Hooks/useFetchPaymentsByUserId";
// import ViewModal from "../../modal/viewModal";

import PaymentTable from "../Tables/PaymentTable";

const Paymentresults = ({ id }) => {
    const [payment, setPayment] = useState();
    const [show, setShow] = useState(false);
    const [productData, setProductData] = useState();
    const [Prloading, setPrLoading] = useState(true);
    const [Tloading, setTLoading] = useState(true);
    const [Paloading, setPaLoading] = useState(true);
  
    const [Prerror, setPrError] = useState("");  
    const [Terror, setTError] = useState("");  
    const [Paerror, setPaError] = useState(""); 

    const FetchPayment = async (id) => {
        const { payment, loading, error } = await useFetchPaymentByUserId(id);
        setPaLoading(loading);
        setPayment(payment);
        setPaError(error);
      };
      FetchPayment(id)

      const results = (
        <>
          <PaymentTable payments={payment} />
        </>)

      return(

        <>
        {Paloading && <Spinner variant="success" animation="border"/>}
        {payment && results}
        </>

      )
  
}

export default Paymentresults;