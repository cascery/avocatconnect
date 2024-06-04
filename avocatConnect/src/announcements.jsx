/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Announcements = ({ userId }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [showDropdowns, setShowDropdowns] = useState([]); // State to manage dropdown visibility for each announcement
    const userType = sessionStorage.getItem('userType');

    useEffect(() => {
        fetchAnnouncements();
    }, [userId]);

    useEffect(() => {
        // Initialize dropdown visibility for each announcement to false
        setShowDropdowns(new Array(announcements.length).fill(false));
    }, [announcements]);

    const fetchAnnouncements = () => {
        if (!userId) {
            console.error('User ID not provided');
            return;
        }
        const formData = new FormData();
        formData.append('userId', userId);
        fetch('http://localhost/avocatConnect/avocatConnect/src/announcements.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setAnnouncements(data.announcements);
            } else {
                console.error('Error fetching announcements:', data.error);
            }
        })
        .catch(error => console.error('Error fetching announcements:', error));
    };

    const toggleDropdown = (index) => {
        // Toggle dropdown visibility for the announcement at the specified index
        const newShowDropdowns = [...showDropdowns];
        newShowDropdowns[index] = !newShowDropdowns[index];
        setShowDropdowns(newShowDropdowns);
    };




    const deleteAnnouncement = (announcementID) => {
        const formData = new FormData();
        formData.append('announcementID', announcementID);
        fetch('http://localhost/avocatConnect/avocatConnect/src/delete_announcement.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If deletion is successful, fetch announcements again to update the list
                fetchAnnouncements();
            } else {
                console.error('Error deleting announcement:', data.error);
            }
        })
        .catch(error => console.error('Error deleting announcement:', error));
    };
    

    

    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
            <div className="insights">
                {announcements.map((announcement, index) => (
                    <div className="insight" key={announcement.announceID}>
                        {userType === 'lawyer' && (
                            <button 
                                id={`dropdownMenuIconButton_${index}`} 
                                data-dropdown-toggle={`dropdownDots_${index}`} 
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 #faf7f5 rounded-lg hover: #faf7f5 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                                type="button"
                                onClick={() => toggleDropdown(index)} // Toggle dropdown visibility for the announcement at this index
                            >
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>
                            </button>
                        )}
                        
                        {/* Dropdown menu */}
                        {showDropdowns[index] && (
                            <div className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownMenuIconButton_${index}`}>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => deleteAnnouncement(announcement.announceID)}>delete</a>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className="heading">{announcement.title}</div>
                        <div className="number">
                            {announcement.description}
                            <div className="info" style={{ bottom: 0, left: 0 }}>{announcement.publication_date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

Announcements.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Announcements;
