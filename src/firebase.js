import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp({
    apiKey: "AIzaSyCOjsQgm7TxtBfzUbBT2GqZOJEaDSD-Edw",
    authDomain: "micro-blogging-project-b48cb.firebaseapp.com",
    projectId: "micro-blogging-project-b48cb",
    storageBucket: "micro-blogging-project-b48cb.appspot.com",
    messagingSenderId: "928725246697",
    appId: "1:928725246697:web:f39467485091790dc88678"
  });

export const db = getFirestore(app);

export default app;

export const auth = getAuth(app);

export const storage = getStorage(app);