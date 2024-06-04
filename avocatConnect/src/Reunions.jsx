/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { faHourglassHalf, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './reunions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emptypfp from './images.png'

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
       
    
       < React.Fragment>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div style={{backgroundColor:"white",marginTop:"50px"}} className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                {/* card header */}
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-semibold text-dark">reunions</span>
                  </h3>
                  <div className="relative flex flex-wrap items-center my-2">
                    <a href="/requests" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light">requests</a>
                  </div>
                </div>
                {/* end card header */}
                {/* card body  */}
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto" >
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                          <th className="pb-3 text-start min-w-[175px]">client</th>
                          <th className="pb-3 text-end min-w-[100px]">date</th>
                          <th className="pb-3 text-end min-w-[100px]">time</th>
                          <th className="pb-3 text-end min-w-[100px]">subject</th>
                          <th className="pb-3 pr-12 text-end min-w-[175px]">video link</th>
                        </tr>
                      </thead>
                      <tbody>
  {reunions.length > 0 ? (
    reunions.map((reunion, index) => (
      <tr key={index}>
        <td>
          <div className="flex items-center">
            <div className="relative inline-block shrink-0 rounded-2xl me-3">
            <img className="w-6 h-6 me-2 rounded-full" alt={emptypfp} src={reunion.clientProfilePic}/>{reunion.clientName}     {reunion.clientLastName}
            </div>
            <div className="flex flex-col justify-start">
              <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{reunion.task}</a>
            </div>
          </div>
        </td>
        <td className="p-3 pr-0 text-end">
          <span className="font-semibold text-light-inverse text-md/normal">{reunion.date}</span>
        </td>
        <td className="p-3 pr-0 text-end">
          <span className="font-semibold text-light-inverse text-md/normal">{reunion.time}</span>
        </td>
        
        <td className="p-3 pr-0 text-end">
          <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
           
            {reunion.subject}
          </span>
        </td>
        <td className="p-3 pr-12 text-end">
          <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
            
          <div className="flex items-center justify-between text-gray-800 border border-gray-800 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[250px] rounded-md">
    <div className="flex gap-1">
        <span></span>
        <span>{reunion.videoLink}</span>
    </div>
    <span className="flex text-gray-800 cursor-pointer w-5 h-5 hover:text-gray-400 duration-200">
        <svg className="fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 115.77 122.88" style={{ enableBackground: 'new 0 0 115.77 122.88' }} xmlSpace="preserve">
            <style type="text/css">{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
            <g>
                <path className="st0" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/>
            </g>
        </svg>
    </span>
</div>
          
          
          
          </span>
        </td>
       
       
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="p-4 text-center">No reunions found</td>
    </tr>
  )}
</tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          </div>
        </div>



     
      </React.Fragment> 
        
    );
};

export default Reunions;
