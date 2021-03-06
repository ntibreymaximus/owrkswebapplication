import React, { useEffect } from "react";
import "../css/modal.css";
const AddModal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  return (
    <div
      className={`modal ${props.show ? "show" : ""}`}
      // onClick={props.onClose}
      // onClick={props.onSubmit}
    >
      {/* onClick={(e) => e.stopPropagation()} */}
      <div className="modal-content" >
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">{props.children} </div>
        <div className="modal-footer">
          <button className="addbutton" >
            {props.button}
          </button>
          <button className="cancelbutton" >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
