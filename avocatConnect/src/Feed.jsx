/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import emptypfp from './images.png'

import Modal from 'react-modal';
import './tailwindblah.css';
import AskingPlace from './Askingplace';
Modal.setAppElement('#root'); // Set the root element for accessibility

const Feed = () => {
    const userType = sessionStorage.getItem('userType');
    // State to store questions
    const [questions, setQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

    // Function to fetch questions from the server
    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/feed.php');
            if (response.ok) {
                const data = await response.json();
                setQuestions(data.questions);
                console.log(data.questions);
            } else {
                console.error('Failed to fetch questions');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };



    
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <React.Fragment>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
       
        <div className='theverymaindiv' style={{ backgroundColor: 'white' ,width:'100'}}  >
       
{userType === 'client' ? (
        <div className="floating-container">
          <button className="floating-button" onClick={openModal}>+</button>
          <div className="element-container">
            {/* Additional elements */}
          </div>
        </div>
      ) : null}
      <Modal
        style={{
          overlay: {
            overflowY: 'auto', // Enable vertical scrolling on overlay
          },
          content: {
            overflowY: 'auto', // Enable vertical scrolling within the modal content
            maxHeight: '80%', // Set maximum height for the modal content
          },
        }}
        className="modal"
        isOpen={showModal}
        onRequestClose={closeModal}
      >
        <AskingPlace/>
              </Modal>

        <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-12">



        {questions.map(question => (
          <div key={question.id}  className="p-12 md:w-1/2 flex flex-col items-start " 
          style={{ backgroundColor: 'white' ,width:'100', 
         }}>

<a className="inline-flex items-center">
              <img style={{marginBottom:"10px"}} alt={emptypfp} src={question.profilePic ? question.profilePic : emptypfp} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
              <span className="flex-grow flex flex-col pl-4">
                <span className="title-font font-medium text-gray-900">@{question.username}  {question.name}</span>
                <span className="text-gray-400 text-xs tracking-widest mt-0.5">{question.date}</span>
              </span>
            </a>
            <span className="inline-block py-1 px-2 rounded bg-red-50 text-red-500 text-xs font-medium tracking-widest">criminal law</span>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{question.title}</h2>
            <p className="leading-relaxed mb-8">{question.content} </p>
            <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
            <Link to={`/feed/${question.forumID}`} className="text-red-500 inline-flex items-center">
                read More
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
            </div>
          
          </div>
           ))}
         
        </div>
      </div>
    </section></div>
      </React.Fragment>
        
    );
};

export default Feed;
