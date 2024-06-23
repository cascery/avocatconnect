import './style.css'; // You can keep this if you have additional styles
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import  {  useEffect } from 'react';
import logo from './—Pngtree—law scales of justice icon_7715744.png';
import guy from'./guy.png';

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

    fetch('https://avocatconnect.000webhostapp.com/loginclient.php', {
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
          window.location.href = '/feed'
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
   

    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
<div lassName="min-h-screen" style={{marginBottom:"1px;",paddingBottom:"0px"}}>
  <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
    <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
      <div x-data="{ open: true }" className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
            
          
          <img className='logo' src={logo} alt="" />

            AvocatConnect</a>
          <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={() => { open = !open }}>
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path x-show="!open" fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
              <path x-show="open" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <nav  className="{ open ? 'flex' : 'hidden', !open ? 'hidden' : 'flex' } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
          <a  href="/feed" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >Blog</a>
          <a  href="/loginclient" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >log in as a client</a>
          <a  href="/loginlawyer"className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >log in as a lawyer</a>
          <a  href="/singupclient"className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >sing up as a client </a>
          <a  href="/signuplawyer"className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >sing up as a lawyer </a>

         
        </nav>
      </div>
    </div>
  </div>








</div>

    <body 
  > 
      
   
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800"
    
    style={{backgroundColor:"#ece3ca",marginTop:"50px",width:"500px",marginBottom:"50px",left:"0",right:"0",
    borderRadius: "50px",
    border: "3px solid #222222",
   boxShadow: "4px 4px #222222",

    }}> 
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
            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50"style={{backgroundColor:"#8c0327" ,color:"white"}}>Sign in</button>
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
