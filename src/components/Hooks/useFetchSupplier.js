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
      return { loading: true, suppliers: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, suppliers: action.payload.suppliers };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        suppliers: [],
      };

    default:
      return state;
  }
}

export default function useFetchSupplier(params) {
  const [state, dispatch] = useReducer(reducer, { suppliers: [], loading: true });

  useEffect(() => {
    //retrieving all the suppliers
    let allsuppliers = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllSuppliers() {
      const suppliers = firestore.collection("suppliers");

      const snapshot = await suppliers.get();
      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        allsuppliers.push(doc.data());
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { suppliers: allsuppliers },
        });
      });
    }

    getAllSuppliers();
  }, [params]);

  return state;
}
