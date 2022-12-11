import { updateDoc, doc } from "firebase/firestore"; 
import { db } from '../firebase'


export const firestoreUpdate = async (collectionName, documentFirestoreId, updateObject) => {
    try {
      const docRef = doc(db, collectionName, documentFirestoreId);
      await updateDoc(docRef, updateObject)      
    } catch (e) {
      console.error("Error updating to database: ", e);
    }
  }