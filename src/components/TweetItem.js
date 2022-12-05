import React from 'react'
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import uuid from 'react-uuid'

function TweetItem({tweetItem}) {
  
    return (
    <Card
          bg='dark'
          key={uuid()}
          text='light'
          style={{ width: '30rem' }}
          className="my-2"
        >
          <CardHeader className='d-flex flex-row justify-content-between'>
            <p>{tweetItem.userName}</p>
            <p>{tweetItem.date}</p>
          </CardHeader>
          <Card.Body>
            <div className='d-flex justify-content-start'>
                <Card.Text className='text-start text-break'>{tweetItem.content}</Card.Text>
            </div>
          </Card.Body>
    </Card>
  )
}

export default TweetItem