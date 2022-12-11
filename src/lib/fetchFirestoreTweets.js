import { db } from '../firebase'
import { fetchUsers } from './fetchFirestoreUsers';
import { collection, getDocs, orderBy, query  } from "firebase/firestore"; 

const tweetsRef = collection(db, "tweets");


const fetchTweets = async () => {
    const tweetsArray = [];
    const tweetsResponse = await getDocs(query(tweetsRef, orderBy("date", "desc")));
    tweetsResponse.forEach(tweet => tweetsArray.push(tweet.data()));
    return tweetsArray;
  }

export const fetchTweetsWithUsersData = async (callback) => {
    const tweetsArray = await fetchTweets(callback);
    const usersArray = await fetchUsers();
    tweetsArray.forEach(tweet => {
        tweet.userDisplayName = null;
    if(usersArray.some((user) => user.userData.uid === tweet.userUid)){
        const userFound = usersArray.find((user) => user.userData.uid === tweet.userUid);
        tweet.userDisplayName = userFound.userData.displayName;
        tweet.userPhotoURL = userFound.userData.photoURL;
        tweet.userEmail = userFound.userData.email
    }})
    callback(tweetsArray);
}