import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Divider } from "rsuite";
import ViewModal from "../../modal/viewModal";
import AddTransactionForm from "../helpers/Forms/createTransactionForm";

const ViewProduct = ({ data }) => {
  const [product, setProduct] = useState(data);
  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };
  // useEffect(()=>{

  // },[])
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
        <p>Trunsactions</p>
        <ViewModal show={show} handleClose={closeModal} title="Product Details">
          <AddTransactionForm product={product} />
        </ViewModal>
        <Button onClick={() => setShow(true)}> Add Transaction</Button>
      </div>
    </div>
  );
};

export default ViewProduct;
