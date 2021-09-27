import React, { useEffect, useState } from 'react';

import { Row,Col, Card , Table, Alert, Badge ,Button} from 'rsuite';
import { BsPlus } from 'react-icons/bs';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import logo from '../../assets/img/logo.png'

const TableRow =({Data})=> {

    return (
        <tr>
        <td className="text-center text-muted">#{Data.code}</td>
        <td>
            <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                        <div className="widget-content-left">
                            <img width="40" className="rounded-circle" src={Data.img||logo} alt="Avatar"/>
                        </div>
                    </div>
                    <div className="widget-content-left flex2">
                        <div className="widget-heading">{Data.name}</div>
                    </div>
                </div>
            </div>
        </td>
        <td className="text-center">{Data.startDate}</td>
        <td className="text-center">
            <Badge bg="warning" text="dark" className="bg-warning">{Data.closed ? 'Closed':'Open'}</Badge>
        </td>
        <td className="text-center">
            <Button as={Link} to={"/loadmanager/"+Data.id} type="button"  className="btn btn-primary btn-sm">Details</Button>
        </td>
    </tr>
    );
  }

  const TableBody =({Data})=>{
     
    return(
        <tbody>
           {Data.map ( (element, i ) => {
             return <TableRow 
                        Data={element}
                         key = {i}
                        />
              })}
           
             
           </tbody>
         );
}


const ProductTable =({products})=>{
    const [Data,setData]= useState(products);

    return(
                    
            //  {/* table for recent elections */}
             <Row className="bg-white p-2 m-auto mx-auto mt-2">
                 <div className="col-md-12">
                    <Card className="main-card mb-3 card">
                        <Card.Header className="bg-white">
                            <Row>
                            <Col sm={12} md={4}>Products</Col>
                            {/* <ActionButtonRight className="col-sm-12 col-md-3 text-end ">
                                <div role="group" className="btn-group-sm btn-group">
                                    <Button active className=" btn btn-info">pending </Button>
                                    <Button className="btn btn-info">running</Button>
                                    <Button className="btn btn-info">Ended</Button>
                                </div>
                            </ActionButtonRight> */}
                            </Row>
                            
                        </Card.Header>
                        { !Data &&
                                       <Alert variant="warning" className="mx-auto my-2 text-center"> <strong>No Products Added Yet</strong> </Alert>
                               
                                }
                        { Data && 
                                
                                <div className="table-responsive">
                            <Table className="align-middle mb-0 table table-borderless table-striped table-hover text-center">
                                <thead>
                                    <tr>
                                        <th className="text-center">#Code</th>
                                        <th>Name</th>
                                        <th className="text-center">Date</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                
                                
                                { Data && <TableBody Data={products}/>}
                            </Table>
                        </div>
                        }
                    </Card>
                </div>
            </Row>

    )
}


export default ProductTable;