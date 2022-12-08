import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' 
import { useAuth } from '../lib/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { CardTextStyle, spacingStyle, inputAreaStyle } from '../lib/resusableStyles'


function SignUp() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp, googleLogin } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
    }

    try{
        setError("");
        setLoading(true);
        await signUp(userNameRef.current.value, emailRef.current.value, passwordRef.current.value);
        navigate("/");

    } catch {
        setError("Failed to create an account")
    }
    setLoading(false)

  }

  
  async function handleGoogleLogin(e) {
    googleLogin();
  }

    return (
    <>
        <Card bg="secondary" variant="secondary" className={CardTextStyle}>
            <Card.Body>
                <h2 className='text-center mb-2'>Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                <Form onSubmit={handleSubmit}>
                <Form.Group id='email' className={spacingStyle}>
                        <Form.Label >Name</Form.Label>
                        <Form.Control type='text' placeholder='Name' ref={userNameRef} style={inputAreaStyle}/>
                    </Form.Group>
                    <Form.Group id='email' className={spacingStyle}>
                        <Form.Label >Email</Form.Label>
                        <Form.Control type='email'  placeholder='Email' required ref={emailRef} style={inputAreaStyle}/>
                    </Form.Group>
                    <Form.Group id='password' className={spacingStyle}>
                        <Form.Label >Password</Form.Label>
                        <Form.Control type='password' placeholder='Password (min 6 digits)' required ref={passwordRef} style={inputAreaStyle}/>
                    </Form.Group>
                    <Form.Group id='password-confirm' className={spacingStyle}>
                        <Form.Label >Password Confirmation</Form.Label>
                        <Form.Control type='password' placeholder='Confirm your password' required ref={passwordConfirmRef} style={inputAreaStyle}/>
                    </Form.Group>
                    <Button variant="light"  disabled={loading} className={spacingStyle} type='submit'>Sign Up</Button>
                </Form>
                <Button onClick={handleGoogleLogin} className={spacingStyle}>Sign Up with Google</Button>
            </Card.Body>
        <div className='w-100'>
            Already have an account? <Link to="/login" className='text-decoration-none text-dark'>Login</Link>
        </div>
        </Card>
    </>
  )
}



export default SignUp