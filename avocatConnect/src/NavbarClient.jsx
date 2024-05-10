/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbarClient.css';
import logo from './—Pngtree—law scales of justice icon_7715744.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import  {  useEffect } from 'react';
import placeholderImage from './images.png';


function NavbarClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const [clientInfo, setClientInfo] = useState(null);

  useEffect(() => {
    const fetchClientInfo = async () => {
      const clientId = sessionStorage.getItem('clientId');
      if (!clientId) return;

      const formData = new FormData();
      formData.append('clientId', clientId);

      try {
        const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/navbarclient.php', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setClientInfo(data.clientInfo);
          console.log(data)
        } else {
          console.error('Failed to fetch client information:', data.error);
        }
      } catch (error) {
        console.error('Error occurred while fetching client information:', error);
      }
    };

    fetchClientInfo();
  }, []);

  

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav>
      <div className="app-container">
        <div className="app-header">
          <div className="app-header-left">
            <span className="app-icon"></span>
            <div  onClick={() => window.location.href = '/feed'}>
            <img className='logo' src={logo} alt="" />
            </div>
            <div className="search-wrapper">
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-search" viewBox="0 0 24 24">
                  <defs></defs>
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="app-header-right">
            <button className="add-btn" title="Add New Project" 
            
            onClick={() => window.location.href = '/managefiles'}
            >
            <div className="tooltip">add a document</div>   
   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier"> 
    <path opacity="0.4" d="M6 12H18" stroke="green" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M12 18V6" stroke="#679186" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  </g>
</svg>
            </button>
            <button className="notification-btn">
            <div className=" tooltip">checkout notification</div> 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  className="feather feather-bell">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button className="profile-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="tooltip">add a document</div> 
            <img 
    src={clientInfo && clientInfo.profilePic ? `data:${clientInfo.profilePic}` : placeholderImage}
    alt={clientInfo ? `${clientInfo.name} ${clientInfo.lastname}` : "name"} 
/>
              <span> {clientInfo ? `${clientInfo.name} ${clientInfo.lastname}` : 'Loading...'}</span>
            </button>
            {showProfileMenu && (
              <div className="profile-menu">
                <ul>
                  <li onClick={() => window.location.href = '/editprofilecli'}>
                  <div className="menu-item">
        <span>        <FontAwesomeIcon icon={faEdit} className="lolool" />
Edit Information</span>
      </div></li>

                  <li> <div className="menu-item">
        <FontAwesomeIcon icon={faSignOutAlt} className="lolool" />
        <span>Log Out</span>
      </div></li>
                  
                </ul>
              </div>
            )}
          </div>
          <button className="messages-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarClient;
