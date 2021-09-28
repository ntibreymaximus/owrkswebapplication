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
      return { loading: true, users: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, users: action.payload.users };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        users: [],
      };

    default:
      return state;
  }
}

export default function useFetchSupplier(params) {
  const [state, dispatch] = useReducer(reducer, { users: [], loading: true });

  useEffect(() => {
    //retrieving all the users
    let allusers = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllUsers() {
      const users = firestore.collection("suppliers");

      const snapshot = await users.get();
      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        allusers.push(doc.data());
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { users: allusers },
        });
      });
    }

    getAllUsers();
  }, [params]);

  return state;
}
