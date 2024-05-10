/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './askingplace.css';

const AskingPlace = () => {

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
};

const handleDescriptionChange = (e) => {
    setContent(e.target.value);
};
  const userID= sessionStorage.getItem('userID');

  const editorStyle = {
    height: '300px',
    width:'700px', // Set the height as needed
    backgroundColor: '#f8f8f8', // Set the background color
    color: '#333', // Set the text color
    border: '1px solid #ddd', // Set the border style
    borderRadius: '5px', // Set the border radius for a rounded look
    padding: '10px', // Set padding for spacing inside the editor
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  

  const handleContentChange = (value) => {
    setContent(value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userID', userID); 

      const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/askingplace.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data); 

      window.location.reload();
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="newPost">
    <h3>ask a legal question!</h3>
    <input  placeholder="Enter title here" type="text"
                value={title}
                onChange={handleTitleChange}
                required
  />
   
    <textarea className="editor" contentEditable value={content}
                onChange={handleDescriptionChange}
                required
                ></textarea>
    <div className="buttons">
      {/* <button type="button">save draft</button> */}
      <button data-func="clear" type="button">clear</button>
      <button data-func="save" type="submit"  >post</button>
    </div>
  </div>
  </form>
  );
};

export default AskingPlace;
