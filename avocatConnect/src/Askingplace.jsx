/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './askingplace.css';

const AskingPlace = () => {
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('clientId', 10); // Replace with actual client ID

      const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/askingplace.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data); // Handle response from backend

      // Clear form fields after successful submission
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <div>
      <h2>Compose Your Question</h2>
      <form onSubmit={handleSubmit}>
        <input
      
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Question Title"
          required
        />
       
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          style={editorStyle}
        />
        <button className='post' type="submit">Post Question</button>
      </form>
    </div>
  );
};

export default AskingPlace;
