import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl_m7eT7Jkj4zZs5Lpt52Usa35E-caZQg",
  authDomain: "pdf-data-71b71.firebaseapp.com",
  projectId: "pdf-data-71b71",
  storageBucket: "pdf-data-71b71.firebasestorage.app",
  messagingSenderId: "644450796595",
  appId: "1:644450796595:web:3e3a721a98ab514aff4f46"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db, app }; 
