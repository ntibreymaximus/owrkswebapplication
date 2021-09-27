import { useReducer, useEffect } from "react";

//importing firebase and initializing db constant
import { firestore } from "../../../firebase";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loadingg: true, products: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loadingg: false, products: action.payload.products };

    case ACTIONS.ERROR:
      return {
        ...state,
        loadingg: false,
        error: action.payload.error,
        products: [],
      };

    default:
      return state;
  }
}

export default function useFetchProducts(params) {
  const [state, dispatch] = useReducer(reducer, { products: [], loading: true });

  useEffect(() => {
    //retrieving all the products
    let allproducts = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllProducts() {
      const products = firestore.collection("products");

      const snapshot = await products.get();
      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        allproducts.push(doc.data());
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { products: allproducts },
        });
      });
    }

    getAllProducts();
  }, [params]);

  return state;
}
