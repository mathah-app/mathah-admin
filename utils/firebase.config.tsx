import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5qpX_h4hWA84J5bpvaitDG1WhhP6TLWI",
  authDomain: "avid-booth-438205-j9.firebaseapp.com",
  databaseURL: "https://avid-booth-438205-j9-default-rtdb.firebaseio.com",
  projectId: "avid-booth-438205-j9",
  storageBucket: "avid-booth-438205-j9.firebasestorage.app",
  messagingSenderId: "1083123235882",
  appId: "1:1083123235882:web:0389747cdb72b9eff95753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app,'production')
 const auth = getAuth(app);
export {app, db, auth}