import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, orderBy, query  } from "firebase/firestore"; 
import Spinner from 'react-bootstrap/Spinner';
import CreateTweet from '../components/CreateTweet'
import TweetListContainer from '../components/TweetListContainer';
import TweetsContext from '../lib/TweetsContext';
import CreateTweetsContext from '../lib/CreateTweetsContext';
import { db } from '../firebase'
import { firestorePost } from '../lib/FirestorePost'

function HomePage() {
  const [tweetsList, setTweetsList] = useState([]);
  const [postingFetching, setPostingFetching] = useState(false);
  const tweetsRef = collection(db, "tweets");
  
  const addNewTweet = (newTweet) => {
    setTweetsList([newTweet, ...tweetsList]);
    postTweet(newTweet);
  };

  const fetchTweets = async (callback) => {
    showSpinner();
    const docsArray = [];
    const docsResponse = await getDocs(query(tweetsRef, orderBy("date", "desc")));
    docsResponse.forEach(doc => docsArray.push(doc.data()));
    callback(docsArray);
    hideSpinner(docsResponse);
  }

  useEffect(() => {
    fetchTweets(res => setTweetsList(res));
    fetchTweetsTimer();
  }, []);

  const fetchTweetsTimer = () => {
    setInterval(() => {
      fetchTweets(res => setTweetsList(res))
    }, 120000);
  }

  const postTweet = async (newTweet) => {
    showSpinner();
    await firestorePost(newTweet);
  }
  
  const firestorePost = async (newTweet) => {
    try {
      const docRef = await addDoc(collection(db, "tweets"), newTweet);
      hideSpinner(docRef)
    } catch (e) {
      console.error("Error adding to database: ", e);
    }
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