/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { faHourglassHalf, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './reunions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Reunions = () => {
    const [reunions, setReunions] = useState([]);

    const fetchReunions = async () => {
        try {
            const userId = sessionStorage.getItem('lawyerId');
            
            if (!userId) {
                console.error('User ID not found in session storage');
                return;
            }

            const formData = new FormData();
            formData.append('userId', sessionStorage.getItem('lawyerId'));

            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/reunions.php', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to fetch reunions');
            }
            const data = await response.json();
            setReunions(data.reunions);
            console.log("Reunions data:", reunions);
        } catch (error) {
            console.error('Error fetching reunions:', error);
        }
    };

    useEffect(() => {
        fetchReunions();
    }, []);

    
    return (
        <div className='table-wrapper'>
            {reunions.length > 0 ? (
                <table className='fl-table'>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Link</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reunions.map((reunion, index) => (
                            <tr key={index}>
                                <td>{reunion.clientID}</td>
                                <td>{reunion.date}</td>
                                <td><a href={reunion.videoLink}>{reunion.videoLink}</a></td>
                                <td>{reunion.subject}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No reunions found</p>
            )}
        </div>
    );
};

export default Reunions;
