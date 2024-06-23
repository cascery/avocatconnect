/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './managefiles.css';

const ManageFiles = () => {
    const [documents, setDocuments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [showDropdowns, setShowDropdowns] = useState([]); // State to manage dropdown visibility for each document

    const clientId = sessionStorage.getItem('clientId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('clientId', clientId);

                const response = await fetch('https://avocatconnect.000webhostapp.com/managefiles.php', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }

                const data = await response.json();
                setDocuments(data.documents);
                setShowDropdowns(new Array(data.documents.length).fill(false)); // Initialize dropdown visibility array
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchData();
    }, [clientId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFilenameChange = (event) => {
        setFilename(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('clientId', clientId);
            formData.append('filename', filename);
            formData.append('file', file);

            const response = await fetch('https://avocatconnect.000webhostapp.com/insertfiles.php', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload document');
            }

            closeModal();
            window.location.reload();

        } catch (error) {
            console.error('Error uploading document:', error);
        }
    };

    const toggleDropdown = (index) => {
        // Toggle dropdown visibility for the document at the specified index
        const newShowDropdowns = [...showDropdowns];
        newShowDropdowns[index] = !newShowDropdowns[index];
        setShowDropdowns(newShowDropdowns);
    };

    const deleteFile = async (documentId) => {
        try {
            const formData = new FormData();
            formData.append('documentID', documentId); // Correct field name
        
            const response = await fetch('https://avocatconnect.000webhostapp.com/deletefile.php', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete document');
            }
    
            // Reload documents after successful deletion
            window.location.reload();
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };
    
    

    return (
        <React.Fragment>
            <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <React.Fragment >
                    <h2 className="modal-title">Upload Document</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="filename-input">
                            <input type="text" placeholder="Enter filename" value={filename} onChange={handleFilenameChange} />
                        </div>
                        <fieldset className="w-full space-y-1 text-gray-800">
                            <label htmlFor="files" className="block text-sm font-medium">Attachments</label>
                            <div className="flex">
                                <input type="file" onChange={handleFileChange} accept=".pdf" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100" />
                            </div>
                        </fieldset>
                        <button style={{ marginRight: '10px', marginTop: '10px' }} type="submit" className="px-8 py-3 font-semibold border rounded border-gray-800 text-gray-800">upload</button>
                        <button onClick={closeModal} className="px-8 py-3 font-semibold border rounded border-gray-800 text-gray-800">close</button>
                    </form>
                </React.Fragment>
            </Modal>
            <div>
                <section className="text-gray-600 body-font">
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <button className='btn btn-outline' onClick={openModal} style={{ backgroundColor: '#679186', color: 'white', borderRadius: '10px', marginTop: '70px' }}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
                                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
                                </g>
                            </svg>
                            <p style={{ backgroundColor: '#679186', color: 'white' }} className="text-gray-500">add a document</p>
                        </button>
                    </div>
                    <div className="container px-5 py-24 mx-auto" style={{ left: '0px', border: "solid 1px" ,backgroundColor:"white" }}>
                        <div className="flex flex-wrap -m-2">
                            {documents &&documents.length > 0 ? (
                                documents.map((document, index) => (
<div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index} >
                                        
                                        <div style={{ transition: 'background-color 0.3s', backgroundColor: 'inherit',border:"1px solid" ,padding:"20px"}} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fae7f4'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'inherit'; }} className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                        <button
                                            id={`dropdownMenuIconButton_${index}`}
                                            data-dropdown-toggle={`dropdownDots_${index}`}
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 #faf7f5 rounded-lg hover: #faf7f5 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button"
                                            onClick={() => toggleDropdown(index)} // Toggle dropdown visibility for the document at this index
                                        >
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                            </svg>
                                        </button>
                                        {showDropdowns[index] && (
                                            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownMenuIconButton_${index}`}>
                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => deleteFile(document.documentID)}>delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                            
                                            <svg fill="#000000" width="50px" height="50px" viewBox="0 0 1200.00 1200.00" xmlns="http://www.w3.org/2000/svg" className="cf-iF-svg" stroke="#000000" strokeWidth="0.012">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M30 161c-16.5 0-30 13.5-30 30v827.8c0 16.5 13.5 30 30 30h591.7c16.5 0 30-13.5 30-30V343.7L469 161H30zm389.6 60v134.8c0 19.9 16.3 36.2 36.2 36.2h135.9v596.8H60V221h359.6z"></path>
                                                    <path d="M123.8 768.6h394.8v50H123.8zm0-124.6h394.8v50H123.8zm0-124.5h394.8v50H123.8z"></path>
                                                    <circle cx="194" cy="382.3" r="60"></circle>
                                                </g>
                                            </svg>
                                            <div className="flex-grow">
                                                <h2 className="text-gray-900 title-font font-medium">
                                                    <a href={`data:application/pdf;base64,${document.file}`} download={`document_${index}.pdf`}>
                                                        {document.file_name}
                                                    </a>
                                                </h2>
                                                <p className="text-gray-500">{document.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>There are no documents</p>
                            )}
                        </div>
                    </div>
                </section>
                <div style={{height: "200px"}}></div>
            </div>
        </React.Fragment>
    );
};

export default ManageFiles;
