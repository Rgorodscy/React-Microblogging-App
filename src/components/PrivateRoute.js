import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function PrivateRoute({ redirectPath = "/login", children, }) {
  const { currentUser  } = useAuth();
  
    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
        }
    
        return children;
  
}
