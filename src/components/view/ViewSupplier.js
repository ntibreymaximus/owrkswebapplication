import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Divider } from "rsuite";

const ViewSupplier = ({ data }) => {
  const [supplier, setSupplier] = useState(data);

  // (()=>{

  // },[])
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>Supplier Name : {supplier.name}</ListGroup.Item>
        <ListGroup.Item>email : {supplier.email}</ListGroup.Item>
        <ListGroup.Item>Company : {supplier.company}</ListGroup.Item>
      </ListGroup>
      <Divider />
      <div>
        <h3>Products</h3>
      </div>
    </div>
  );
};

export default ViewSupplier;
