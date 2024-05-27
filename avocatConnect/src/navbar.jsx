/* eslint-disable no-unused-vars */

import React, { useState,useEffect } from 'react';
import emptypfp from './images.png'

import { Link } from 'react-router-dom';
import './navbar.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchResults from './SearchResults'; 
import { FaHome, FaEnvelope, FaUsers, FaFolder, FaArchive, FaQuestionCircle, FaCog } from 'react-icons/fa';
function Navbar() {

  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    fetchProfilePic();
  }, []);

  const fetchProfilePic = () => {
    const lawyerId = sessionStorage.getItem('lawyerId');
    console.log("this is it ",lawyerId); // Retrieve session ID from session storage

    const formData = new FormData();
    formData.append('lawyerId', lawyerId); // Add session ID to FormData

    fetch('http://localhost/avocatConnect/avocatConnect/src/navbar.php', {
      method: 'POST', // Adjust method as needed
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.profilePic) {
          setProfilePic(data.profilePic); // Set profile picture state
        } else {
          console.error('Profile picture not found:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching profile picture:', error);
      }); };

console.log("doess it work:",profilePic);

const handleLogout = () => {
  // Clear session
  sessionStorage.clear();
  // Navigate to main page
  window.location.href = '/mainpage'  };
  return (
 
    <nav className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <a href="feed" className="navbar__link"><FaHome className="navbar__icon" /><span>feed</span></a>
        </li>
        <li className="navbar__item">
          <a href="/requests" className="navbar__link"><FaEnvelope  className="navbar__icon"/><span>requests</span></a>        
        </li>
        <li className="navbar__item">
  <a href="/profile" className="navbar__link">  
    <img style={{height:"80%"}}
     src={`data:${profilePic}`} 
      alt={emptypfp}
    />
    <span>Profile</span>
  </a>        
</li>

      
        <li className="navbar__item">
          <a href="/reunions" className="navbar__link"><FaArchive className="navbar__icon" /><span>reunions</span></a>        
        </li>
        <li className="navbar__item">
          <a href="#" className="navbar__link"><FaQuestionCircle className="navbar__icon" /><span>Help</span></a>        
        </li>
        <li className="navbar__item">
          <a  onClick={handleLogout} href="#" className="navbar__link"><FaCog className="navbar__icon" / ><span>log out </span></a>        
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;