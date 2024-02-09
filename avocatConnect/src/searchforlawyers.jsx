/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './searchlawyer.css';
const Searchforlawyers = () => {

  
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
    console.log(results); // Log results whenever it changes
  }, [results]); // Trigger the effect whenever results change


  return (
    <div>
  <h2>Search Lawyers</h2>
  <input
    type="text"
    placeholder="Search for a lawyer..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button onClick={handleSearch}>Search</button>
  <div className="lawyer-container">
    {results.length > 0 ? (
      results.map((lawyer) => (
        <div key={lawyer.id} className="lawyer-item">
          <div className="lawyer-info">
            {lawyer.profilePhoto ? (
              <img
                src={`data:image/png;base64,${lawyer.profilePhoto}`}
                alt={`${lawyer.nom} profile`}
              />
            ) : (
              <div>No profile photo available</div>
            )}
            <Link className='link' to={`/lawyers/${lawyer.id}`}>
  <div className="lawyer-name">
    {lawyer.nom} {lawyer.prenom}
  </div>
</Link>
          </div>
        </div>
      ))
    ) : (
      <p>No results found</p>
    )}
  </div>
</div>
  );
};

export default Searchforlawyers;
