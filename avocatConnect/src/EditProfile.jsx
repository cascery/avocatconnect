/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import "./EditProfile.css"

function EditProfile() {
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
        formData.append('userId', sessionStorage.getItem('lawyerId'));
        formData.append('name', name);
        formData.append('lastName', lastName);
        formData.append('username', username);
        formData.append('state', state);
        formData.append('wilaya', wilaya);
        formData.append('ProfilPic', profileImage);


        if (name.trim() !== '') formData.append('name', name.trim());
        if (lastName.trim() !== '') formData.append('lastName', lastName.trim());
        if (username.trim() !== '') formData.append('username', username.trim());
        if (wilaya.trim() !== '') formData.append('wilaya', wilaya.trim());
        if (profileImage.trim() !== '') formData.append('profilePic', profileImage.trim());


        if (formData.has('name') || formData.has('lastName') || formData.has('username') || formData.has('state') || formData.has('wilaya')||formData.has('profilePic')) {
            fetch('http://localhost/avocatConnect/avocatConnect/src/editprofile.php', {
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
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(null); // Clear existing profile image
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
                <section id="section2">
                    <input className="t" type="radio" name="sections" id="option2" />
                    <label htmlFor="option2" className="trr"> Email</label>
                    <article>
                        <div className="tr wwq">
                            <label className="label" htmlFor="input">Current email</label>
                            <input className="input e" type="text" id="input" />
                            <label className="label" htmlFor="input">New email</label>
                            <input className="input e" type="email" id="input" />
                            <label className="label" htmlFor="input">confirm password</label>
                            <input className="input e" type="password" id="input" />
                        </div>
                        <button>Update Email</button>
                    </article>
                </section>
                <section id="section3">
                    <input className="t" type="radio" name="sections" id="option3" />
                    <label htmlFor="option3" className="trr">Password</label>
                    <article>
                        <div className="tr wwq">
                            <label className="label" htmlFor="input">current Password</label>
                            <input className="input e" type="password" id="input" />
                            <label className="label" htmlFor="input">new password</label>
                            <input className="input e" type="password" id="input" />
                            <label className="label" htmlFor="input">repeat password</label>
                            <input className="input e" type="password" id="input" />
                        </div>
                        <button>Change Password</button>
                    </article>
                </section>
                <section id="section4">
                    <input className="t" type="radio" name="sections" id="option4" />
                    <label htmlFor="option4" className="trr">Verify</label>
                    <article>
                        <p>The green verified badge <span className="ver">&#10026;</span> on ZIki lets people know that an account is authentic.</p>
                    </article>
                </section>
            </div>
        </div>
    );
}

export default EditProfile;
