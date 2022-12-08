import React, { useRef } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' 
import { CardTextStyle, spacingStyle, inputAreaStyle } from '../lib/resusableStyles'
import { Link } from 'react-router-dom';



function SignUpLoginForm({typeSignUp ,handleSubmit, handleGoogleLogin, error, setError, loading}) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  
  async function handleFormSubmit(e) {
    e.preventDefault();

    if(typeSignUp) {
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
    }
    handleSubmit(emailRef.current.value, passwordRef.current.value);
  }

    return (
    <Card bg="secondary" variant="secondary" className={CardTextStyle}>
    <Card.Body>
        <h2 className='text-center mb-2'>{typeSignUp ? "Sign Up" : "Login"}</h2>
        {error && <Alert variant="danger">{error}</Alert> }
        <Form onSubmit={handleFormSubmit}>
            <Form.Group id='email' className={spacingStyle}>
                <Form.Label >Email</Form.Label>
                <Form.Control type='email'  placeholder='Email' required ref={emailRef} style={inputAreaStyle}/>
            </Form.Group>
            <Form.Group id='password' className={spacingStyle}>
                <Form.Label >Password</Form.Label>
                <Form.Control type='password' placeholder={typeSignUp ? 'Password (min 6 digits)' : "Password"} required ref={passwordRef} style={inputAreaStyle}/>
            </Form.Group>
            {typeSignUp && <Form.Group id='password-confirm' className={spacingStyle}>
                <Form.Label >Password Confirmation</Form.Label>
                <Form.Control type='password' placeholder='Confirm your password' required ref={passwordConfirmRef} style={inputAreaStyle}/>
            </Form.Group>}
            <Button variant="light"  disabled={loading} className={spacingStyle} type='submit'>{typeSignUp ? "Sign Up" : "Login"}</Button>
        </Form>
        <Button onClick={handleGoogleLogin} className={spacingStyle}>{typeSignUp ? "Sign Up with Google" : "Login with Google"}</Button>
    </Card.Body>
    {typeSignUp && <div className='w-100'>
        Already have an account? <Link to="/login" className='text-decoration-none text-dark'>Login</Link>
    </div>}
    {!typeSignUp && <div className='w-100'>
                Don't have an account? <Link to="/signup" className='text-decoration-none text-dark'> Sign Up</Link>
    </div>}
</Card>
  )
}

export default SignUpLoginForm