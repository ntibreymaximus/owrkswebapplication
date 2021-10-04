import React, { useState,  } from "react";
import { ListGroup } from "react-bootstrap";
import { Divider } from "rsuite";
import AddTransactionForm from "../helpers/Forms/createTransactionForm";

const ViewTransaction = ({ data }) => {
  const [transaction, setTransaction] = useState(data);

  // (()=>{

  // },[])
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>Transaction Name : {transaction.name}</ListGroup.Item>
        <ListGroup.Item>email : {transaction.email}</ListGroup.Item>
      </ListGroup>
      <Divider />
      <div>
        <h3>Products</h3>
        {/* <AddTransactionForm /> */}
      </div>
    </div>
  );
};

export default ViewTransaction;
