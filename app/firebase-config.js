
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDesOjskWz5ZgDydcgG6Wd4nBvcMDjxZPQ",
  authDomain: "rincondelahuasteca-4a673.firebaseapp.com",
  projectId: "rincondelahuasteca-4a673",
  storageBucket: "rincondelahuasteca-4a673.appspot.com",
  messagingSenderId: "1021064267434",
  appId: "1:1021064267434:web:10ca5707b26d94c47fb2d3",
  measurementId: "G-WESWRVS9HV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};