import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase'


export const firestorePost = async (collectionName, newDocument) => {
    try {
      await addDoc(collection(db, collectionName), newDocument);
    } catch (e) {
      console.error("Error adding to database: ", e);
    }
  }