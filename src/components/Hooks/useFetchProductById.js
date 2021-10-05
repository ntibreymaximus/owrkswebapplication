import { producteducer, useEffect } from "react";

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

export default function useFetchProductById(params) {
  const [state, dispatch] = producteducer(reducer, { product: [], loading: true });

  useEffect(() => {
    //retrieving all the products
    let allproducts = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
<<<<<<< HEAD
    async function getAllProducts() {
      const products = firestore.collection("products").doc(params);

      await products.get().then((doc) => {
        if (doc.exists) {
          allproducts = doc.data();
=======
    async function getAllUsers() {
      const users = firestore.collection("users").doc(params);
      
      await users.get().then((doc) => {
        if (doc.exists) {
          allusers=doc.data();
>>>>>>> parent of ead132c (formatting update)
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: { product: allproducts },
          });
<<<<<<< HEAD
          //console.log("product data: fetched", doc.data());
        } else {
          // doc.data() will be undefined in this case
          dispatch({
            type: ACTIONS.ERROR,
            payload: { error: "product Doesn't Exist" },
          });
          console.log("No such document!");
          return;
        }
      });
    }

    console.log(params);
    getAllProducts();
=======
            //console.log("user data: fetched", doc.data());
        } else {
            // doc.data() will be undefined in this case
            dispatch({
              type: ACTIONS.ERROR,
              payload: { error: "user Doesn't Exist" },
            });
            console.log("No such document!");
            return;
          }
    })
    
      
   

    }
      
  
    
console.log(params);
    getAllUsers();
>>>>>>> parent of ead132c (formatting update)
  }, [params]);

  return state;
}
