import React, { useState, useEffect } from 'react';
import './reunions.css';
import emptypfp from './images.png'

const Reunions = () => {
    const [reunions, setReunions] = useState([]);
    console.log(sessionStorage.getItem('clientId'));

    const fetchReunions = async () => {
        try {
            
           

            const formData = new FormData();
            formData.append('clientID', sessionStorage.getItem('clientId'));

            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/requestresult.php', {
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
        <React.Fragment>
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
    <h2 className="mb-4 text-2xl font-semibold leading-tight">Reunions</h2>
    <div className="container p-2 mx-auto sm:p-4 text-gray-800" >
        {reunions.length > 0 && (
            <div className="overflow-x-auto">
                <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                    <colgroup>
                        <col className="w-5" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-5" />
                    </colgroup>
                    <thead>
                        <tr className="bg-gray-300" style={{ backgroundColor: "#679186", color: "white" }}>
                            <th className="p-3">A-Z</th>
                            <th className="p-3">pfp</th>
                            <th className="p-3">lawyer</th>
                            <th className="p-3">date</th>
                            <th className="p-3">video link</th>
                            <th className="p-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-b bg-gray-50 border-gray-300">
                        {reunions.map((reunion, index) => (
                            <tr key={index}>
                                <td className="px-3 text-2xl font-medium text-gray-600">{reunion.lawyerName.charAt(0)}</td>
                                <td className="px-3 py-2">
                                <img alt={emptypfp} src={reunion.lawyerProfilePic ? reunion.lawyerProfilePic : emptypfp} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                                </td>
                                <td className="px-3 py-2">
                                    <span>{reunion.jobTitle}</span>
                                    <p className="text-gray-600">{reunion.lawyerName} {reunion.lawyerLastname}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{reunion.date}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{reunion.videoLink }</p>
                                </td>
                              
                                <td className="px-3 py-2">
                                    <button type="button" title="Open details" className="p-1 rounded-full text-gray-400 hover:bg-gray-300 focus:bg-gray-300">
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
</React.Fragment>

    );
};

export default Reunions;
