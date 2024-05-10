/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ConfigureRequest.scss';


const FetchDocuments = ({ requestID }) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('requestId', requestID);

                const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/retrieve_documents.php', {
                    method: 'POST',
                    body: formData,
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }

                const data = await response.json();
                setDocuments(data.documents);
              
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchData();
    }, [requestID]);

    return (
        <div>
            {documents.map((document, index) => (
                <div className='fill' key={index}>
                   
                    <a href={`data:application/pdf;base64,${document.file}`} download={`document_${index}.pdf`}>Download Document {index + 1}</a>
                </div>
            ))}
        </div>
    );
};

FetchDocuments.propTypes = {
    requestID: PropTypes.number.isRequired,
};

export default FetchDocuments;