import './style.css'; // You can keep this if you have additional styles
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Loginclient = () => {
  const navigate = useNavigate();
  const userType = 'client';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost/avocatConnect/avocatConnect/src/loginclient.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          // Set clientId in cookie
          document.cookie = `Id=${responseData.lawyerId}; userType=${userType}; path=/;`;
          sessionStorage.setItem('clientId', responseData.clientId);
          sessionStorage.setItem('userID', responseData.userID);

          sessionStorage.setItem('userType', userType);
          navigate('/feed');
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  return (
    <React.Fragment>
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
   
    <body style={{backgroundColor:"#f3f4f6"}}> 
      
   
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign in as a client</h1>
        <p className="text-sm text-gray-600">Sign in to access your account</p>
      </div>
      <form className="space-y-12" onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">Password</label>
              <a href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50"style={{backgroundColor:"#73998f" ,color:"white"}}>Sign in</button>
          </div>
          <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
            <a href="#" className="hover:underline text-violet-600" >Sign up</a>.
          </p>
        </div>
      </form>
    </div> </body></React.Fragment>
  );
};

export default Loginclient;
