import React, { useState, useEffect } from "react";
import { ListGroup, Tab,Tabs,Dropdown } from "react-bootstrap";
import Paymentresults from "../helpers/MiniComponents/Payments";
import Productresults from "../helpers/MiniComponents/Products";
import Transactionresults from "../helpers/MiniComponents/Transactions";
import PaymentTable from "../helpers/Tables/PaymentTable";
// import {  } from "rsuite";
import ProductTable from "../helpers/Tables/ProductTable";
import TransactionTable from "../helpers/Tables/TransactionTable";
import useFetchProductByUserId from "../Hooks/useFetchProductsByUserId";
import useFetchTransactionByUserId from "../Hooks/useFetchTransactionsByUserId";

const ViewUser = ({ data }) => {
  const [user, setUser] = useState(data);
  const [transaction, setTransaction] = useState();
  const [payment, setPayment] = useState();
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState();
  const [Prloading, setPrLoading] = useState(true);
  const [Tloading, setTLoading] = useState(true);
  const [Paloading, setPaLoading] = useState(true);

  const [Prerror, setPrError] = useState("");  
  const [Terror, setTError] = useState("");  
  const [Paerror, setPaError] = useState("");  
  const closeModal = () => {
    setShow(false);
  };

  
  // const Productresults = (
  //   <>
  //     <ProductTable products={productData} />
  //   </>)
  // const Transactionresults = (
  //   <>
  //     <TransactionTable transactions={transaction} />
  //   </>)
  // const Paymentresults = (
  //   <>
  //     <PaymentTable payments={payment} />
  //   </>)
    
    const FetchTransaction = async (id) => {
      const { transaction, loading, error } = await useFetchTransactionByUserId(id);
      setTLoading(loading);
      setTransaction(transaction);
      setTError(error);
    };
    
    const FetchProduct = async (id) => {
      const { product, loading, error } = await useFetchProductByUserId(id);
      setPrLoading(loading);
      setProductData(product);
      setPrError(error);
    };
    
    const FetchPayment = async (id) => {
      const { product, loading, error } = await useFetchProductByUserId(id);
      setPaLoading(loading);
      setPayment(product);
      setPaError(error);
    };


  return (
    <div>
      <Tabs defaultActiveKey="UserInfo" id="uncontrolled-tab-example" className="mb-3">
       
       <Tab eventKey="UserInfo" title="User details">
        <ListGroup>
          <ListGroup.Item>Customer Name : {user.firstname} {user.lastname}</ListGroup.Item>
          <ListGroup.Item>email : {user.email}</ListGroup.Item>
          <ListGroup.Item>company : {user.company}</ListGroup.Item>
          <ListGroup.Item>Bussiness Id : {user.bussinessID}</ListGroup.Item>
          <ListGroup.Item>ID Type : {user.Idtype}</ListGroup.Item>
          <ListGroup.Item>ID number : {user.idnumber}</ListGroup.Item>
          <ListGroup.Item>Address : {user.address}</ListGroup.Item>
        </ListGroup>
       </Tab>
       <Tab eventKey="GInfo" title="Guarantor Info" >
        <ListGroup>
          <ListGroup.Item>Guarantor Name : {user.gfirstname} {user.lastname}</ListGroup.Item>
          <ListGroup.Item>Guarantor email : {user.gemail}</ListGroup.Item>
          <ListGroup.Item>ID Type : {user.gIdtype}</ListGroup.Item>
          <ListGroup.Item>ID number : {user.gId}</ListGroup.Item>
          <ListGroup.Item>Guarantor Address : {user.gaddress}</ListGroup.Item>
        </ListGroup>       
        </Tab>
     </Tabs>
     
      <Dropdown.Divider />
      <h5>Products</h5>
      <Tabs defaultActiveKey="transactions" id="uncontrolled-tab-example" className="mb-3">
       
        <Tab eventKey="transactions" title="Transactions">
        <Transactionresults id ={data.id}/>

        </Tab>
        <Tab eventKey="payment" title="Payment" >
        <Paymentresults id ={data.id}/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ViewUser;
