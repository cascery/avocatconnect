import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import './askingplace.css';

const AskingPlace = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setContent(e.target.value);
  };

  const clearText = () => {
    setTitle('');
    setContent('');
  };

  const userID = sessionStorage.getItem('userID');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userID', userID);

      const response = await fetch('https://avocatconnect.000webhostapp.com/askingplace.php', {
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
        <h3>Ask a legal question!</h3>
        <input
          placeholder="Enter title here"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <textarea
          className="editor"
          contentEditable
          value={content}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        <div className="buttons">
          <button type="button" onClick={clearText}>Clear</button>
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default AskingPlace;
