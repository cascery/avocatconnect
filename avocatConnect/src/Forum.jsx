/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './forum.scss';
import emptypfp from './images.png'

const QuestionDetails = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [comments, setComments] = useState([]);
    const userTypeFromSession = sessionStorage.getItem('userType');
    const [newComment, setNewComment] = useState('');


    useEffect(() => {
      const fetchData = async () => {
          try {
              // Fetch question details
              const questionResponse = await fetch(`https://avocatconnect.000webhostapp.com/getQuestion.php?id=${id}`);
              const questionData = await questionResponse.json();

              if (!questionResponse.ok || !questionData.success) {
                  throw new Error('Failed to fetch question');
              }

              setQuestion(questionData.question);

              // Fetch comments for the question
              const formData = new FormData();
              formData.append('forumID', id);
       // Use lawyerID as userID

              const commentsResponse = await fetch('https://avocatconnect.000webhostapp.com/comments.php', {
                  method: 'POST',
                  body: formData,
              });

              if (!commentsResponse.ok) {
                  throw new Error('Failed to fetch comments');
              }

              const commentsData = await commentsResponse.json();
              if (commentsData.success) {
                  setComments(commentsData.comments);
                  console.log(commentsData.comments)
              } else {
                  console.error('Failed to fetch comments:', commentsData.error);
              }
          } catch (error) {
              console.error('Error occurred while fetching data:', error);
          }
      };

      fetchData();
  }, [id]);

  
    const handleCommentChange = (e) => {
      setNewComment(e.target.value);
  };



  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('content', newComment);
      formData.append('forumID', id);
      formData.append('lawyerId', sessionStorage.getItem('lawyerId'));

  
      const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/insertcomment.php', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message); // Optionally handle success message
        setNewComment(''); // Clear the new comment input field
        // Fetch comments again to update the UI with the new comment
        window.location.reload();

      } else {
        console.error(data.error); // Optionally handle error message
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

    return (
        <React.Fragment>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
        <div style={{backgroundColor:"white",minWidth:"700px"}} >
            {question && (
           <section id="app" className="comments" >

  <article style={{backgroundColor:"white"}}>
    <h4>{question.title}</h4>
    <time>{question.date}</time>
    <like></like>
    <p>{question.content}</p>
  </article>

  

</section>)}


            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
  <div className="max-w-2xl mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments.length})</h2>
    </div>


    {userTypeFromSession=="lawyer"&&(
      <form className="mb-6" onSubmit={handleSubmitComment}>
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">Your comment</label>
        <textarea
          id="comment"
          rows="6"
          value={newComment} // Ensure textarea value is controlled by state
          onChange={handleCommentChange} // Handle change in textarea
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
      <button
        type="submit" // Submit the form on button click
        style={{ backgroundColor: "brown" }}
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
  )}
  

  {comments.map(comment => (
                            <article key={comment.commentID} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                        {comment.profilePic ? (
  <img                                                 className="mr-2 w-6 h-6 rounded-full"

    src={comment.profilePic}
    alt={emptypfp}
  />
) : (
  <img                                                 className="mr-2 w-6 h-6 rounded-full"

  src={emptypfp}
/>
)}
                                            {`${comment.name} ${comment.lastname}`}
                                            
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <time pubdate datetime={comment.date} title={comment.date}>{comment.date}</time>
                                        </p>
                                    </div>
                                    <button
                                        id={`dropdownComment${comment.commentID}Button`}
                                        data-dropdown-toggle={`dropdownComment${comment.commentID}`}
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button"
                                    >
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>
                                    <div id={`dropdownComment${comment.commentID}`} className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownComment${comment.commentID}Button`}>
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                            </li>
                                        </ul>
                                    </div>
                                </footer>
                                <p className="text-black-500 dark:text-gray-400">{comment.content}</p>
                                <div className="flex items-center mt-4 space-x-4"></div>
                            </article>
                        ))}
    {/* Other articles go here */}
  </div>
</section>

  
        </div> 
        </React.Fragment>
    );
   

};

export default QuestionDetails;
