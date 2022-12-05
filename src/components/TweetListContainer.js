import React from 'react'
import uuid from 'react-uuid'
import TweetItem from './TweetItem'

function TweetListContainer({tweetsList}) {
  return (
    <div className='d-flex flex-column align-items-center h-100'>
        {tweetsList.map((tweetItem) => 
            <TweetItem key={uuid()} tweetItem={tweetItem} />
        )}
    </div>
  )
}

export default TweetListContainer