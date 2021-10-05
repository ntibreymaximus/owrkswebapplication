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
      return { loading: true, product: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, product: action.payload.product };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        product: [],
      };

    default:
      return state;
  }
}

export default function useFetchProductByUserId(params) {
  const [state, dispatch] = useReducer(reducer, { product: [], loading: true });

  useEffect(() => {
    //retrieving all the Products
    let allproducts = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllProducts() {
    
        
      
      const products = firestore.collection("products").where("userId","==",params);
   
    await products.get().then((snapshot)=>{
   
    if (snapshot.empty) {
      throw "Product doesn't exist"
    }
    snapshot.forEach((doc) => {
      //console.log(doc.data());

      allproducts.push(doc.data());
      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { product: allproducts },
      });
    }) 
  }).catch ((err)=>{
    dispatch({
      type: ACTIONS.ERROR,
      payload: { error: err },
    });
      })
  }

    getAllProducts();
  }, [params]);

  return state;
}
