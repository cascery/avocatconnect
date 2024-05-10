/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './searchlawyer.css';

import placeholderImage from './images.png'; // Adjust the path accordingly

const Searchforlawyers = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('searchQuery', searchQuery);

      const response = await fetch('http://localhost/avocatConnect/avocatConnect/src/searchforlawyers.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      if (data && data.lawyers) {
        setResults(data.lawyers);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div>
      <section className="title container">
        <div className="row">
<h1></h1>        </div>
      </section>

      {/* Start Blog Layout */}
      <div className="container">
        {results.length > 0 ? (
          results.map((lawyer) => (
            <div className="row" key={lawyer.id}>
              <div className="col-md-6 item">
                <div className="item-in">
                  <h4>
                  <img src={lawyer.profilePic ? lawyer.profilePic : placeholderImage}
                  alt={`${lawyer.name} ${lawyer.lastname}`} />

                    {lawyer.name} {lawyer.lastname}
                  </h4>
                  <div className="seperator"></div>
                  <p>
                   {lawyer.bio}
                  </p>
                  <a href={`/lawyers/${lawyer.id}`}>
                   check profile <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
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
