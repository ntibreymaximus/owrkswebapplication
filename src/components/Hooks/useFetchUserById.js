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
      return { loading: true, user: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, user: action.payload.user };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: [],
      };

    default:
      return state;
  }
}

export default function useFetchUserById(params) {
  const [state, dispatch] = useReducer(reducer, { user: [], loading: true });

  useEffect(() => {
    //retrieving all the users
    let allusers = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllUsers() {
      const users = firestore.collection("users").doc(params);
      
      await users.get().then((doc) => {
        if (doc.exists) {
          allusers=doc.data();
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: { user: allusers },
          });
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
  }, [params]);

  return state;
}
