import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-qAny4u7G6aliXL_sMi7yfw7uVrdbjhM",
  authDomain: "trashitt-17d9b.firebaseapp.com",
  projectId: "trashitt-17d9b",
  storageBucket: "trashitt-17d9b.appspot.com",
  messagingSenderId: "912821579544",
  appId: "1:912821579544:web:b962285e7870d50332386d",
  measurementId: "G-YDCQLZHGGT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;