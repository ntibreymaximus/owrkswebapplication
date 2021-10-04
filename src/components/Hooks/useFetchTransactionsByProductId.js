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
      return { loading: true, transaction: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, transaction: action.payload.transaction };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        transaction: [],
      };

    default:
      return state;
  }
}

export default function useFetchTransactionByProductId(params) {
  const [state, dispatch] = useReducer(reducer, { transaction: [], loading: true });

  useEffect(() => {
    //retrieving all the Transactions
    let alltransactions = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllTransactions() {
    
        
      
      const transactions = firestore.collection("transactions").where("productId","==",params);
   
    await transactions.get().then((snapshot)=>{
   
    if (snapshot.empty) {
      throw "Transaction doesn't exist"
    }
    snapshot.forEach((doc) => {
      //console.log(doc.data());

      alltransactions.push(doc.data());
      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { transaction: alltransactions },
      });
    }) 
  }).catch ((err)=>{
    dispatch({
      type: ACTIONS.ERROR,
      payload: { error: err },
    });
      })
  }

    getAllTransactions();
  }, [params]);

  return state;
}
