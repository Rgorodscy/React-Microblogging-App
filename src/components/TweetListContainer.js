import React, { useContext } from 'react'
import uuid from 'react-uuid'
import TweetItem from './TweetItem'
import TweetsContext from '../contexts/TweetsContext'

function TweetListContainer() {
  const {tweetsList} = useContext(TweetsContext)

  return (
    <div className='d-flex flex-column align-items-center h-100'>
        {tweetsList.map((tweetItem) => 
            <TweetItem key={tweetItem.tweetDocumentId} tweetItem={tweetItem.tweetData} />
        )}
    </div>
  )  
}

export default TweetListContainer