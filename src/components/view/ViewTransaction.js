<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { ListGroup,Button } from "react-bootstrap";
import { Divider } from "rsuite";
import ViewModal from "../../modal/viewModal";
import AddPaymentForm from "../helpers/Forms/createPaymentForm";
import AddTransactionForm from "../helpers/Forms/createPaymentForm";
import PaymentTable from "../helpers/Tables/PaymentTable";
import TransactionTable from "../helpers/Tables/TransactionTable";
import useFetchPaymentByTransactionId from "../Hooks/useFetchPaymentsByTransactionId";

const ViewTransaction = ({ data }) => {
  const [transaction, setTransaction] = useState(data);
  const [show, setShow] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [myloading, setLoading] = useState(true);

  const [myerror, setError] = useState("");  
  const closeModal = () => {
    setShow(false);
  };

  const results = (
    <>
      <PaymentTable payments={paymentData} />
    </>)
  // useEffect(()=>{

    const FetchPayment = async (id) => {
      const { payment, loading, error } = await useFetchPaymentByTransactionId(id);
      setLoading(loading);
      setPaymentData(payment);
      setError(error);
    };
    FetchPayment(data.id)

  // },[])
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>Product : {transaction.product}</ListGroup.Item>
        <ListGroup.Item>Suplier : {transaction.quantity}</ListGroup.Item>
        <ListGroup.Item>Costumer : {transaction.userId}</ListGroup.Item>
        <ListGroup.Item>Price : {transaction.price}</ListGroup.Item>
        <ListGroup.Item>Payment : {transaction.amountPaid}</ListGroup.Item>
        <ListGroup.Item>Balance : {transaction.balance}</ListGroup.Item>
      </ListGroup>
      <Divider />
      <div>
        <h5>Payments</h5>
      
        <ViewModal show={show} handleClose={closeModal}  title="Transaction Details">
          <AddPaymentForm transaction={transaction} />
        </ViewModal>
        <Button onClick={() => setShow(true)}> Make Payment</Button>
      </div>
      <Divider/>
      {results}
    </div>
  );
};
=======
import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Divider } from 'rsuite';
import AddTransactionForm from '../helpers/Forms/createTransactionForm';




const ViewTransaction =({data})=>{
    const [transaction,setTransaction]=useState(data)
    
    // useEffect(()=>{



    // },[])
    return (
        <div>
            <ListGroup>
                <ListGroup.Item>Transaction Name : {transaction.name}</ListGroup.Item>
                <ListGroup.Item>email : {transaction.email}</ListGroup.Item>                
            </ListGroup>
            <Divider/>
            <div>
                <h3>Products</h3>
                {/* <AddTransactionForm /> */}

            </div>

        </div>
    )

}
>>>>>>> parent of ead132c (formatting update)

export default ViewTransaction;
