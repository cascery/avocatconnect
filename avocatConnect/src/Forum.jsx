/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './forum.scss';

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
        const formData = new FormData();
formData.append('forumID', id);
        fetch(`http://localhost/avocatConnect/avocatConnect/src/comments.php`
       ,{
        method: 'POST',
        body: formData,

       }).then(response => response.json())
       .then(data => {
           if (data.success) {
               setComments(data.comments);
           } else {
               console.error('Failed to fetch comments:', data.error);
           }
       })
       .catch(error => {
           console.error('Error occurred while fetching comments:', error);

    })}, [id]);

    return (
        <React.Fragment>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
        <div>
            {question && (
           <section id="app" className="comments">

  <article>
    <h4>{question.title}</h4>
    <time>{question.date}</time>
    <like></like>
    <p>{question.content}</p>
  </article>

  

</section>)}


            <h3>Comments:</h3>
            {comments.map(comment => (
          
            <section key={comment.commentID} className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-gray-700">lawyer info</span>
              <span className="mt-1 text-gray-500 text-sm">{comment.date}</span>
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed">{comment.content}</p>
           
            </div>
          </div>
      
        
        </div>
      </div>
    </section> ))}
  
        </div> 
        </React.Fragment>
    );
   

};

export default QuestionDetails;
