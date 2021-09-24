import firebase from "firebase";


const fbapp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});



const storage = firebase.storage();

// storage ref for uploads
const storageRef = firebase.storage().ref();

export { storageRef };

// auth
export const auth = fbapp.auth();

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
export const firestore = fbapp.firestore();

//timestamp
// export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

//push to array , takes the Id of the primary collection and inserts into parent or child collection
//eg. after uploading a new course you can the course id to ther tutors array of courses.
//this is dynamic and can be used in different
//collection = collection name
//field = collection atribute e.g username
//NewId = id to insert
//destinationID = id of table to insert into

export const db = firebase.firestore();

export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const arrayAdd =firebase.firestore.FieldValue; 

export const AddArrayField = (collection, field, NewId, destinationID) => {
  const mytable = firestore.collection(collection);

  mytable.doc(destinationID).update({
    [field]: firebase.firestore.FieldValue.arrayUnion(NewId),
  });
};

export { storage, fbapp, auth as default };
