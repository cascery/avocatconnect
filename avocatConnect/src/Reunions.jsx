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
       
    
       < React.Fragment>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div style={{backgroundColor:"#faf7f5"}} className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
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
                          <th className="pb-3 text-end min-w-[100px]">SUBJECT</th>
                          <th className="pb-3 pr-12 text-end min-w-[175px]">VIDEOLINK</th>
                       
                        </tr>
                      </thead>
                      <tbody>
  {reunions.length > 0 ? (
    reunions.map((reunion, index) => (
      <tr key={index}>
        <td>
          <div className="flex items-center">
            <div className="relative inline-block shrink-0 rounded-2xl me-3">
            {reunion.clientID}
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
          <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
           
            {reunion.subject}
          </span>
        </td>
        <td className="p-3 pr-12 text-end">
          <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">{
          reunion.videoLink}</span>
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
