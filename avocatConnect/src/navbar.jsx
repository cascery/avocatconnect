/* eslint-disable no-unused-vars */

import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchResults from './SearchResults'; 
function Navbar() {

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const formData = new FormData();
      formData.append('searchQuery', search);

      const response = await fetch(`http://localhost/avocatConnect/avocatConnect/src/searchforlawyers.php?${new URLSearchParams(formData).toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
      const data = await response.json();
      setResults(data.lawyers);
      console.log(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    console.log(results);
    console.log(results); 
  }, [results]);



  return (
   <div>

<div className="topnav">
  <a className="active" href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <div className="search-container">
   
  <div className="search-box">
    <div className='a'>
    <button  className="btn-search" onClick={handleSearch}><i className="fas fa-search"></i></button>
    <input value={search}
    onChange={(e) => setSearch(e.target.value)} type="text" className="input-search" placeholder="Type to Search..." />
  </div>
  <div className='b'>
  <SearchResults results={results} />
  </div>
  </div>
 {/* Pass 'results' state to SearchResults component */}
  </div>
</div>


   </div>
  );
}

export default Navbar;