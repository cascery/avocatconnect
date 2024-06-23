
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import emptypfp from './images.png'
import './lawyerprofile.css'
import Announcements from './announcements';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from 'react-modal';
import PostAnn from './PostAnn';

const SelfProfileLawyer = () => {
  const [showModal, setShowModal] = useState(false);
  const handleAcceptRequest = () => {
    setShowModal(true);
};
    const [profileData, setProfileData] = useState(null);
    useEffect(() => {
        fetchProfileData();
    }, []);
    const fetchProfileData = () => {
        const userId = sessionStorage.getItem('lawyerId');
        console.log("this is the id :",userId);
        if (!userId) {
            console.error('User ID not found in session storage');
            return;
        }
        const formData = new FormData();
        formData.append('lawyerId', userId); 
        fetch('https://avocatconnect.000webhostapp.com/selfprofilelawyer.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setProfileData(data.data);
            } else {
                console.error('Error fetching profile data:', data.error);
            }
        })
        .catch(error => console.error('Error fetching profile data:', error));
    };
    console.log(profileData)

    const handleNavigation = () => {
      // Use the browser's history object to push a new entry
      window.location.href = '/editprofile';
  };

  const handlepost = () => {
    setShowModal(true);
};
    return (<div> {profileData ? (
      
      <div className="card">
       
  <div className="card__header">
    <div className="card__profile">
    {profileData.profilePic ? (
  <img
    src={profileData.profilePic}
    alt={emptypfp}
  />
) : (
  <img
  src={emptypfp}
/>
)}

    </div>
    <div className="card__name">
      <h2>{profileData.name}  {profileData.lastname} <h5>{profileData.speciality}</h5></h2>
     
      <div className="card__handle">
        <span className="handle">@{profileData.username}</span>
   
      </div>
    </div>
    <div className="card__button">
      <button onClick={handleNavigation}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-edit"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          ></path>
        </svg>
        <span>Edit</span>
      </button>
      <button onClick={handlepost}>
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#fff"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M13 2L13 9"></path>
  <path d="M6.5 2.5a2.121 2.121 0 0 1 3 3L6 15l-4 1 1-4 9.5-9.5z"></path>
  <path d="M20 6L18 8 8 18 6 22 2 22 2 18z"></path>
</svg>

        <span>post </span>
      </button>
    </div>
    <div className='cardinforma'>


 <h6> <i className="fas fa-graduation-cap"></i> phone:{profileData.phone}.</h6> 
 <h6> <i className="fas fa-map-marker-alt"></i> wilaya:{profileData.wilaya}.</h6> 
 <h6> <i className="fas fa-circle green"></i> email :{profileData.email}</h6> 

   </div>
   
  </div> 

  <hr className="border" />
  <div className="card__insights">
    <div className="card__heading">
      <div className="heading">announcements</div>
    </div>
 <Announcements userId={sessionStorage.getItem('lawyerId')}/>
    
 <Modal className='custom-modal '  style={{
  
    overlay: {
      overflowY: 'auto', // Enable vertical scrolling on overlay
    },
    content: {
      overflowY: 'auto', // Enable vertical scrolling within the modal content
      maxHeight: '80%', // Set maximum height for the modal content
    },
  }} className="modal" isOpen={showModal} onRequestClose={() => setShowModal(false)}>
              
<PostAnn/>


            </Modal> 
  </div>
   
</div>

) : (
    <p>Loading profile data...</p>
)} </div>    
    );
};
export default SelfProfileLawyer;
