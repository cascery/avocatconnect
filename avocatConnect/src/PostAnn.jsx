/* eslint-disable no-unused-vars */
import React, { useState ,useEffect} from 'react';
import './PostAnn.scss';
const PostAnn = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('lawyerId', sessionStorage.getItem('lawyerId'));

            const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/Postann.php', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message); // Optionally handle success message
                setTitle('');
                setDescription('');
            } else {
                console.error(data.error); // Optionally handle error message
            }
        } catch (error) {
            console.error('Error posting announcement:', error);

        }

        window.location.href = '/profile';

    };

    const [showForm, setShowForm] = useState(false);

    // Event handler for post button click
    const handlePostClick = () => {
      setShowForm(true);
    };

    useEffect(() => {
        const handleClick = (event) => {
          document.execCommand(event.target.dataset.func, false);
        };
    
        const handleChange = (event) => {
          const value = event.target.value;
          document.execCommand(event.target.dataset.func, false, value);
        };
    
        const handleKeyPress = () => {
          const editor = document.querySelector('.editor');
          editor.querySelector('.saved')?.remove();
        };
    
        const handleSave = () => {
          const content = document.querySelector('.editor').innerHTML;
          localStorage.setItem("wysiwyg", content);
          const savedSpan = document.createElement('span');
          savedSpan.classList.add('saved');
          savedSpan.innerHTML = '<i class="fa fa-check"></i>';
          document.querySelector('.editor').appendChild(savedSpan);
          setTimeout(() => {
            savedSpan.style.opacity = '0';
            setTimeout(() => savedSpan.remove(), 500);
          }, 1000);
        };
    
     
       
      }, []);
      const handleEditorChange = (e) => {
        setDescription(e.target.innerHTML);
    };

return(
    <form onSubmit={handleSubmit}>
    <div className="newPost">
    <h3>Add New Post</h3>
    <input  placeholder="Enter title here" type="text"
                value={title}
                onChange={handleTitleChange}
                required
  />
    <div className="toolbar">
      <button type="button" data-func="bold"><i className="fa fa-bold"></i></button>
      <button type="button" data-func="italic"><i className="fa fa-italic"></i></button>
      <button type="button" data-func="underline"><i className="fa fa-underline"></i></button>
      <button type="button" data-func="justifyleft"><i className="fa fa-align-left"></i></button>
      <button type="button" data-func="justifycenter"><i className="fa fa-align-center"></i></button>
      <button type="button" data-func="justifyright"><i className="fa fa-align-right"></i></button>
      <button type="button" data-func="insertunorderedlist"><i className="fa fa-list-ul"></i></button>
      <button type="button" data-func="insertorderedlist"><i className="fa fa-list-ol"></i></button>
      <div className="customSelect">
        <select data-func="fontname">
          <optgroup label="Serif Fonts">
            <option value="Bree Serif">Bree Serif</option>
            <option value="Georgia">Georgia</option>
            <option value="Palatino Linotype">Palatino Linotype</option>
            <option value="Times New Roman">Times New Roman</option>
          </optgroup>
          <optgroup label="Sans Serif Fonts">
            <option value="Arial">Arial</option>
            <option value="Arial Black">Arial Black</option>
            <option value="Asap" selected>Asap</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Impact">Impact</option>
            <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Verdana">Verdana</option>
          </optgroup>
          <optgroup label="Monospace Fonts">
            <option value="Courier New">Courier New</option>
            <option value="Lucida Console">Lucida Console</option>
          </optgroup>
        </select>
      </div>
      <div className="customSelect">
        <select data-func="formatblock">
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h4">Subtitle</option>
          <option value="p" selected>Paragraph</option>
        </select>
      </div>
    </div>
    <textarea className="editor" contentEditable value={description}
                onChange={handleDescriptionChange}
                required
                ></textarea>
    <div className="buttons">
      {/* <button type="button">save draft</button> */}
      <button data-func="clear" type="button">clear</button>
      <button data-func="save" type="submit" >post</button>
    </div>
  </div>
  </form>
);



}

export  default PostAnn;