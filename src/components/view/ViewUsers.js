import React, { useState,  } from "react";
import { ListGroup } from "react-bootstrap";
import { Divider } from "rsuite";

const ViewUser = ({ data }) => {
  const [user, setUser] = useState(data);

  // (()=>{

  // },[])
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>User Name : {user.name}</ListGroup.Item>
        <ListGroup.Item>email : {user.email}</ListGroup.Item>
      </ListGroup>
      <Divider />
      <div>
        <h3>Settings</h3>
        <h3>Change Password</h3>
      </div>
    </div>
  );
};

export default ViewUser;
