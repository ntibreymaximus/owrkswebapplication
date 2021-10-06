import React, { useRef, useState } from "react";
import { Spinner, Col ,Alert } from "react-bootstrap";
import { Container, Button } from "rsuite";
import AddModal from "../modal/addModal";
import AddProductForm from "./helpers/Forms/addProductForm";
import ProductTable from "./helpers/Tables/ProductTable";
import useFetchProducts from "./Hooks/useFetchProducts";
import SideNavigation from "./sidenavigation";
import "../css/users.css";
import ViewModal from "../modal/viewModal";
import { firestore } from "../firebase";

export default function Transactions() {
  const [show, setShow] = useState(false);
  const [data, setSearchData] = useState();
  const [productData, setProductData] = useState([]);
  const [myloading, setLoading] = useState(false);
  const [myferror, setError] = useState("");
  const [loading, setiLoading] = useState(true);
  const [myerror, setMError] = useState("");
  const searchRef = useRef();

  const closeModal =()=>{
    setShow(false)
  }
  const FetchProduct = async () => {
    const { products, loading, error } = await useFetchProducts();
    setiLoading(loading);
    setProductData(products);
    setError(error);
  };

  const Search = async () => {
 
    let data = [];
    let allusers = [];
    let error = '';

    if(searchRef.current.value.toString() === ''){
      // setSearchData()
      console.log("do nothing here")
      return;
    }else{
    setLoading(true);


    
      
      const users = firestore.collection("products").where('id','==',searchRef.current.value.toString());

      const snapshot = await users.get();
      if (snapshot.empty) {
        setMError("Supplier Not Found")
        setSearchData()
        console.log("Supplier Not Found")
        setLoading(false);

        return
      }

      snapshot.forEach((doc) => {
        allusers.push(doc.data());
        setSearchData(allusers)
        setMError("")
        setLoading(false);
        return


      });
    }
  }
  async function  DoSearch (){
    setMError("")
    await Search()
  }



  FetchProduct();
  const results = (
    <div>
      <ProductTable products={data ? data : productData} />
    </div>
  );
  return (
    <Container className="container">
        <Col md={3}><SideNavigation/></Col>
      <Col>
      <div className="navcontent">
        <div class="container-fluid searchoptions">
          <form class="d-flex">
            <input
              className="form-control searchforminput"
              type="search by Product ID"
              placeholder="Search"
              aria-label="Search"
              ref={searchRef}

            />
                <Button className="searchbutton" onClick={()=>DoSearch()}>Search</Button>
            <Button className="addbutton" onClick={() => setShow(true)}>
              Add Product
            </Button>
            <ViewModal
              title="Add Product"
              handleClose={() => setShow(false)}
              show={show}
              button="Add Product"
            >
              <AddProductForm closeModal={closeModal} />
            </ViewModal>
            <Button className="deletebutton">Delete Product</Button>
          </form>
          <div className="results">
          {myerror ? <Alert variant="danger">{myerror}</Alert>:
                      <div>{(!myloading && !loading ) ? results : <Spinner animation="border" variant="white"/>}</div>
                      }
          </div>
        </div>
      </div>
      </Col>
    </Container>
  );
}
