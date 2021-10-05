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
      return { loading: true, count: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, count: action.payload.count };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        count: [],
      };

    default:
      return state;
  }
}

export default function useFetchCount(params) {
  const [state, dispatch] = useReducer(reducer, { count: [], loading: true });

  useEffect(() => {
    //retrieving all the counts
    let allcounts = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllCounts() {
      const counts = firestore.collection("PC").doc('--Counter--');

      await counts.get().then((doc) => {
        if (doc.exists) {
          allcounts = doc.data();
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: { count: allcounts },
          });
          //console.log("count data: fetched", doc.data());
        } else {
          // doc.data() will be undefined in this case
          dispatch({
            type: ACTIONS.ERROR,
            payload: { error: "Count Doesn't Exist" },
          });
          console.log("No such document!");
          return;
        }
      });
    }

    console.log(params);
    getAllCounts();
  }, [params]);

  return state;
}
