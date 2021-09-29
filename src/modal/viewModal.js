import React, { useState } from 'react';
import { Modal ,Button} from 'react-bootstrap';

 const ViewModal = ({title,show,handleClose,children})=>{
    return(
        <Modal show={show}  
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static" keyboard={false} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {/* <AddCandidateForm  closeModal={handleSuccess} portfolioId={currentPortfolio.portfolioId} /> */}
          
                  {children}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" className="rounded-pill" onClick={handleClose}>
                  Close 
                </Button>
              </Modal.Footer>
            </Modal>
    )
}


export default ViewModal;