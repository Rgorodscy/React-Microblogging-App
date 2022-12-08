import React, { useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { useNavigate } from 'react-router-dom';
import SignUpLoginForm from '../components/SignUpLoginForm';

function SignUp() {
  const { signUp, googleLogin } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const navigate = useNavigate();

  async function handleSubmit(email, password) {
    try{
        setError("");
        setLoading(true);
        await signUp(email, password);
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
        <SignUpLoginForm 
        typeSignUp={true} 
        handleSubmit={handleSubmit} 
        handleGoogleLogin={handleGoogleLogin} 
        error={error} 
        setError={setError} 
        loading={loading}/>
    </>
  )
}

export default SignUp