import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useAuth } from '../contexts/AuthContext';
import { BsLightningFill, BsLightning } from "react-icons/bs";
import { Link } from 'react-router-dom';



function TweetItem({tweetItem}) {
  const date = new Date(tweetItem.date).toLocaleString('en-GB');
  const {myTweets} = useAuth();  
  const [liked, setLiked] = useState(false)


  return (
    <Card
          bg={myTweets ? 'dark' :'secondary'}
          key={tweetItem.tweetDocumentId}
          text='light'
          className="my-2 w-100"
        >
          <CardHeader className='d-flex flex-row justify-content-between'>
            <p>{tweetItem.userDisplayName ? tweetItem.userDisplayName : tweetItem.userEmail}</p>
            <p>{date}</p>
          </CardHeader>
          <Card.Body>
            <div className='d-flex justify-content-between align-items-center'>
                <Card.Text className='text-start text-break'>{tweetItem.content}</Card.Text>
               <Link onClick={() => setLiked(!liked)} className='text-light h4'>
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