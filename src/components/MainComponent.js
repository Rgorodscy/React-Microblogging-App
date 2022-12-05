import HomePage from '../pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from '../pages/ProfilePage';
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import localforage from "localforage";

function MainComponent() {
    const [userProfile, setUserProfile] = useState("");

  const fetchUser = async (key, callback) => {
    const res = await localforage.getItem(key);
    callback(res);
  }

  useEffect(() => {
    fetchUser("profileKey", (res) => setUserProfile(res));
  }, []);
  
    return (
    <>
        <NavBar />
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage userProfile={userProfile} />} />
            <Route path="/profile" element={<ProfilePage userProfile={userProfile} />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default MainComponent