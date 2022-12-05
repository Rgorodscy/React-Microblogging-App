import React, { useState, useEffect } from 'react'
import CreateTweet from '../components/CreateTweet'
import TweetListContainer from '../components/TweetListContainer';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import localforage from "localforage";


function HomePage({userProfile}) {
  const [tweetsList, setTweetsList] = useState([]);

  const addNewTweet = (newTweet) => {
    setTweetsList([newTweet, ...tweetsList]);
    postTweet(newTweet);
  };

  const fetchTweets = async (callback) => {
    try {
        const res = await axios.get("https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet");
        const descListArray = [...res.data.tweets].sort((a, b) => b.date - a.date)
        callback(descListArray);
    }
    catch{((error) => console.log(error))}
  }

  useEffect(() => {
    fetchTweets(res => setTweetsList(res));
  }, []);

  let posting = false

  const postTweet = async (newTweet) => {
    posting = true
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

  const hideSpinner = () => {posting = false}

    return (
    <div >
        <CreateTweet addNewTweet={addNewTweet} posting={posting} userProfile={userProfile} />
        {posting &&     
        <Spinner variant="light" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>}
        <TweetListContainer tweetsList={tweetsList} />
    </div>
  )
}

export default HomePage