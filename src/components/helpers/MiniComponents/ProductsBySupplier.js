import { render } from "@testing-library/react";
import React, { useState,  } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { Divider } from "rsuite";
import useFetchProductBySupplierId from "../../Hooks/useFetchProductsBySupplierId";
// import ViewModal from "../../modal/viewModal";

import ProductTable from "../Tables/ProductTable";

const ProductBySupplier = ({ id }) => {
    const [productData, setProductData] = useState();
    const [show, setShow] = useState(false);
    const [Prloading, setPrLoading] = useState(true);
    const [Tloading, setTLoading] = useState(true);
    const [Paloading, setPaLoading] = useState(true);
  
    const [Prerror, setPrError] = useState("");  
    const [Terror, setTError] = useState("");  
    const [Paerror, setPaError] = useState(""); 

    const FetchProduct = async (id) => {
        const { product, loading, error } = await useFetchProductBySupplierId(id);
        setPaLoading(loading);
        setProductData(product);
        console.log(product)
        setPaError(error);
      };

      FetchProduct(id)

      const results = (
        <>
          <ProductTable products={productData} />
        </>)

      return(

        <>
        {Paloading && <Spinner variant="success" animation="border"/>}
        {productData && results}
        </>

      )
  
}

export default ProductBySupplier;