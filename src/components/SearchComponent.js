import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../contexts/AuthContext';


function SearchComponent() {
  const {myTweets, searchInput, setSearchInput, setSearchType} = useAuth();
  const [searchMade, setSearchMade] = useState(false);

    return (
    <InputGroup>
        <Form.Control 
        value={searchInput}
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button disabled={searchMade} onClick={() => {setSearchType("tweets"); setSearchMade(true)}} variant={myTweets ? "outline-light" : "outline-dark"}>Tweets</Button>
        <Button disabled={searchMade} onClick={() => {setSearchType("users"); setSearchMade(true)}} variant={myTweets ? "outline-light" : "outline-dark"}>Users</Button>
        <Button disabled={!searchMade} onClick={() => {setSearchType(""); setSearchMade(false)}} variant={myTweets ? "outline-light" : "outline-dark"}>Clear</Button>
    </InputGroup>
  )
}

export default SearchComponent