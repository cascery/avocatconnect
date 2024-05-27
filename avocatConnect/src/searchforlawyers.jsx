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
    <React.Fragment> 
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
    <div>
    <section className="bg-gray-900 text-black"style={{backgroundColor:"white"}}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center"style={{backgroundColor:"white" ,color:"back"}}>
         
        </div>
  
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"  >
          {results.length > 0 ? (
            results.map((lawyer) => (
              <div className="col-md-6 item" key={lawyer.id}>
                <div className="item-in">
                  <a
                    href={`/lawyers/${lawyer.id}`}
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                  >
                    <img style={{borderStyle:"none"}}
                      src={lawyer.profilePic ? lawyer.profilePic : placeholderImage}
                      alt={`${lawyer.name} ${lawyer.lastname}`}
                    />
                    <h2 className="mt-4 text-xl font-bold text-black">
                      {lawyer.name} {lawyer.lastname}
                    </h2>
                    <p className="mt-1 text-sm text-black-300">
                      Check Profile <i className="fa fa-long-arrow-right"></i>
                    </p>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
  
        <div className="mt-12 text-center">
         
        </div>
      </div>
    </section>
  </div>
  </React.Fragment>
  );
};

export default Searchforlawyers;
