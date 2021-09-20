// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTU2OpPG6Xa0zm-UPkCLpVZs_uTV-SEpE",
  authDomain: "owrks-38353.firebaseapp.com",
  projectId: "owrks-38353",
  storageBucket: "owrks-38353.appspot.com",
  messagingSenderId: "922476831909",
  appId: "1:922476831909:web:2b59d283ab0537db7e994c",
  measurementId: "G-X7CW3DGG3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);