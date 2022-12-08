import React, { useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { useNavigate } from 'react-router-dom';
import SignUpLoginForm from '../components/SignUpLoginForm';

function Login() {
  const { login, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(email, password) {
    try{
        setError("");
        setLoading(true)
        await login(email, password);
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
        <SignUpLoginForm 
        typeSignUp={false} 
        handleSubmit={handleSubmit} 
        handleGoogleLogin={handleGoogleLogin} 
        error={error} 
        loading={loading}/>
    </>
  )
}

export default Login