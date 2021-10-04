import React, { useEffect, useState } from "react";

import { Row, Col, Card, Table, Alert, Badge, Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { Link, useHistory, useParams } from "react-router-dom";
import ViewModal from "../../../modal/viewModal";
import { useAuth } from "../../Context/AuthContext";
import ViewTransaction from "../../view/ViewTransaction";
// import logo from '../../assets/img/logo.png'

const TableRow = ({ Data }) => {
  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };

  return (
    <tr>
      <td className="text-center text-muted">#{Data.id}</td>
      <td>
        {Data.userId}
      </td>
      <td className="text-center">{Data.product} </td>
      <td className="text-center">
        {Data.quantity} 
      </td>
      <td className="text-center">
        <Badge bg="warning" text="dark" className="bg-warning">
          {Data.leaseState ? "Lease" : "Sell"}
        </Badge>
      </td>
      <td className="text-center">
        <ViewModal
          show={show}
          handleClose={closeModal}
          title="Transaction Details"
        >
          <ViewTransaction data={Data} />
        </ViewModal>
        <Button
          onClick={() => setShow(true)}
          type="button"
          className="btn btn-success btn-sm"
        >
          Details
        </Button>
      </td>
    </tr>
  );
};

const TableBody = ({ Data }) => {
  return (
    <tbody>
      {Data.map((element, i) => {
        return <TableRow Data={element} key={i} />;
      })}
    </tbody>
  );
};

const TransactionTable = ({ transactions }) => {
  const [Data, setData] = useState(transactions);

  return (
    //  {/* table for recent elections */}
    <Row className="bg-white p-2 m-auto mx-auto mt-2">
      <div className="col-md-12">
        <Card className="main-card mb-3 card">
          <Card.Header className="bg-white">
            <Row>
              <Col sm={12} md={4}>
                Transactions
              </Col>
              {/* <ActionButtonRight className="col-sm-12 col-md-3 text-end ">
                                <div role="group" className="btn-group-sm btn-group">
                                    <Button active className=" btn btn-info">pending </Button>
                                    <Button className="btn btn-info">running</Button>
                                    <Button className="btn btn-info">Ended</Button>
                                </div>
                            </ActionButtonRight> */}
            </Row>
          </Card.Header>
          {!Data && (
            <Alert variant="warning" className="mx-auto my-2 text-center">
              {" "}
              <strong>No Transactions Added Yet</strong>{" "}
            </Alert>
          )}
          {Data && (
            <div className="table-responsive">
              <Table className="align-middle mb-0 table table-borderless table-striped table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#ID</th>
                    <th>Costumer ID</th>
                    <th>Product</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                {Data && <TableBody Data={transactions} />}
              </Table>
            </div>
          )}
        </Card>
      </div>
    </Row>
  );
};

export default TransactionTable;
