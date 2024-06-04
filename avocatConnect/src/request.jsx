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
            case 'Refused':
                return <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />;
            default:
                return null;
        }
    };

   
        const handleRowClick = (serviceRequestId) => {
            window.location.href = `/configure-request/${serviceRequestId}`;
        };   

    return (
        <React.Fragment>
          
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
        
           <div className="flex flex-wrap -mx-3 mb-5">
            {requests ? (
          <div className="w-full max-w-full px-3 mb-6 mx-auto" style={{marginTop:"30px"}}>
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                {/* card header */}
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-semibold text-dark">service requests</span>
                    <span className="mt-1 font-medium text-secondary-dark text-lg/normal">all requests from clients</span>
                  </h3>
                  <div className="relative flex flex-wrap items-center my-2">
                    <a href="/reunions" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light">check reunions</a>
                  </div>
                </div>
                {/* end card header */}
                {/* card body  */}
                <div className="flex-auto block py-8 pt-6 px-9 " style={{backgroundColor:"rgb(255, 240, 250);"}}>
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                          <th className="pb-3 text-start min-w-[175px]">CLIENT</th>
                          <th className="pb-3 text-end min-w-[100px]">REQUEST</th>
                          <th className="pb-3 pr-12 text-end min-w-[175px]">STATUS</th>
                          <th className="pb-3 pr-12 text-end min-w-[100px]">DATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.length > 0 ? (
                          requests.map((request, index) => (
                            <tr key={index} onClick={() => handleRowClick(request.serviceRequestID)} className="hover:bg-gray-200 cursor-pointer">
                              <td >
                                <div className="flex items-center">
                                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                    {/* Assuming imageSrc is available in your data */}
                                  </div>
                                  <div className="flex flex-col justify-start">
                                    {/* Assuming task is the client name and request is the client's last name */}
                                    <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{request.clientName} {request.clientLastName}</a>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 pr-0 text-end">
                                {/* Assuming content represents the request */}
                                <span  style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', position: 'relative', display: 'inline-block' }} className="font-semibold text-light-inverse text-md/normal">{request.content}</span>
                              </td>
                              
                              <td className="p-3 pr-12 text-end">
                                <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">{getStatusIcon(request.status)}{request.status}</span>
                              </td>
                              <td className="pr-0 text-start">
                                {/* Assuming requestDate represents the date */}
                                <span className="font-semibold text-light-inverse text-md/normal">{new Date(request.requestDate).toLocaleDateString()}</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="p-4 text-center">No requests found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>  ) : (
                    <p>Loading...</p>
                )}
        </div>
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          </div>
        </div>
      
      </React.Fragment>
      
    );
};

export default RequestsTab;
