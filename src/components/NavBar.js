import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import SearchComponent from './SearchComponent';
import { linkStyle } from '../lib/resusableStyles';

function NavBar() {
  const { currentUser, logout, myTweets, setMyTweets } = useAuth()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch {
      console.error("Failed to log out")
    }
  }

  const navLinkStyle = linkStyle + " m-2"

  return (
    <Navbar bg={myTweets ? "dark" : "secondary"} variant={myTweets ? "dark" : "secondary"} className='w-100 rounded-bottom mb-4 '>
      <Container >
        <Nav className='d-flex w-100 justify-content-between align-items-center'>
          <Nav>
            <Link className={navLinkStyle} to="/" >Home</Link>
            <Link className={navLinkStyle} to="profile">My Profile</Link>
          </Nav>
          <Nav>
            {currentUser && <Button className='text-nowrap me-1' onClick={() => setMyTweets(!myTweets)} variant={myTweets ? "secondary" : "light" }>{myTweets ? "All Tweets" : "My Tweets" }</Button>}
            {currentUser && <SearchComponent />}
          </Nav>
          <Nav>
          {currentUser ? (
            <Link className={navLinkStyle} onClick={handleLogout}>Logout</Link>
          ) : (
            <Link className={navLinkStyle} to="/login">Login</Link>
          )}
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar