/* eslint-disable react/no-unknown-property */

import React, { useState, useEffect } from 'react';
import logo from './—Pngtree—law scales of justice icon_7715744.png';
import guy from'./guy.png';
const Mainpage = () => {
  

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

  <section className="py-8 z-10 font-serif" style={{ height: "100vh" }}>
  <div className="flex flex-col md:flex-row items-center max-w-6xl px-6 py-8 mx-auto" style={{ height: "100%" }}>
    <div className="w-full md:w-1/2 py-8" style={{ height: "100%" }}>
      <h1 className="text-5xl font-bold leading-none text-center">
        Welcome to <br /><span className="text-green-500">AvocatConnect <br /></span> 
      </h1>
    </div>
    <div className="w-full md:w-1/2 py-8" style={{ height: "100%" }}>
      <img src={guy} alt="Person who invests" className="g-imagelol" style={{ width: "100%", height: "100%", borderRadius: "0%", border: "none" }} />
    </div>
  </div>
</section>






</div>

<h1 className="text-5xl font-bold leading-none text-center">our features</h1>

<section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div className="max-w-screen-md mb-8 lg:mb-16">
    </div>
 
    
    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0">
          </g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
            </g><g id="SVGRepo_iconCarrier"> 
            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 
            14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" 
            stroke="#ab8873" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">easy search for lawyers</h3>
        <p className="text-gray-500 dark:text-gray-400">Quickly find the right legal expertise tailored to your needs with our intuitive search functionality.</p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
            </g><g id="SVGRepo_iconCarrier"> <path d="M3 15H21M3 19H13M21 7H13M21 11H13M4.6 
            11H7.4C7.96005 11 8.24008 11 8.45399 10.891C8.64215 10.7951 8.79513 10.6422
             8.89101 10.454C9 10.2401 9 9.96005 9 9.4V6.6C9 6.03995 9 5.75992 8.89101 
             5.54601C8.79513 5.35785 8.64215 5.20487 8.45399 5.10899C8.24008 5 7.96005 
             5 7.4 5H4.6C4.03995 5 3.75992 5 3.54601 5.10899C3.35785 5.20487 3.20487 
             5.35785 3.10899 5.54601C3 5.75992 3 6.03995 3 6.6V9.4C3 9.96005 3 10.2401 
             3.10899 10.454C3.20487 10.6422 3.35785 10.7951 3.54601 10.891C3.75992 11
              4.03995 11 4.6 11Z" stroke="#ab8873" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">document upload and management</h3>
        <p className="text-gray-500 dark:text-gray-400">Streamline your document handling process with seamless upload and efficient management features.</p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" 
          stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.34315 3.34315 2 
             5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 
             22 2 20.6569 2 19V5ZM5 4C4.44772 4 4 4.44772 4 5V10H20V5C20 4.44772 19.5523 
             4 19 4H5ZM4 12V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V12H4ZM14 
             13C14.2652 13 14.5196 13.1054 14.7071 13.2929L18.7071 17.2929C19.0976 17.6834 19.0976 
             18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L14 15.4142L11.
             7071 17.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071C8.90237 
             18.3166 8.90237 17.6834 9.29289 17.2929L9.58579 17L9 16.4142L6.70711 18.7071C6.31658 
             19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.
             2929L8.29289 14.2929C8.48043 14.1054 8.73478 14 9 14C9.26522 14 9.51957 14.1054 9.70711 
             14.2929L11 15.5858L13.2929 13.2929C13.4804 13.1054 13.7348 13 14 13ZM11 7C11 6.44772 
             11.4477 6 12 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H12C11.4477 8 11
              7.55228 11 7ZM7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C
              6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z" fill="#ab8873"></path> </g></svg>        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">posting updates by lawyers</h3>
        <p className="text-gray-500 dark:text-gray-400">Stay informed with timely updates and insights from legal professionals relevant to your business.</p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ab8873"><g id="SVGRepo_bgCarrier"
 stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" 
 stroke-linejoin="round" stroke='#ab8873'>
  </g><g id="SVGRepo_iconCarrier"> <title>profile_round [#1346]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-380.000000, -2119.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M338.083123,1964.99998 C338.083123,1962.79398 336.251842,1960.99998 334,1960.99998 C331.748158,1960.99998 329.916877,1962.79398 329.916877,1964.99998 C329.916877,1967.20599 331.748158,1968.99999 334,1968.99999 C336.251842,1968.99999 338.083123,1967.20599 338.083123,1964.99998 M341.945758,1979 L340.124685,1979 C339.561214,1979 339.103904,1978.552 339.103904,1978 C339.103904,1977.448 339.561214,1977 340.124685,1977 L340.5626,1977 C341.26898,1977 341.790599,1976.303 341.523154,1975.662 C340.286989,1972.69799 337.383888,1970.99999 334,1970.99999 C330.616112,1970.99999 327.713011,1972.69799 326.476846,1975.662 C326.209401,1976.303 326.73102,1977 327.4374,1977 L327.875315,1977 C328.438786,1977 328.896096,1977.448 328.896096,1978 C328.896096,1978.552 328.438786,1979 327.875315,1979 L326.054242,1979 C324.778266,1979 323.773818,1977.857 324.044325,1976.636 C324.787453,1973.27699 327.107688,1970.79799 330.163906,1969.67299 C328.769519,1968.57399 327.875315,1966.88999 327.875315,1964.99998 C327.875315,1961.44898 331.023403,1958.61898 334.733941,1959.04198 C337.422678,1959.34798 339.650022,1961.44698 340.05323,1964.06998 C340.400296,1966.33099 339.456073,1968.39599 337.836094,1969.67299 C340.892312,1970.79799 343.212547,1973.27699 343.955675,1976.636 C344.226182,1977.857 343.221734,1979 341.945758,1979 M337.062342,1978 C337.062342,1978.552 336.605033,1979 336.041562,1979 L331.958438,1979 C331.394967,1979 330.937658,1978.552 330.937658,1978 C330.937658,1977.448 331.394967,1977 331.958438,1977 L336.041562,1977 C336.605033,1977 337.062342,1977.448 337.062342,1978" id="profile_round-[#1346]"> </path> </g> </g> </g> </g></svg>        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">accessive profile for lawyers</h3>
        <p className="text-gray-500 dark:text-gray-400">Showcase your expertise and credentials effectively with our comprehensive lawyer profile feature.</p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        <svg fill="#ab8873" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M161.7,156v-13.4c-1.3-15.5-19.3-15.3-19.3-15.3H114c-20.4,0.4-19.7,15.3-19.7,15.3V156H161.7z"></path> <path d="M108.7,52.2h3.3l0,15h31.6V52.1l3.4,0v15.2h10.5V49.9c-1.2-13.7-17-13.5-17-13.5H132l-3.4,5.6l-3.4-5.6h-9.7 c-17.9,0.3-17.3,13.5-17.3,13.5v17.3h10.5V52.2z"></path> <rect x="87.1" y="69.6" width="81.6" height="12"></rect> <circle cx="128.6" cy="19.9" r="12.5"></circle> <path d="M163.6,140.8V156h67.4v-15.2c-1.3-15.5-19.3-15.3-19.3-15.3h-28.4C162.8,125.9,163.6,140.8,163.6,140.8z"></path> <path d="M198.1,121c7.8,0,14.2-6.4,14.2-14.2c0-7.8-6.3-14.2-14.2-14.2c-7.8,0-14.2,6.3-14.2,14.2C183.9,114.6,190.3,121,198.1,121 z"></path> <path d="M15.9,162.2v23.5h12.9v62.9h198.3v-62.9c0,0,6.5,0,13,0v-23.5H15.9z"></path> <path d="M152.1,121l6.9-36.3H96.7l7,36.5c2.8-1.2,5.9-2,9.5-2.3c-2-3-3.2-6.6-3.2-10.5c0-10.5,8.5-19,19-19 c10.5,0,19.1,8.6,19.1,19c0,3.9-1.2,7.5-3.2,10.6C147.1,119.3,149.6,119.9,152.1,121z"></path> <path d="M92.5,156v-13.4c-1.3-15.5-19.3-15.3-19.3-15.3H44.8c-20.3,0.4-19.6,15.3-19.6,15.3l0,13.4H92.5z"></path> <circle cx="128.9" cy="108.6" r="14.2"></circle> <circle cx="59.7" cy="108.6" r="14.2"></circle> </g> </g></svg>        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">hire a lawyer for legal service</h3>
        <p className="text-gray-500 dark:text-gray-400">Access top-tier legal services tailored to your specific requirements with ease and confidence.</p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <path d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16" stroke="#ab8873" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
</svg>
  </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">forums for asking questions</h3>
        <p className="text-gray-500 dark:text-gray-400">Engage in collaborative discussions, seek advice, and share knowledge within our vibrant community forums.</p>
      </div>
    </div>
  </div>
</section>


   

</React.Fragment>
 );
};

export default Mainpage;
