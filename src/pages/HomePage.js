import React, { useState, useEffect } from 'react'
import CreateTweet from '../components/CreateTweet'
import TweetListContainer from '../components/TweetListContainer';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import localforage from "localforage";
import TweetsContext from '../lib/TweetsContext';
import CreateTweetsContext from '../lib/CreateTweetsContext';


function HomePage({userProfile}) {
  const [tweetsList, setTweetsList] = useState([]);
  const [postingFetching, setPostingFetching] = useState(false)

  const addNewTweet = (newTweet) => {
    setTweetsList([newTweet, ...tweetsList]);
    postTweet(newTweet);
  };

  const fetchTweets = async (callback) => {
    showSpinner()  
    try {
      const res = await axios.get("https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet");
        const descListArray = [...res.data.tweets].sort((a, b) => b.date - a.date)
        callback(descListArray);
        hideSpinner(res);
    }
    catch{((error) => console.log(error))}
  }

  useEffect(() => {
    fetchTweets(res => setTweetsList(res));
    fetchTweetsTimer();
  }, []);

  const fetchTweetsTimer = () => {
    setInterval(() => {
      fetchTweets(res => setTweetsList(res))
    }, 30000);
  }

  const postTweet = async (newTweet) => {
    showSpinner()
    try {
        const postRes = await axios({
            method: 'post',
            url: 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',
            data: {
                content: newTweet.content, 
                userName: newTweet.userName, 
                date: newTweet.date
            }})
        hideSpinner(postRes)
    }
    catch{((error) => alert(error))}
  }

  const showSpinner = () => {setPostingFetching(true)}
  const hideSpinner = () => {setPostingFetching(false)}

    return (
    <div >
        <CreateTweetsContext.Provider value={{addNewTweet, postingFetching, userProfile}}>
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