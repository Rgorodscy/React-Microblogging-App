import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' 
import { useAuth } from '../lib/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { CardTextStyle, spacingStyle, inputAreaStyle } from '../lib/resusableStyles'


function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    try{
        setError("");
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value);
        navigate("/");
    } catch {
        setError("Failed to sign in")
    }
    setLoading(false)
  }

  async function handleGoogleLogin(e) {
    googleLogin();
  }

    return (
    <>
        <Card bg="secondary" variant="secondary" className={CardTextStyle} >
            <Card.Body>
                <h2 className='text-center mb-4'>Login</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email' className={spacingStyle}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Email' required ref={emailRef} style={inputAreaStyle} />
                    </Form.Group>
                    <Form.Group id='password' className={spacingStyle}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' required ref={passwordRef} style={inputAreaStyle} />
                    </Form.Group>
                    <Button variant="light" disabled={loading} className={spacingStyle} type='submit'>Login</Button>
                </Form>
                <Button className={spacingStyle} onClick={handleGoogleLogin}>Login with Google</Button>
            </Card.Body>
            <div className='w-100'>
                Don't have an account? <Link to="/signup" className='text-decoration-none text-dark'> Sign Up</Link>
            </div>
        </Card>
    </>
  )
}



export default Login