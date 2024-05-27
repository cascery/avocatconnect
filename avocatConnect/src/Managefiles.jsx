/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './managefiles.css';

const ManageFiles = () => {
    const [documents, setDocuments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

    const clientId = sessionStorage.getItem('clientId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('clientId', clientId);

                const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/managefiles.php', {
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

            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/insertfiles.php', {
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

    return (
        <React.Fragment>
                    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <React.Fragment>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />

                <h2 className="modal-title">Upload Document</h2>
                <form onSubmit={handleSubmit}>
                


                    <div className="filename-input">
                        <input type="text" placeholder="Enter filename" value={filename} onChange={handleFilenameChange} />
                    </div>
                    <fieldset className="w-full space-y-1 text-gray-800">
	<label htmlFor="files" className="block text-sm font-medium">Attachments</label>
	<div className="flex">
		<input  type="file" onChange={handleFileChange} accept=".pdf"  name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100" />
	</div>
</fieldset>


<button  style={{ marginRight: '10px' ,marginTop:'10px'}} type="submit" className="px-8 py-3 font-semibold border rounded border-gray-800 text-gray-800">upload</button>
<button  onClick={closeModal} className="px-8 py-3 font-semibold border rounded border-gray-800 text-gray-800">close</button>
            
                </form>
                
                </React.Fragment>
            </Modal>
            <div >
                <section className="text-gray-600 body-font" style={{border:"10px",marginTop:"100px"}}>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <button className='btn btn-outline' onClick={openModal} style={{ backgroundColor: '#679186', color: 'white' ,borderRadius:"10px" , marginTop:"10px"}}>
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="white" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="white" stroke-width="1.5" stroke-linecap="round"></path>
                                    </g>
                                </svg>
                                    <p style={{ backgroundColor: '#679186', color: 'white' }} className="text-gray-500">add a document</p>
                            </button>
                    </div>
                    <div className="container px-5 py-24 mx-auto" style={{ left: '0px' ,border: "solid 1px" }}>
                        <div className="flex flex-wrap -m-2">
                            {documents.map((document, index) => (
                                <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index} >
                                    <div style={{border: "solid 1px"} }className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <svg fill="#000000" width="50px" height="50px" viewBox="0 0 1200.00 1200.00" xmlns="http://www.w3.org/2000/svg" class="cf-iF-svg" stroke="#000000" stroke-width="0.012">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
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
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
};

export default ManageFiles;
