import { collection, getDocs  } from "firebase/firestore"; 
import { db } from '../firebase'

const usersRef = collection(db, "users");

export const fetchUsers = async () => {
    const usersArray = [];
    const usersResponse = await getDocs(usersRef);
    usersResponse.forEach(user => {usersArray.push({
      userData: user.data(),
      userDocumentId: user.id
    });
    });
    return usersArray
  }