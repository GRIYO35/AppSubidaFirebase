// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtMEbL9AVvX5jge2h8B2M3566-0YXHlyA",
  authDomain: "prueba-app-fer.firebaseapp.com",
  projectId: "prueba-app-fer",
  storageBucket: "prueba-app-fer.appspot.com",
  messagingSenderId: "940418574177",
  appId: "1:940418574177:web:300eef42b7086597314720"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;