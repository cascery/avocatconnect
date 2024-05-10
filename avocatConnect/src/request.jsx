/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { faHourglassHalf, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './requests.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RequestsTab = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const lawyerId = sessionStorage.getItem('lawyerId');
            if (!lawyerId) {
                console.error('Lawyer ID not found in session storage');
                return;
            }

            const formData = new FormData();
            formData.append('lawyerId', lawyerId);

            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/request.php', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            const data = await response.json();
            setRequests(data.serviceRequests);
            console.log("date",requests.status);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <FontAwesomeIcon icon={faHourglassHalf} style={{ color: 'orange' }} />;
            case 'accepted':
                return <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />;
            case 'refused':
                return <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />;
            default:
                return null;
        }
    };

   
        const handleRowClick = (serviceRequestId) => {
            window.location.href = `/configure-request/${serviceRequestId}`;
        };   

    return (
        <div className='table-wrapper'>
            {requests.length > 0 ? (
                <table className='fl-table'>
                    <thead>
                        <tr>
                            <th>client</th>
                            <th>request</th>
                            <th>service type</th>
                            <th>status</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => ( 
                            <tr key={request.serviceRequestID} onClick={() => handleRowClick(request.serviceRequestID)}>
                                <td className='truncate'>{request.clientName}  {request.clientLastName}</td>
                                <td  style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{request.content}</td>
                                <td> criminal law   </td>
                                <td className='truncate'>{getStatusIcon(request.status)}{request.status}</td>
                                <td  className='truncate'>{ new Date(request.requestDate).toLocaleDateString()}</td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No requests found</p>
            )}
        </div>
    );
};

export default RequestsTab;
