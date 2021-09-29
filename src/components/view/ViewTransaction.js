import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Divider } from 'rsuite';




const ViewTransaction =({data})=>{
    const [transaction,setTransaction]=useState(data)
    
    // useEffect(()=>{



    // },[])
    return (
        <div>
            <ListGroup>
                <ListGroup.Item>Transaction Name : {transaction.name}</ListGroup.Item>
                <ListGroup.Item>email : {transaction.email}</ListGroup.Item>                
            </ListGroup>
            <Divider/>
            <div>
                <h3>Products</h3>

            </div>

        </div>
    )

}

export default ViewTransaction;
