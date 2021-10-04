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
      return { loading: true, election: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, election: action.payload.election };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        election: [],
      };

    default:
      return state;
  }
}

export default function useFetchElectionByUserId(params) {
  const [state, dispatch] = useReducer(reducer, { election: [], loading: true });

  useEffect(() => {
    //retrieving all the Elections
    let allelections = [];
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    async function getAllElections() {
    
        
      
      const elections = firestore.collection("election").where("userId","==",params);
   
    await elections.get().then((snapshot)=>{
   
    if (snapshot.empty) {
      throw "Election doesn't exist"
    }
    snapshot.forEach((doc) => {
      //console.log(doc.data());

      allelections.push(doc.data());
      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { election: allelections },
      });
    }) 
  }).catch ((err)=>{
    dispatch({
      type: ACTIONS.ERROR,
      payload: { error: err },
    });
      })
  }

    getAllElections();
  }, [params]);

  return state;
}
