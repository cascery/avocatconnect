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
            window.location.href=("/requests")
    
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
        <React.Fragment>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
        
        <main className="font-jost hyphens-manual">
        {/* Page ------------------------------------------------------------------------------------------------------*/}
                     {requestDetails ? (
 <section className="p-3 my-auto mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16 lg:mt-6 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-letter lg:h-letter">
          {/* Name --------------------------------------------------------------------------------------------------*/}
          <header className="inline-flex justify-between items-baseline mb-2 w-full align-top border-b-4 border-gray-300">
            <section className="block">
              <h1 className="mb-0 text-5xl font-bold text-gray-700">
                Service request information
              </h1>
              {/*Job Title-------------------------------------------------------------------------------------------------------*/}
              <h2 className="m-0 ml-2 text-2xl font-semibold text-gray-700 leading-snugish">
              </h2>
              {/*Location -------------------------------------------------------------------------------------------------------*/}
              <h3 className="m-0 mt-2 ml-2 text-xl font-semibold text-gray-500 leading-snugish">
                client's information
              </h3>
            </section>
            {/*   Initials Block         */}
            <section
              className="justify-between px-3 mt-0 mb-5 text-4xl font-black leading-none text-white bg-gray-700 initials-container print:bg-black"
              style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}
            >
             
            </section>
          </header>
          {/* Column ------------------------------------------------------------------------------------------------*/}
          <section className="col-gap-8 print:col-count-2 print:h-letter-col-full col-fill-balance md:col-count-2 md:h-letter-col-full">
            <section className="flex-col">
              {/* Contact Information -----------------------------------------------------------------------------------*/}
              <section className="pb-2 mt-4 mb-0 first:mt-0">
                {/* To keep in the same column ------------------------------------------------------------------------*/}
                <section className="break-inside-avoid">
                  <section className="pb-4 mb-2 border-b-4 border-gray-300 break-inside-avoid">
                    <ul className="pr-7 list-inside">
                      <li className="mt-1 leading-normal text-black text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md print:">
                        
                                          <img style={{marginBottom:"10px",width:"50px",height:"50px",border:"none"}} alt={emptypfp} src={requestDetails.profilePic ? requestDetails.profilePic : emptypfp} className='imglol' />

                          <span className="mr-2 text-lg font-semibold text-gray-700 leading-snugish">
                           name:
                          </span>
                          <p><FontAwesomeIcon icon={faUser} /> {requestDetails.name} {requestDetails.lastname}</p>

                         
                       
                      </li>
                      <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                        <a
                          href="https://github.com/Thomashighbaugh"
                          className="group"
                        >
                          <span className="mr-5 text-lg font-semibold text-gray-700 leading-snugish">
tel:                          </span>
<p><FontAwesomeIcon icon={faPhone} /> {requestDetails.tel}</p>
                          <span className="inline-block font-normal text-black text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black print:">
                            ↗
                          </span>
                        </a>
                      </li>
                      <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                        <a href="		    https://veilmail.io/e/J-td7W" className="group">
                          <span className="mr-8 text-lg font-semibold text-gray-700 leading-snugish">
                            Email:
                          </span>
                          <p><FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${requestDetails.email}`}>{requestDetails.email}</a></p>
                          <span className="inline-block font-normal text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black">
                            ↗
                          </span>
                        </a>
                      </li>
                      <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                        <a href="tel:+15109070654">
                          <span className="mr-5 text-lg font-semibold text-gray-700 leading-snugish">
                           username:
                          </span>
                          <p><FontAwesomeIcon icon={faPortrait} /> {requestDetails.username}</p>

                        </a>
                      </li>
                    </ul>
                  </section>
                </section>
              </section>
              {/*Summary --------------------------------------------------------------------------------------------------------*/}
              <section className="pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
                {/* To keep in the same column */}
                <section className="break-inside-avoid">
                  <h2 className="mb-2 text-xl font-bold tracking-widest text-gray-700 print:font-normal">
                    Request summary
                  </h2>
                  <section className="mb-2 break-inside-avoid">
                  <p>{requestDetails.content}</p>

                  </section>
                </section>
              </section>
              {/*Education ------------------------------------------------------------------------------------------------------*/}
              <section className="pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                {/* To keep in the same column */}
                <section className="break-inside-avoid">
                  <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                    added documents
                  </h2>
                  {/* school -------------------------------------------------------------------------*/}
                  <section className="mt-2 border-b-2 break-inside-avoid">
                    <header>
                    {serviceRequestId && <FetchDocuments requestID={Number(serviceRequestId)} />}

                    </header>
                  </section>
                  {/*school 2-------------------------------------------------------------------------------------------*/}
                  
                  {/*school 3 -------------------------------------------------------------------------------*/}
                  
                </section>
              </section>
              {/*Begin Skills ---------------------------------------------------------------------------------------------------*/}
              <section className="pb-6 mt-0 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                {/* To keep in the same column */}
                <section className="break-inside-avoid">
                  <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
accept\refuse                  </h2>


<div className=''>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                
                </section>
              </section>
              {/*Experience ----------------------------------------------------------------------------------------------------*/}
              
              {/* end Column */}
            </section>
            {/* end Page */}
          </section>
        </section>  ) : (
                    <p>Loading...</p>
                )}
      </main> </React.Fragment>
      
    );
};

export default ConfigureRequest;