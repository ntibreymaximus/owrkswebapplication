import { useReducer, useEffect } from "react";

//importing firebase and initializing db constant
import { firestore } from "../../firebase";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

// function reducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.MAKE_REQUEST:
//       return { loading: true, supplier: [] };

//     case ACTIONS.GET_DATA:
//       return { ...state, loading: false, supplier: action.payload.supplier };

//     case ACTIONS.ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error,
//         supplier: [],
//       };

//     default:
//       return state;
//   }
// }

export default async function FetchSupplierById(id,setSuppplierData,setError) {
  let supplier = [];
    let error = '';
    //retrieving all the suppliers
  
    // dispatch({ type: ACTIONS.MAKE_REQUEST });
      const suppliers = firestore.collection("suppliers").doc(id);
      
     await suppliers.get().then((doc) => {
        if (doc.exists) {
          supplier.push(doc.data())

          console.log(supplier)

          setSuppplierData(supplier);
          
        } else {
  
            console.log("No such document!");
            error = "supplier Doesn't Exist" ;
            setError(error);
          }

    })
    
      
   

    
      
  
    
// console.log(params);
//    const [suppliers,error]= getAllSuppliers();

  

}
