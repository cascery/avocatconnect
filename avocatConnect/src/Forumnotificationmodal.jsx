/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const ForumNotificationModal = ({ isOpen, onClose }) => {
    

    const [forumLawyers, setForumLawyers] = useState([]);
                const userID = sessionStorage.getItem('userID');

    useEffect(() => {
        const fetchForumAndComments = async () => {
            try {
                if (!userID) return;
    
                const formData = new FormData();
                formData.append('userID', userID);
    
                const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/getcommentNotification.php', {
                    method: 'POST',
                    body: formData
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                console.log('Forum Lawyers Data:', data.notifications);  
                setForumLawyers(data.notifications);
                console.log('Forum Lawyers Data:', forumLawyers);
              
                // Now you can update your React state with the fetched data
                // For example, you can setState or use Redux to manage state
            } catch (error) {
                console.error('Error fetching forum and comments:', error);
            }
        };
    
        fetchForumAndComments();
    }, [userID]);
    

  return (
    <>
      {/* Tailwind CSS link */}
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />

      {/* Modal */}
      {isOpen && (
        <modal>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              {/* Modal panel */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/* Notification Button */}
                  <div className="py-8" style={{minHeight:"300px"}}>
                 
                  </div>

                  {/* Notification Content */}
                  <div className="w-full h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                    <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
                      <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0"style={{width:"100%"}}>
                        <div className="flex items-center justify-between" style={{width:"100%"}}>
                          <p tabIndex="0" className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">
                            Notifications
                          </p>
                          <button role="button" aria-label="close modal" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer" onClick={onClose}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6L6 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M6 6L18 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>

                      {/* Notification Items */}
                     
                       {/* Notification Items */}
                       {forumLawyers.map((item, index) => (
                                                <div key={index} className="w-full p-3 mt-8 bg-white rounded flex">
                                                    {/* Heart Icon */}
                                                    <div tabIndex="0" aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-white-200 flex items-center justify-center">
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                    </div>
                                                    <div className="pl-3">
                                                        <p tabIndex="0" className="focus:outline-none text-sm leading-none">
                                                            <span className="text-indigo-700">{item.lawyerInfo.name} {item.lawyerInfo.lastname}</span> answered your question under
                                                            
                                                            
                                                             <span className="text-indigo-700"> <a href={`/feed/${item.forumID}`}> this forum</a>  </span>
                                                        </p>
                                                        <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">{item.lawyerInfo.creationDate}</p>
                                                    </div>
                                                </div>
                                            ))}
                        {/* Other Notification Items */}
                        {/* ... */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </modal>
      )}
    </>
  );
};

export default ForumNotificationModal;
