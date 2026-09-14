import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCupFxBDxjNDDmbnKvx2VV0NGGFO0hKGNM",
  authDomain: "localleague-40b47.firebaseapp.com",
  databaseURL: "https://localleague-40b47-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "localleague-40b47",
  storageBucket: "localleague-40b47.firebasestorage.app",
  messagingSenderId: "784540854134",
  appId: "1:784540854134:web:89f10a86343b1aa0113c57",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
