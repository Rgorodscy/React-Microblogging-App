import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { inputAreaStyle, profilePicturePlaceholder } from '../lib/resusableStyles'
import { firestoreUpdate } from '../lib/FirestoreUpdate';
import { fetchUsers } from '../lib/fetchFirestoreUsers';
import Image from 'react-bootstrap/Image'

function ProfilePage({myProfile}) {
    const [userNameInput, setUserNameInput] = useState("");
    const [userImageFile, setUserImageFile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const {currentUser, updateFirebaseUserImage, userDocRef, updateFirebaseProfile, usersList, updateAuthPassword} = useAuth();
    const navigate = useNavigate();
    const inputStyle = {
        ...inputAreaStyle,
        border: "##CCC",
    }
    

    const { id } = useParams();

    const [userProfile, setuserProfile] = useState([]);

    useEffect(() => {
          initialFetch();
    }, []);
    
    const initialFetch = async () => {
        if(myProfile) {
            setUserNameInput(currentUser.displayName)
        }
        else {
            searchUserObject()
        }

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password){
            if(password !== confirmPassword) {
                alert("Passwords don't match")
            }
            else{updateAuthPassword(password)}
        }
        await updateFirebaseProfile("displayName", userNameInput);
        {userImageFile && updateFirebaseUserImage(userImageFile)};
        setUserNameInput("");
        setUserImageFile("");
        setPassword("");
        setConfirmPassword("")
        navigate("/")
    }

    const searchUserObject = async () => {
        const userId = id.slice(1);
        const userFound = await usersList.find(user => user.userDocumentId == userId);
        setuserProfile(userFound)
    }
    
    const onError = (e) => {
        ((e.target.src = profilePicturePlaceholder)
        )
      }

    return (
    <div className='d-flex justify-content-start w-50 mt-2'>
        <div className='d-flex flex-column align-items-center text-white w-100'>
            <h1 className='display-1'>Profile</h1>
            <Image height="200px" width="200px" roundedCircle={true} 
                src={myProfile ? 
                    currentUser.photoURL ? currentUser.photoURL : profilePicturePlaceholder
                    : userProfile.photoURL ? currentUser.photoURL : profilePicturePlaceholder
                } onError={onError} />
            <h2 className='display-6'>{myProfile ? currentUser.displayName : userProfile.displayName}</h2>  
            {myProfile && 
            <Form className='w-100' onSubmit={onSubmit}>
                <Form.Group className="mt-4 mb-3 w-100 d-flex flex-column align-items-start " controlId="exampleForm.ControlInput1" >
                    <Form.Label>User Name</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="User Name" className='w-100' style={inputStyle} onChange={(e) => setUserNameInput(e.target.value)} value={userNameInput} />
                    <Form.Label>User Photo</Form.Label>
                    <Form.Control type="file" style={inputStyle} onChange={(e) => setUserImageFile(e.target.files[0])} />
                </Form.Group>
                <Form.Group className="mt-4 mb-3 w-100 d-flex flex-column align-items-start" >
                    <Form.Label>Change Password</Form.Label>
                    <Form.Control type="password" placeholder="Password (min 6 characters)" className='w-100' style={inputStyle} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    <Form.Control type="password" placeholder="Confirm Password" className='w-100 mt-2' style={inputStyle} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <div className='d-flex justify-content-end align-items-end w-100'>
                    <Button variant="primary" type="submit">Save</Button>
                </div>
            </Form>
            }
        </div>
    </div>
  )
}

export default ProfilePage