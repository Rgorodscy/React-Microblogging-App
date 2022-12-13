import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useAuth } from '../contexts/AuthContext';
import { BsLightningFill, BsLightning } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { setDoc, doc, collection, deleteDoc } from 'firebase/firestore';


function TweetItem({tweetItem}) {
  const date = new Date(tweetItem.tweetData.date).toLocaleString('en-GB');
  const {myTweets, userDocRef, likedTweetsArray} = useAuth();  
  const [liked, setLiked] = useState(false)



  const handleLikeClick = async (e) => {
    e.preventDefault()
    if(!liked) {
      await setDoc(doc(db, "users", userDocRef, "likedTweets", tweetItem.tweetDocumentId), {
        tweetId: tweetItem.tweetDocumentId})
    }
    
    if(liked) {
      await deleteDoc(doc(db, "users", userDocRef, "likedTweets", tweetItem.tweetDocumentId))
    }
    
    setLiked(!liked);
  }

  const handleLikedTweet = () => {
    if (likedTweetsArray.find(tweet => tweet.tweetId === tweetItem.tweetDocumentId)) {
      setLiked(true)
    };
  }

  useEffect(() => {
    handleLikedTweet()
  }, [])

  return (
    <Card
          bg={myTweets ? 'dark' :'secondary'}
          key={tweetItem.tweetDocumentId}
          text='light'
          className="my-2 w-100"
        >
          <CardHeader className='d-flex flex-row justify-content-between'>
            <p>{tweetItem.tweetData.userDisplayName ? tweetItem.tweetData.userDisplayName : tweetItem.tweetData.userEmail}</p>
            <p>{date}</p>
          </CardHeader>
          <Card.Body>
            <div className='d-flex justify-content-between align-items-center'>
                <Card.Text className='text-start text-break'>{tweetItem.tweetData.content}</Card.Text>
               <Link onClick={handleLikeClick} className='text-light h4'>
                {liked? 
               <BsLightningFill /> :
               <BsLightning />
              }
               </Link>
            </div>
          </Card.Body>
    </Card>
  )
}

export default TweetItem