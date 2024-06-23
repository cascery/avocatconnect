
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './lawyerprofile.css';
import Announcements from './announcements';
import Modal from 'react-modal';
import emptypfp from './images.png'

const LawyerProfile = () => {
  const lawyerSpecialties = [
    'Legal Consultation',
    'Contract Drafting and Review'
  ];
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [Adocuments, AsetDocuments] = useState([]);


  const handleDocumentSelection = (documentID) => {
    setSelectedDocuments(prevSelectedDocuments => {
        if (prevSelectedDocuments.includes(documentID)) {
            return prevSelectedDocuments.filter(id => id !== documentID);
        } else {
            return [...prevSelectedDocuments, documentID];
        }
    });
};
useEffect(() => {
    console.log(selectedDocuments); // Log the updated state
}, [selectedDocuments]); 
  
const handleSendRequest = async () => {
  // Filter out any empty values and get the correct selected document IDs
  const selectedDocumentIDs = selectedDocuments.filter(id => id);
  
  // Implement the logic to send the request to the backend
  const formData = new FormData();
  formData.append('title', title);
  formData.append('details', details);
  formData.append('lawyerID', id);
  formData.append('clientId', sessionStorage.getItem('clientId'));
  formData.append('selectedDocuments', selectedDocumentIDs.join(',')); // Join the array into a comma-separated string
  try {
      const response = await fetch('https://avocatconnect.000webhostapp.com/insertrequest.php', {
          method: 'POST',
          body: formData,
      });
      if (response.ok) {
          // Request sent successfully, handle accordingly
          console.log('Request sent successfully');
          window.location.reload();

      } else {
          // Request failed, handle accordingly
          console.error('Failed to send request');
      }
  } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error sending request:', error);
  }
};
    const openModal = () => {
      setModalIsOpen(true);
  };
  const closeModal = () => {
      setModalIsOpen(false);
  }; // State to manage modal visibility
    useEffect(() => {
      const fetchLawyerProfile = async () => {
          const formData = new FormData();
          formData.append('id', id); // Change 'id' to 'lawyerId'
  
          try {
              const response = await fetch(`http://localhost/avocatConnect/avocatConnect/src/lawyerprofile.php`, {
                  method: 'POST',
                  body: formData, // Pass formData as the body
              });
  
              const data = await response.json();
              if (response.ok) {
                  setProfileData(data.data);
                  console.log(data);
                  setLoading(false);
              } else {
                  console.error('Failed to fetch lawyer profile:', data.error);
                  setLoading(false);
              }
          } catch (error) {
              console.error('Error fetching lawyer profile:', error);
              setLoading(false);
          }
      };
  
      fetchLawyerProfile();
  }, [id]);
  const [documents, setDocuments] = useState([]);
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
            console.log(documents)
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };
    fetchData();
}, [clientId]);
  
  
    return (
        <div style={{marginBottom:"70px"}}>
           {profileData ? (
             <div className="card" style={{marginTop:"90px"}}>
        
             <div className="card__header">
                 <div className="card__profile">
                 {profileData.profilePic ? (
  <img
    src={profileData.profilePic}
    alt={emptypfp}
  />
) : (
  <img
  src={emptypfp}
/>
)}
                 </div>
                 <div className="card__name">
                     <h2>{profileData.name} {profileData.lastname} <h5>{profileData.speciality}</h5></h2>
                     <div className="card__handle">
                         <span className="handle">@{profileData.username}</span>
                     </div>
                 </div>
                 <div className="card__button">
                     <button  onClick={openModal}>
                     <svg fill="#fffdfb" width="256px" height="256px" viewBox="-10 -10 120.00 120.00" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#fffdfb" stroke-width="0.001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m38.63 57.24a9.33 9.33 0 0 1 -.48 2.47l11.51 12.12a3.64 3.64 0 0 1 1 2.52 2.82 2.82 0 0 1 -1.1 2.46 4.08 4.08 0 0 1 -5.19-.13l-11.53-12.12a9.49 9.49 0 0 1 -2.5.35 9.68 9.68 0 0 1 -10.13-9.6 8.53 8.53 0 0 1 .48-2.47c0-.42.42-.41.83-.19l5.05 5.52a.77.77 0 0 0 1.24 0l3.62-3.43a1 1 0 0 0 0-1.45l-5.02-5.29c-.2-.21-.18-.83.23-.82a11.94 11.94 0 0 1 2.5-.35 9.26 9.26 0 0 1 9.49 10.41z"></path> <path d="m78.67 34.7a15.51 15.51 0 0 0 -3-5.74 13.63 13.63 0 0 0 -6.11-4.16 15.14 15.14 0 0 0 -3.89-.75 13.12 13.12 0 0 0 -5.88.9 15.58 15.58 0 0 0 -5.52 3.79c-.62.65-1.18 1.35-1.79 2l-.14-.18a20.11 20.11 0 0 0 -3.12-3.27 14.81 14.81 0 0 0 -4.28-2.49 13.56 13.56 0 0 0 -5.75-.78 14.49 14.49 0 0 0 -5.52 1.49 14 14 0 0 0 -6.53 6.89 18.63 18.63 0 0 0 -1.63 7.08 17.09 17.09 0 0 0 .27 3.72l.25-.05a16.11 16.11 0 0 1 3.07-.4h.19a13.28 13.28 0 0 1 13.4 14.7 8.42 8.42 0 0 1 -.09 1l10 10.55a7.67 7.67 0 0 1 2 3.92 106.59 106.59 0 0 0 11.36-9.43 67.92 67.92 0 0 0 7.48-8.33 37.33 37.33 0 0 0 4.08-6.71 20.19 20.19 0 0 0 1.85-6.45 19 19 0 0 0 -.7-7.3z"></path> </g> </g></svg>
                        <span>request service</span>
                     </button>
                    
                 </div>
                 <div className='cardinforma'>
                     <h6><i className="fas fa-graduation-cap"></i> education: 11 years.</h6>
                     <h6><i className="fas fa-map-marker-alt"></i> wilaya: {profileData.wilaya}.</h6>
                     <h6><i className="fas fa-circle green"></i> active: yes.</h6>
                 </div>
             </div>
             <hr className="border" />
             <div className="card__insights">
                 <div className="card__heading">
                     <div className="heading">announcements</div>

                 </div>
                                     <Announcements userId={id}/>
             </div>



             <Modal style={{  fontFamily: "'Material Symbols Rounded', sans-serif" }} isOpen={modalIsOpen} onRequestClose={closeModal} overlayClassName={'custom-overlay'} className="custom-modal">
  <React.Fragment>
  <link rel="stylesheet" href="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/css/main.ad49aa9b.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
    <div className="flex flex-col items-center justify-center h-full overflow-auto" 
     style={{ maxHeight: '400px', 
    overflowY: 'auto', 
       } }>
      <h2>Send a request</h2>
      <input type="text" placeholder="title" className="input input-bordered w-full max-w-xs" />
      <textarea placeholder="details"

value={details} 
    onChange={(e) => setDetails(e.target.value)}
 className="textarea textarea-bordered textarea-lg w-full max-w-xs" >
      </textarea>
      <details className="dropdown">
  <summary className="m-1 btn">Select Document</summary>
  <div className="flex flex-col justify-center items-center h-[100vh]">
    <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined" 
    style={{ maxHeight: '100px', overflowY: 'auto' }}>
    <div className="h-full w-full">
  {documents && documents.length > 0 && documents.map((document, index) => (
    <div key={index} className="mt-5 flex items-center justify-between p-2">
      <div className="flex items-center justify-center gap-2">
        <input
          onChange={() => handleDocumentSelection(document.documentID)}
          type="checkbox"
          className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
            justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
            checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
          name="weekly"
          style={{ backgroundColor: "#c5d5d1", fontFamily: "'Poppins','helvetica,sans-serif'" }}
        />
        <p className="text-base font-bold text-navy-700 dark:text-white" style={{ fontFamily: "'Poppins', 'Helvetica', sans-serif", fontSize: '14px', fontWeight: 'normal' }}>
          {document.file_name}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  </div>
</details>


      <button className="btn btn-outline" onClick={handleSendRequest} 
      style={{marginTop:"10px",marginBottom:"10px", backgroundColor:"#679186",color:"white"}}>Send request</button>
      <button  style={{ backgroundColor:"#679186",color:"white"}} className="btn btn-outline" onClick={closeModal}>Close</button>
    </div>
  </React.Fragment>
</Modal>

           
         </div>
         
            ) : (
                <p>No profile data found</p>
            )}
        </div>
    );
};
export default LawyerProfile;
