import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loginlawyer = () => {
    const navigate = useNavigate();
    const userType = 'lawyer'; 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        fetch('http://localhost/avocatConnect/avocatConnect/src/loginlawyer.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('Response:', responseData);
                if (responseData.success) {
                    document.cookie = `Id=${responseData.lawyerId}; userType=${userType}; path=/;`;
                    navigate('/feed');

                    console.log("Login successful");
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch((error) => {
                console.error('Error occurred:', error);
            });
    };

    return (
        <div className='container'>
            <div className='loginform'>
                <form className='form-detail' action='#' method='post' id='myform' onSubmit={handleFormSubmit}>
                    <h2>LOGIN LAWYER</h2>
                    <div className='form-group'>
                        <div className='form-row form-row-1'>
                            <input
                                type='text'
                                className='todo-input-login-lol'
                                placeholder='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-row form-row-2'>
                            <input
                                type='password'
                                className='todo-input-login-lol'
                                placeholder='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form-row-last'>
                        <input type='submit' name='register' className='todo-btn-login-lol' value='log in' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Loginlawyer;
