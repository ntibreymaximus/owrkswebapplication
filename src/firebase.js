import { initializeApp  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 import {getAuth} from "firebase/auth";
import {getFirestore , increment} from "firebase/firestore";
 import {getStorage} from "firebase/storage";

const fbapp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});



 const storage = getStorage;

// storage ref for uploads
// const storageRef = getStorage.ref();

// export { storageRef };

// auth
export const auth = getAuth();

// verify tutor function
// export const verifyTutor = (data) => {
//   return firestore
//     .collection("tutors")
//     .doc(data.id)
//     .update({
//       verified: true,
//     })
//     .then(() => window.location.reload(false));
// };

// firestore
export const firestore = getFirestore();

//timestamp
// export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// export const timestamp = firestore.FieldValue.serverTimestamp;

//push to array , takes the Id of the primary collection and inserts into parent or child collection
//eg. after uploading a new course you can the course id to ther tutors array of courses.
//this is dynamic and can be used in different
//collection = collection name
//field = collection atribute e.g username
//NewId = id to insert
//destinationID = id of table to insert into

export const db = firestore;


export { storage, fbapp, auth as default };
