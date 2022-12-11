import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CreateTweetsContext from '../contexts/CreateTweetsContext';
import { useAuth } from '../contexts/AuthContext'
import { inputAreaStyle } from '../lib/resusableStyles'

function CreateTweet() {
    const {addNewTweet, postingFetching} = useContext(CreateTweetsContext) 
    const [tweetInput, setTweetInput] = useState("");
    const currentUser = useAuth();
    
    const onSubmit = (e) => {
        if(!postingFetching){
            e.preventDefault();
            const createdDate = `${new Date().toISOString()}`;
            const tweet = {
                content: tweetInput, 
                userDisplayName: currentUser.currentUser.displayName, 
                date: createdDate, 
                userUid: currentUser.currentUser.uid,
                userEmail: currentUser.currentUser.email
            };
            addNewTweet(tweet);
            setTweetInput('');
        }
    }
  
    const textAreaStyle = {
        ...inputAreaStyle,
        width: '30rem'
    }
  
    const placeholderStyle = {
        color: "#15202B"
    }

    const maxCharacReached = tweetInput.length > 140 ? true : false;

    return (
    <div className='d-flex flex-column border border-secondary border-2 rounded m-1 p-1'>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control 
                style={textAreaStyle} 
                as="textarea" 
                rows={3} 
                onChange={(e) => setTweetInput(e.target.value)} 
                placeholder='What do you have in mind...'
                value={tweetInput} />
            </Form.Group>
            <div className='d-flex justify-content-between'>
                {maxCharacReached && <Alert className='p-1 m-1' key='danger' variant='danger'>The Tweet can't contain more than 140 chars.</Alert>}
                <div style={placeholderStyle}>|</div>
                <Button disabled={!tweetInput || maxCharacReached} variant="primary" type="submit" className='p-1 m-1'>Tweet</Button>
            </div>
        </Form>
    </div>
  )
}

export default CreateTweet