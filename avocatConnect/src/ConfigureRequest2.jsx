/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faImage, faPortrait } from '@fortawesome/free-solid-svg-icons';
import './ConfigureRequest.scss';
import FetchDocuments from './FetchDocuments';
import emptypfp from './images.png'


import Modal from 'react-modal';

const ConfigureRequest = () => {

    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [time, setTime] = useState(''); // New state variable for time


    const { serviceRequestId } = useParams();
    console.log("this is the request id :", serviceRequestId);
    const [requestDetails, setRequestDetails] = useState(null);

    useEffect(() => {
        // Fetch request details based on the requestId from the URL
        const fetchRequestDetails = async () => {
            try {
                const formData = new FormData();
                formData.append('requestId', serviceRequestId);

                // Retrieve lawyerId from session storage
                const lawyerId = sessionStorage.getItem('lawyerId');
                if (!lawyerId) {
                    throw new Error('Lawyer ID not found in session storage');
                }
                formData.append('lawyerId', lawyerId); // Append lawyerId to the form data

                const response = await fetch('https://avocatconnect.000webhostapp.com/ConfigureRequest.php', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch request details');
                }
                const data = await response.json();
                console.log(data);
                setRequestDetails(data.userDetails);
            } catch (error) {

                console.error('Error fetching request details:', error);
            }
        };

        fetchRequestDetails();
    }, [serviceRequestId]);


    const handleAcceptRequest = () => {
        setShowModal(true);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleRefuse = async () => {
        try {
            const formData = new FormData();
            formData.append('requestId', serviceRequestId);
            formData.append('lawyerId', sessionStorage.getItem('lawyerId'));
    
            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/RefuseRequest.php', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to refuse request');
            }
            const data = await response.json();
            console.log(data);
    
            // Optionally, you can update the UI to reflect the refusal of the request
        } catch (error) {
            console.error('Error refusing request:', error);
        }

        toggleModal();
    };
    
    const handleSubmit = () => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('requestId', serviceRequestId);
        formData.append('date', date);
        formData.append('videoLink', videoLink);
        formData.append('lawyerId',sessionStorage.getItem('lawyerId'));
        formData.append('time', time); 
        
        console.log('time',time);// Append time value to the form data

        fetch('http://localhost/avocatConnect/avocatConnect/src/acceptedrequest.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Request accepted successfully!');
                window.location.href = '/requests'
                // Optionally, close the modal or navigate to another page
            } else {
                console.log('Failed to accept request: ' + data.error);
            }
        })
        .catch(error => {
            console.log('An error occurred while accepting the request.');
            console.error('Error:', error);
        });
   
   
    };

    return (
        <div className='mainpagelol'>
            <div className="cardlol">
                <div className='h2div'>
                    <h2>Client Information</h2>
                </div>
                {requestDetails ? (
                    <div> 
              <img style={{marginBottom:"10px"}} alt={emptypfp} src={requestDetails.profilePic ? requestDetails.profilePic : emptypfp} className='imglol' />
                        <p><FontAwesomeIcon icon={faUser} /> {requestDetails.name} {requestDetails.lastname}</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${requestDetails.email}`}>{requestDetails.email}</a></p>
                        <p><FontAwesomeIcon icon={faPortrait} /> {requestDetails.username}</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {requestDetails.wilaya}</p>
                        <p><FontAwesomeIcon icon={faPhone} /> {requestDetails.tel}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <div className="cardlol">
                <div className='h2div'>
                    <h2>Service Request Information</h2>
                </div>
                {requestDetails ? (
                    <div> 
                        <p>{requestDetails.content}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className='cardlol'>
            <div className='h2div'>
                    <h2>documents associated:</h2>
                </div>
                {serviceRequestId && <FetchDocuments requestID={Number(serviceRequestId)} />}
            </div>

            <div className='cardlol'>
                <div className='button-container'style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="fill"  onClick={handleAcceptRequest}>accpet request</button>
                <button className="fill"                 onClick={toggleModal}>refuse request</button></div>

            </div>

            <Modal className="modal" isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                <h2>Set Date and Video Call Link</h2>
                <form onSubmit={handleSubmit}>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                    <label>Video Call Link:</label>
                    <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                    <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                    <button type="submit" style={{backgroundColor:"#679186"}} >OK</button>
                </form>
            </Modal>



            <Modal className="modal"   isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}  class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                 <React.Fragment >
                 <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
                
                 <div className="p-4 md:p-5 text-center " style={{width:"300px",height:"200px"}}>
    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
    <h3 className="mb-5 text-lg font-normal text-black-500 dark:text-gray-400">Are you sure you want to refuse this request?</h3>
    <button  onClick={handleRefuse}  data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
        Yes, Im sure
    </button>
    <button  onClick={toggleModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-black-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
</div>

           </React.Fragment>
           </Modal>

            
        </div>
    );
};

export default ConfigureRequest;