// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_RX7ch2wEwkF0IHq7U_MSWLwYG_wI9uY",
  authDomain: "ecommerce-project-chardhm.firebaseapp.com",
  projectId: "ecommerce-project-chardhm",
  storageBucket: "ecommerce-project-chardhm.appspot.com",
  messagingSenderId: "1067050488880",
  appId: "1:1067050488880:web:3c3a44dc9459a3764589f5",
  measurementId: "G-PDKBS9QBT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;