/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faImage, faPortrait } from '@fortawesome/free-solid-svg-icons';
import './ConfigureRequest.scss';
import FetchDocuments from './FetchDocuments';


import Modal from 'react-modal';

const ConfigureRequest = () => {

    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState('');
    const [videoLink, setVideoLink] = useState('');

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

                const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/ConfigureRequest.php', {
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
    const handleSubmit = () => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('requestId', serviceRequestId);
        formData.append('date', date);
        formData.append('videoLink', videoLink);
        formData.append('lawyerId',sessionStorage.getItem('lawyerId'));

        fetch('http://localhost/avocatConnect/avocatConnect/src/acceptedrequest.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Request accepted successfully!');
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
                        <img className='imglol' src={`data:image/png;base64,${requestDetails.profilePic}`} alt="Profile" />
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
            <FetchDocuments requestID={Number(serviceRequestId)} />

            </div>

            <div className='cardlol'>
                <div className='button-container'>
                <button className="fill"  onClick={handleAcceptRequest}>accpet request</button>
                <button className="fill">refuse request</button></div>

            </div>

            <Modal className="modal" isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                <h2>Set Date and Video Call Link</h2>
                <form onSubmit={handleSubmit}>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                    <label>Video Call Link:</label>
                    <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />

                    <button type="submit">OK</button>
                </form>
            </Modal>
        </div>
    );
};

export default ConfigureRequest;
