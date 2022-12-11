import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup, 
    updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import  { auth, db, storage } from '../firebase'
import { firestorePost } from '../lib/FirestorePost'


const AuthContext = React.createContext()

export function useAuth () {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [percent, setPercent] = useState(0);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const [myTweets, setMyTweets] = useState(false)

    const handleError = (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} => ${errorMessage}`)
    }
    
    const googleLogin = async () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setCurrentUser(result.user);
        const { displayName, email, photoURL, uid } = result.user;
        firestorePost("users", {displayName, email, photoURL, uid});
        navigate("/");
      }).catch((error) => {
        handleError(error);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    }

    const updateFirebaseUserImage = async (image) => {
        const storageRef = ref(storage, `/files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on("state_changed",
            (snapshot) => {
            const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPercent(percent);
        },
            (err) => console.log(err),
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                updateFirebaseProfilePhoto(url)
            });
        }
        );   
    }

    const updateFirebaseProfileName = async (name) => {
        return updateProfile(auth.currentUser, {displayName: name})
            .then(() => {console.log(`Name updated`)})
            .catch((error) => handleError(error));
    }
    
    const updateFirebaseProfilePhoto = async (url) => {
        return updateProfile(auth.currentUser, {photoURL: url})
            .then(() => {console.log(`Picture updated`)})
            .catch((error) => handleError(error));
    }

    const signUp = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
            setCurrentUser(response.user);
            const { displayName, email, photoURL, uid } = response.user;
            firestorePost("users", {displayName, email, photoURL, uid});
            })
        .catch((error) => handleError(error));
    }

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)       
        .catch((error) => handleError(error));
    }
    
    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });
        
        return unsubscribe
    }, [])

    const handleTweetFilter = () => {

    }

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        googleLogin,
        updateFirebaseProfile: updateFirebaseProfileName,
        updateFirebaseUserImage,
        myTweets,
        setMyTweets,
        handleTweetFilter
    }
  
    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
