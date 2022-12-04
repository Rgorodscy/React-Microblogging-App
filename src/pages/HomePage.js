import React, { useState, useEffect } from 'react'
import CreateTweet from '../components/CreateTweet'
import TweetList from '../components/TweetList';
import localforage from "localforage";

function HomePage() {
  const [tweetsList, setTweetsList] = useState([]);
  const tweetListLocalKey = "tweetListLocalKey"

  const addNewTweet = (newTweet) => {
    setTweetsList([newTweet, ...tweetsList]);
  };

  useEffect(() => {
    localforage.setItem(tweetListLocalKey, tweetsList);
  }, [tweetsList]);

  const fetchTweets = async (key, callback) => {
    const res = await localforage.getItem(key);
    callback(res);
  }

  useEffect(() => {
    fetchTweets(tweetListLocalKey, (res) => setTweetsList(res));
  }, []);


    return (
    <div >
        <CreateTweet addNewTweet={addNewTweet} />
        <TweetList tweetsList={tweetsList} />
    </div>
  )
}

export default HomePage