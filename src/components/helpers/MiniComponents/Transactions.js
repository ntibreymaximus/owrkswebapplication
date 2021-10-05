import { render } from "@testing-library/react";
import React, { useState,  } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { Divider } from "rsuite";
import useFetchProductByUserId from "../../Hooks/useFetchProductsByUserId";
import useFetchTransactionByUserId from "../../Hooks/useFetchTransactionsByUserId";
// import ViewModal from "../../modal/viewModal";

import TransactionTable from "../Tables/TransactionTable";

const Transactionresults = ({ id }) => {
    const [transaction, setTransaction] = useState();
    const [show, setShow] = useState(false);
    const [productData, setProductData] = useState();
    const [Prloading, setPrLoading] = useState(true);
    const [Tloading, setTLoading] = useState(true);
    const [Paloading, setPaLoading] = useState(true);
  
    const [Prerror, setPrError] = useState("");  
    const [Terror, setTError] = useState("");  
    const [Paerror, setPaError] = useState(""); 

    const FetchTransaction = async (id) => {
        const { transaction, loading, error } = await useFetchTransactionByUserId(id);
        setPaLoading(loading);
        setTransaction(transaction);
        console.log(transaction)
        setPaError(error);
      };

      FetchTransaction(id)

      const results = (
        <>
          <TransactionTable transactions={transaction} />
        </>)

      return(

        <>
        {Paloading && <Spinner variant="success" animation="border"/>}
        {transaction && results}
        </>

      )
  
}

export default Transactionresults;