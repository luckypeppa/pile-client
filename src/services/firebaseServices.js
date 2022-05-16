import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfNFNMFx5Rn9gbQ0bTMgYJ--xqrtRFGGQ",
  authDomain: "pile-46e37.firebaseapp.com",
  projectId: "pile-46e37",
  storageBucket: "pile-46e37.appspot.com",
  messagingSenderId: "268947555346",
  appId: "1:268947555346:web:13555a60666825d86584cb",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
