import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { inputAreaStyle } from '../lib/resusableStyles'
import { firestoreUpdate } from '../lib/FirestoreUpdate';
import { fetchUsers } from '../lib/fetchFirestoreUsers';

function ProfilePage() {
    const [userNameInput, setUserNameInput] = useState("");
    const [userImage, setUserImage] = useState("");
    const {currentUser, updateFirebaseProfileName, updateFirebaseUserImage} = useAuth();
    const [usersArray, setUsersArray] = useState([]);
    const navigate = useNavigate()
    const inputStyle = {
        ...inputAreaStyle,
        border: "##CCC",
    }
    
    useEffect(() => {
          initialFetch();
    }, []);
    
    const initialFetch = async () => {
        fetchCurrentUser((res) => setUserNameInput(res));
        const fetchUsersResponse = await fetchUsers();
        setUsersArray(fetchUsersResponse)
    }

    const fetchCurrentUser = async (callback) => {
        const userDisplayName = currentUser.displayName ? currentUser.displayName : "";
        callback(userDisplayName);
    }

    const findUserFirestoreDocId = () => {
        const firestoreUserToupdate = usersArray.find((user) => user.userData.uid === currentUser.uid);
        const firestoreDocumentToupdate = firestoreUserToupdate.userDocumentId;
        return firestoreDocumentToupdate
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const userFirestoreDocId = await findUserFirestoreDocId();
        await updateFirebaseProfileName(userNameInput);
        {userImage && await updateFirebaseUserImage(userImage)};
        firestoreUpdate("users", userFirestoreDocId, {displayName: userNameInput})
        setUserNameInput("");
        setUserImage("");
        navigate("/")
    }

    return (
    <div className='d-flex justify-content-start w-50 mt-5'>
        <div className='d-flex flex-column align-items-start text-white w-100'>
            <h1>Profile</h1>
            <Form className='w-100' onSubmit={onSubmit}>
                <Form.Group className="mt-4 mb-3 w-100 d-flex flex-column align-items-start " controlId="exampleForm.ControlInput1" >
                    <Form.Label>User Name</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="User Name" className='w-100' style={inputStyle} onChange={(e) => setUserNameInput(e.target.value)} value={userNameInput} />
                    <Form.Label>User Photo</Form.Label>
                    <Form.Control type="file" style={inputStyle} onChange={(e) => setUserImage(e.target.files[0])} />
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