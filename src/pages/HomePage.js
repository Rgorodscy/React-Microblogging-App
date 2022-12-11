import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import CreateTweet from '../components/CreateTweet'
import TweetListContainer from '../components/TweetListContainer';
import TweetsContext from '../contexts/TweetsContext';
import CreateTweetsContext from '../contexts/CreateTweetsContext';
import { firestorePost } from '../lib/FirestorePost'
import { fetchUsers } from '../lib/fetchFirestoreUsers';
import { fetchTweetsWithUsersData } from '../lib/fetchFirestoreTweets';

function HomePage() {
  const [tweetsList, setTweetsList] = useState([]);
  const [postingFetching, setPostingFetching] = useState(false);

  useEffect(() => {
    tweetsFetch()
  }, []);

  const tweetsFetch = async () => {
    showSpinner();
    await fetchUsers();
    const tweetsArray = await fetchTweetsWithUsersData(res => setTweetsList(res))
    hideSpinner(tweetsArray);
    fetchTweetsTimer();
  }

  const fetchTweetsTimer = () => {
    setInterval(() => {
      fetchTweetsWithUsersData(res => setTweetsList(res))
    }, 120000);
  }
    
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