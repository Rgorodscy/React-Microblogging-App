import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../contexts/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SearchComponent() {
  const {myTweets, searchInput, setSearchInput, setSearchType} = useAuth();
  const [searchMade, setSearchMade] = useState(false);


  const tweetSearch = () => {
    setSearchType("tweets");
    setSearchMade(true);
  }

  const userSearch = () => {
    setSearchType("users");
    setSearchMade(true);
  }

  const clearSearch = () => {
    setSearchType("");
    setSearchMade(false);
  }

    return (
    <InputGroup>
        <Button disabled={!searchMade} onClick={clearSearch} variant={myTweets ? "outline-light" : "outline-dark"}>Show All</Button>
        <Form.Control 
        value={searchInput}
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
        />
        <DropdownButton
          variant={myTweets ? "outline-light" : "outline-dark"}
          title="Search"
          id="input-group-dropdown-1"
          align="end"
          disabled={!searchInput || searchMade}
        >
          <Dropdown.Item onClick={tweetSearch}>Tweets</Dropdown.Item>
          <Dropdown.Item onClick={userSearch}>Users</Dropdown.Item>
        </DropdownButton>
    </InputGroup>
  )
}

export default SearchComponent