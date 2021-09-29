import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Divider } from 'rsuite';




const ViewProduct =({data})=>{
    const [product,setProduct]=useState(data)
    
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
            <Divider/>
            <div>
                <p>Trunsactions</p>
                

            </div>

        </div>
    )

}

export default ViewProduct;
