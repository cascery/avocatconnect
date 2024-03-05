/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuestionDetails = () => {
    const { id } = useParams();
    console.log('Question ID:', id);    console.log (id);
    const [question, setQuestion] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch question details
        fetch(`http://localhost/avocatConnect/avocatConnect/src/getQuestion.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setQuestion(data.question);
                } else {
                    console.error('Failed to fetch question:', data.error);
                }
            })
            .catch(error => {
                console.error('Error occurred while fetching question:', error);
            });
    
        // Fetch comments for the question
        fetch(`http://localhost/avocatConnect/avocatConnect/src/Forum.php?forumID=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setComments(data.comments);
                } else {
                    console.error('Failed to fetch comments:', data.error);
                }
            })
            .catch(error => {
                console.error('Error occurred while fetching comments:', error);
            });
    }, [id]);

    return (
        <div>
            {question && (
                <div>
                    <h2>{question.title}</h2>
                    <p>{question.content}</p>
                    <p>Posted by Client ID: {question.clientID}</p>
                </div>
            )}

            <h3>Comments:</h3>
            {comments.map(comment => (
                <div key={comment.commentID}>
                    <p>{comment.content}</p>
                    <p>Commented by Lawyer ID: {comment.lawyerID}</p>
                </div>
            ))}
        </div>
    );
};

export default QuestionDetails;
