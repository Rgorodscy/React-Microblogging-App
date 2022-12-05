import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import localforage from "localforage";

function ProfilePage({userProfile}) {
    const [profileInput, setProfileInput] = useState(userProfile);
    
    const inputStyle = {
        resize: "none",
        background: "#15202B",
        border: "##CCC",
        color: "#CCC",
    }
  
    const fetchUser = async (key, callback) => {
        const res = await localforage.getItem(key);
        callback(res);
      }
    
      useEffect(() => {
        fetchUser("profileKey", (res) => setProfileInput(res));
      }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        localforage.setItem("profileKey", profileInput);
        setProfileInput("")
    }

    return (
    <div className='d-flex justify-content-start w-50 mt-5'>
        <div className='d-flex flex-column align-items-start text-white w-100'>
            <h1>Profile</h1>
            <Form className='w-100' onSubmit={onSubmit}>
            <Form.Group className="mt-4 mb-3 w-100 d-flex flex-column align-items-start " controlId="exampleForm.ControlInput1" >
            <Form.Label>User Name</Form.Label>
            <Form.Control size="lg" type="text" placeholder="User Name" className='w-100' style={inputStyle} onChange={(e) => setProfileInput(e.target.value)} value={profileInput} />
        </Form.Group>
        <div className='d-flex justify-content-end align-items-end w-100'>
            <Button variant="primary" type="submit">Save</Button>
        </div>
            </Form>
        </div>
    </div>
  )
}

export default ProfilePage