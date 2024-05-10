/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "./EditProfile.css";

function EditProfileClient() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [state, setState] = useState('');
    const [wilaya, setWilaya] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleProfileUpdate = () => {
        const formData = new FormData();
        formData.append('clientId', sessionStorage.getItem('clientId'));
        formData.append('name', name.trim());
        formData.append('lastName', lastName.trim());
        formData.append('username', username.trim());
        formData.append('state', state.trim());
        formData.append('wilaya', wilaya.trim());
    
        // Check if profileImage exists before appending
        if (profileImage) {
            formData.append('profilePic', profileImage);
        }
    
        fetch('http://localhost/avocatConnect/avocatConnect/src/editprofilecli.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setSuccessMessage(data.message);
            } else {
                setErrorMessage(data.error);
            }
        })
        .catch(error => {
            setErrorMessage('An error occurred while updating the profile.');
            console.error('Error:', error);
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        document.getElementById('getval').click();
    };

    return (
        <div className="sttngs">
            <h2>SETTINGS</h2>
            <div className="tabordion">
                <section id="section1">
                    <input className="t" type="radio" name="sections" id="option1" checked />
                    <label htmlFor="option1" className="trr"> Account</label>
                    <article>
                        <div className="frm">
                            <div id='profile-upload'>
                                <div className="hvr-profile-img" onClick={handleUploadClick}>
                                    {profileImage && (
                                        <img src={profileImage} alt="Profile" />
                                    )}
                                    <div className="icon">
                                        <div className="camera4"><span></span></div>
                                    </div>
                                </div>
                                <input type="file" name="logo" id="getval" className="upload" style={{ display: 'none' }} onChange={handleImageChange} />
                            </div>
                            <div className="tr">
                                <label className="label" htmlFor="name">NAME</label>
                                <input className="input" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                <label className="label" htmlFor="lastName">LAST NAME</label>
                                <input className="input" type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <label className="label" htmlFor="username">USERNAME</label>
                                <input className="input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label className="label" htmlFor="state">STATE</label>
                                <input className="input" type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                                <label className="label" htmlFor="wilaya">WILAYA</label>
                                <input className="input" type="text" id="wilaya" value={wilaya} onChange={(e) => setWilaya(e.target.value)} />
                            </div>
                            <br />
                            <button onClick={handleProfileUpdate}>Update profile</button>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            {successMessage && <p className="success-message">{successMessage}</p>}
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
}

export default EditProfileClient;
