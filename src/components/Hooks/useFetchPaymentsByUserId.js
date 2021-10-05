import { useReducer, useEffect } from "react";

//importing firebase and initializing db constant
import { firestore } from "../../firebase";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, payment: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, payment: action.payload.payment };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        payment: [],
      };

    default:
      return state;
  }
}

export default function useFetchPaymentByUserId(params) {
  const [state, dispatch] = useReducer(reducer, { payment: [], loading: true });

  useEffect(() => {
    //retrieving all the Payments
    let allpayments = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllPayments() {
    
        
      
      const payments = firestore.collection("payments").where("userId","==",params);
   
    await payments.get().then((snapshot)=>{
   
    if (snapshot.empty) {
      throw "Payment doesn't exist"
    }
    snapshot.forEach((doc) => {
      //console.log(doc.data());

      allpayments.push(doc.data());
      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { payment: allpayments },
      });
    }) 
  }).catch ((err)=>{
    dispatch({
      type: ACTIONS.ERROR,
      payload: { error: err },
    });
      })
  }

    getAllPayments();
  }, [params]);

  return state;
}
