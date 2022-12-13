import { db } from '../firebase'
import { fetchUsers } from './fetchFirestoreUsers';
import { collection, getDocs, orderBy, query  } from "firebase/firestore"; 

const tweetsRef = collection(db, "tweets");


const fetchTweets = async () => {
    const tweetsArray = [];
    const tweetsResponse = await getDocs(query(tweetsRef, orderBy("date", "desc")));
    tweetsResponse.forEach(tweet => {tweetsArray.push({
        tweetData: tweet.data(),
        tweetDocumentId: tweet.id
    })
    });
    return tweetsArray;
  }

export const fetchTweetsWithUsersData = async (callback) => {
    const tweetsArray = await fetchTweets(callback);
    const usersArray = await fetchUsers();
    tweetsArray.forEach(tweet => {
        tweet.tweetData.userDisplayName = null;
    if(usersArray.some((user) => user.userData.uid === tweet.tweetData.userUid)){
        const userFound = usersArray.find((user) => user.userData.uid === tweet.tweetData.userUid);
        tweet.tweetData.userDisplayName = userFound.userData.displayName;
        tweet.tweetData.userPhotoURL = userFound.userData.photoURL;
        tweet.tweetData.userEmail = userFound.userData.email;
        tweet.userDocumentId = userFound.userDocumentId
    }})
    callback(tweetsArray);
}