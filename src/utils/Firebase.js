// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe3P8iNuQUrR4PR52e-vrvVifP-44SL_o",
  authDomain: "taquez-778ac.firebaseapp.com",
  projectId: "taquez-778ac",
  storageBucket: "taquez-778ac.appspot.com",
  messagingSenderId: "120944071010",
  appId: "1:120944071010:web:c9fc64007c837d1c101c3b",
  measurementId: "G-L990E3BJKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);