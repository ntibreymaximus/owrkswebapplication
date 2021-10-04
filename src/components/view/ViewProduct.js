import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Divider } from "rsuite";
import ViewModal from "../../modal/viewModal";
import AddTransactionForm from "../helpers/Forms/createTransactionForm";
import TransactionTable from "../helpers/Tables/TransactionTable";
import useFetchTransactionByProductId from "../Hooks/useFetchTransactionsByProductId";

const ViewProduct = ({ data }) => {
  const [product, setProduct] = useState(data);
  const [show, setShow] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [myloading, setLoading] = useState(true);

  const [myerror, setError] = useState("");  
  const closeModal = () => {
    setShow(false);
  };
  //  useEffect(()=>{
    const FetchTransaction = async (id) => {
      const { transaction, loading, error } = await useFetchTransactionByProductId(id);
      setLoading(loading);
      setTransactionData(transaction);
      setError(error);
    };
    FetchTransaction(data.id)

  //  },[data])

     const results = (
    <>
      <TransactionTable transactions={transactionData} />
    </>)
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>Name : {product.name}</ListGroup.Item>
        <ListGroup.Item>Quantity : {product.quantity}</ListGroup.Item>
        <ListGroup.Item>In stock : {product.inStock}</ListGroup.Item>
        <ListGroup.Item>Supplier : {product.supplier}</ListGroup.Item>
        <ListGroup.Item>State : {product.leaseState}</ListGroup.Item>
      </ListGroup>
      <Divider />
      <div>
        <p>Transactions</p>
        <ViewModal show={show} handleClose={closeModal}  title="Product Details">
          <AddTransactionForm product={product} />
        </ViewModal>
        <Button onClick={() => setShow(true)}> Add Transaction</Button>
      </div>
      <Divider/>
      {results}
     
    </div>
  );
};

export default ViewProduct;
