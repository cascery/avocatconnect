/* eslint-disable no-unused-vars */

import React, { useState,useEffect } from 'react';
import emptypfp from './images.png'
import Modal from 'react-modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
  return (
 
    <nav className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <a href="/feed" className="navbar__link"><FaHome className="navbar__icon" /><span>feed</span></a>
        </li>
        <li className="navbar__item">
          <a href="/requests" className="navbar__link"><FaEnvelope  className="navbar__icon"/><span>requests</span></a>        
        </li>
        <li className="navbar__item">
  <a href="/profile" className="navbar__link">  
  {profilePic ? (
  <img
    style={{ height: "80%" }}
    src={profilePic}
    alt={emptypfp}
  />
) : (
  <img
  style={{ height: "80%" }}
  src={emptypfp}
/>
)}
    <span>Profile</span>
  </a>        
</li>

      
        <li className="navbar__item">
          <a href="/reunions" className="navbar__link"><FaArchive className="navbar__icon" /><span>reunions</span></a>        
        </li>
        
        <li className="navbar__item">
          <a  onClick={ toggleModal} href="#" className="navbar__link"><FaCog className="navbar__icon" / ><span>log out </span></a>        
        </li>
      </ul>
      <Modal className="modal"   isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}  class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                 <React.Fragment >
                 <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
                
                 <div className="p-4 md:p-5 text-center " style={{width:"300px",height:"200px"}}>
    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
    <h3 className="mb-5 text-lg font-normal text-black-500 dark:text-gray-400">Are you sure you want to log out?</h3>
    <button  onClick={handleLogout}  data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
        Yes, Im sure
    </button>
    <button  onClick={toggleModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-black-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
</div>

           </React.Fragment>
           </Modal>
    </nav>
  );
}

export default Navbar;