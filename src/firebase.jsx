
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCpqOEudn7cmB782Jz67JULAVhXJ_05wpI",
  authDomain: "chat-40226.firebaseapp.com",
  projectId: "chat-40226",
  storageBucket: "chat-40226.appspot.com",
  messagingSenderId: "482033160117",
  appId: "1:482033160117:web:851625db4f40e117e4d3fc",
  measurementId: "G-FRFGM6YWX1"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
