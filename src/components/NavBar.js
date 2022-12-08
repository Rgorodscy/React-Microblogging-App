import React from 'react'
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../lib/AuthContext'

function NavBar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch {
      console.error("Failed to log out")
    }
  }

  const navLinkStyle = "text-decoration-none text-light m-2"

  return (
    <Navbar bg="secondary" variant="secondary" className='w-75 rounded mb-4'>
      <Container >
        <Nav className='d-flex w-100 justify-content-between'>
          <Nav>
            <Link className={navLinkStyle} to="/">Home</Link>
            <Link className={navLinkStyle} to="profile">Profile</Link>
          </Nav>
          <Nav>
            {currentUser && <Image src={currentUser.photoURL} className="user-image"/>}
            {currentUser && <div className={navLinkStyle}>{currentUser.displayName ? currentUser.displayName : currentUser.email}</div>}
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