import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Divider } from "rsuite";

const ViewPayment = ({ data }) => {
  const [payment, setPayment] = useState(data);

  // (()=>{

  // },[])
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>Payment ID : {payment.id}</ListGroup.Item>
        <ListGroup.Item>Amount : {parseFloat(payment.amountPaid).toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>Product ID : {payment.productId}</ListGroup.Item>
        <ListGroup.Item>Supplier  : {payment.supplier}</ListGroup.Item>
        <ListGroup.Item>Transaction ID : {payment.transactionId}</ListGroup.Item>
      </ListGroup>
      <Divider />
      <div>
        {/* <h3>Products</h3> */}
      </div>
    </div>
  );
};

export default ViewPayment;
