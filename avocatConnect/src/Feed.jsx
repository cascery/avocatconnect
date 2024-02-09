/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './feed.css'
const Feed = () => {
    // State to store questions
    const [questions, setQuestions] = useState([]);

    // Function to fetch questions from the server
    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/feed.php');
            if (response.ok) {
                const data = await response.json();
                setQuestions(data.questions);
            } else {
                console.error('Failed to fetch questions');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    // Fetch questions on component mount
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div>
          
          
            {questions.map(question => (
                <div key={question.id} className='box'>
                    <div className='card'>
    
                    <h3>{question.title}</h3>
                    <h4>{question.client_username}</h4>
                    <p>{question.content}</p>
                  
                       </div>  
                         </div>
            ))}
        </div>
    );
};

export default Feed;
