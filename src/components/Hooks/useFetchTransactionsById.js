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

export default function useFetchTransactionById(params) {
  const [state, dispatch] = useReducer(reducer, { transaction: [], loading: true });

  useEffect(() => {
    //retrieving all the transactions
    let alltransactions = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllTransactions() {
      const transactions = firestore.collection("transactions").doc(params);

      await transactions.get().then((doc) => {
        if (doc.exists) {
          alltransactions = doc.data();
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: { transaction: alltransactions },
          });
          //console.log("transaction data: fetched", doc.data());
        } else {
          // doc.data() will be undefined in this case
          dispatch({
            type: ACTIONS.ERROR,
            payload: { error: "Transaction Doesn't Exist" },
          });
          console.log("No such document!");
          return;
        }
      });
    }

    console.log(params);
    getAllTransactions();
  }, [params]);

  return state;
}
