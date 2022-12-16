import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup, 
    updateProfile,
    updatePassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import  { auth, db, storage } from '../firebase'
import { firestorePost } from '../lib/FirestorePost'
import { getDocs, collection } from 'firebase/firestore';
import { fetchUsers } from '../lib/fetchFirestoreUsers';
import { firestoreUpdate } from '../lib/FirestoreUpdate';

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
    const [myTweets, setMyTweets] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("");
    const [userDocRef, setUserDocRef] = useState("");
    const [likedTweetsArray, setLikedTweetsArray] = useState([]);
    const [usersList, setUsersList] = useState([]);

    const handleError = (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} => ${errorMessage}`)
    }
    
    const googleSignUp = async () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
        setCurrentUser(result.user);
        const { displayName, email, photoURL, uid } = result.user;
        firestorePost("users", {displayName, email, photoURL, uid});
        navigate("/");
      }).catch((error) => {
        handleError(error);
        GoogleAuthProvider.credentialFromError(error);
      });
    }

    const googleLogin = async () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
        setCurrentUser(result.user);
        navigate("/");
      }).catch((error) => {
        handleError(error);
        GoogleAuthProvider.credentialFromError(error);
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
                updateFirebaseProfile("photoURL", url);
            });
            }
        );   
    }

    const updateFirebaseProfile = (key, value) => {
        return updateProfile(auth.currentUser, {[key]: value})
            .then(firestoreUpdate("users", userDocRef, {[key]: value}))
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
        getUserLikedTweets();
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        
        return unsubscribe
    }, [currentUser])

    const searchUserDocRef = async () => {
        const fetchedUsersArray = await fetchUsers();
        setUsersList(fetchedUsersArray);
        const userFound =  fetchedUsersArray.find(user => user.uid === currentUser.uid)
        const userDocRef =  userFound.userDocumentId;
        setUserDocRef(userDocRef)
        return userDocRef
    }
    
    const getUserLikedTweets = async () => {
        if(currentUser){
            const userRef = await searchUserDocRef();
            const likedTweetsArray = []
            const likedTweetsRef = collection(db, "users", userRef, "likedTweets");
            const likedTweetsResponse = await getDocs(likedTweetsRef);
            likedTweetsResponse.forEach(likedTweet => {likedTweetsArray.push(likedTweet.data());
            });
            setLikedTweetsArray(likedTweetsArray);
        }
    }

    const updateAuthPassword = (newPassword) => {
        updatePassword(auth.currentUser, newPassword)
        .catch((error) => handleError(error));
    }

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        googleSignUp,
        googleLogin,
        updateFirebaseUserImage,
        updateFirebaseProfile,
        myTweets,
        setMyTweets,
        searchInput,
        setSearchInput,
        searchType,
        setSearchType,
        userDocRef,
        likedTweetsArray,
        usersList,
        updateAuthPassword
    }
  
    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
