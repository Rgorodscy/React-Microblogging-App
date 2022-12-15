import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useAuth } from '../contexts/AuthContext';
import { BsLightningFill, BsLightning } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { linkStyle } from '../lib/resusableStyles';

function TweetItem({tweetItem}) {
  const date = new Date(tweetItem.date).toLocaleString('en-GB');
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

  const profilePageLink = `/profile:${tweetItem.userDocumentId}`

  return (
    <Card
          bg={myTweets ? 'dark' :'secondary'}
          key={tweetItem.tweetDocumentId}
          text='light'
          className="my-2 w-100"
        >
          <CardHeader className='d-flex flex-row justify-content-between'>
            <Link to={profilePageLink} className={linkStyle}>
              <p>{tweetItem.userDisplayName ? tweetItem.userDisplayName : tweetItem.userEmail}</p>
            </Link>
            <p>{date}</p>
          </CardHeader>
          <Card.Body>
            <div className='d-flex justify-content-between align-items-center'>
                <Card.Text className='text-start text-break'>{tweetItem.content}</Card.Text>
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