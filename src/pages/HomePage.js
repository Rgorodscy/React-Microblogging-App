import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import CreateTweet from '../components/CreateTweet'
import TweetListContainer from '../components/TweetListContainer';
import TweetsContext from '../contexts/TweetsContext';
import CreateTweetsContext from '../contexts/CreateTweetsContext';
import { firestorePost } from '../lib/FirestorePost'
import { fetchUsers } from '../lib/fetchFirestoreUsers';
import { fetchTweetsWithUsersData } from '../lib/fetchFirestoreTweets';
import { useAuth } from '../contexts/AuthContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function HomePage() {
  const [tweetsList, setTweetsList] = useState([]);
  const [postingFetching, setPostingFetching] = useState(false);
  const {myTweets, currentUser, searchType, searchInput} = useAuth();

  useEffect(() => {
    tweetsFetch()
  }, []);

  const tweetsFetch = async () => {
    showSpinner();
    await fetchUsers();
    const tweetsArray = await fetchTweetsWithUsersData(res => setTweetsList(res));
    hideSpinner(tweetsArray);
    listenForChanges();
  }
   
  const listenForChanges = () => {
    onSnapshot(collection(db, "tweets"), () => {
      fetchTweetsWithUsersData(res => setTweetsList(res))
    })
  }

  useEffect(() => {
    if(searchInput) {
      switch (searchType){
        case "tweets":
          const tweetsSearchList = [];
          for(let object of tweetsList) {
            if(object.content.indexOf(searchInput)!=-1){
              tweetsSearchList.push(object)
            }
          };
          setTweetsList(tweetsSearchList);  
          break       
        case "users":
          const usersSearchList = [];
          for(let object of tweetsList) {
            if(object.userDisplayName.indexOf(searchInput)!=-1){
              usersSearchList.push(object)
            }
          };
          setTweetsList(usersSearchList); 
          break
        default:
          tweetsFetch();
          break
      }
    }
  }, [searchType])

  useEffect(() => {
      if(myTweets) {
        const tweetsFilteredList = tweetsList.filter(tweet => tweet.userUid === currentUser.uid);
        setTweetsList(tweetsFilteredList);
      }
      else {tweetsFetch()}
  }, [myTweets])
  

  const addNewTweet = (newTweet) => {
    setTweetsList([newTweet, ...tweetsList]);
    postTweet(newTweet);
  };

  const postTweet = async (newTweet) => {
    showSpinner();
    await firestorePost("tweets", newTweet);
    hideSpinner()
  }

  const showSpinner = () => {setPostingFetching(true)}
  const hideSpinner = () => {setPostingFetching(false)}

    return (
    <div >
        <CreateTweetsContext.Provider value={{addNewTweet, postingFetching}}>
          <CreateTweet />
        </CreateTweetsContext.Provider>
        {postingFetching &&     
        <Spinner variant="light" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>}
        {!postingFetching &&
        <TweetsContext.Provider value={{tweetsList, setTweetsList}}>
          <TweetListContainer />
        </TweetsContext.Provider>
        }
    </div>
  )
}

export default HomePage