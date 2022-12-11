import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import { AuthProvider } from '../contexts/AuthContext';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';


function MainComponent() {
  
    return (
    <>
        <BrowserRouter>
           <AuthProvider>
              <NavBar />
              <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route exact path="/" element={
                  <PrivateRoute >
                    <HomePage  />
                  </PrivateRoute> 
                    }
                ></Route>
                <Route exact path="/profile" element={
                  <PrivateRoute >
                    <ProfilePage  />
                  </PrivateRoute> 
                    }
                ></Route>  
              </Routes>

           </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default MainComponent