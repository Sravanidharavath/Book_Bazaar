// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqhJE8ueu_gn6SPf1sZM9_jO_yEemVmfs",
  authDomain: "online-book-bazaar.firebaseapp.com",
  projectId: "online-book-bazaar",
  storageBucket: "online-book-bazaar.appspot.com",
  messagingSenderId: "242912598002",
  appId: "1:242912598002:web:421eefdc5e24a63824bd6b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ this is needed for auth functions
export default app;
