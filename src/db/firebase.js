// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "byensell-40303.firebaseapp.com",
  projectId: "byensell-40303",
  storageBucket: "byensell-40303.appspot.com",
  messagingSenderId: "64651488885",
  appId: "1:64651488885:web:4eb31b2ca2725b2086523c",
  measurementId: "G-RNSL2RJGZD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);