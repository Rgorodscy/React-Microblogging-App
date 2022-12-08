import { updateProfile } from "firebase/auth";
import  { auth } from '../firebase'


export const updateFirebaseProfileName = async (name) => {
    return updateProfile(auth.currentUser, {displayName: name})
        .then(() => {console.log(`Name updated`)})
        .catch((error) => handleError(error));
}

export const updateFirebaseProfilePhoto = async (url) => {
    return updateProfile(auth.currentUser, {photoURL: url})
        .then(() => {console.log(`Picture updated`)})
        .catch((error) => handleError(error));
}


export const handleError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`${errorCode} => ${errorMessage}`)
}