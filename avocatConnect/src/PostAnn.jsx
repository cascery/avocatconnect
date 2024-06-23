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

            const response = await fetch('https://avocatconnect.000webhostapp.com/Postann.php', {
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
    <h3>Add a New announcement</h3>
    <input  placeholder="Enter title here" type="text"
                value={title}
                onChange={handleTitleChange}
                required
  />
 
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