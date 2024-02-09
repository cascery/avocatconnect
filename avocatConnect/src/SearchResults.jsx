/* eslint-disable no-unused-vars */
// SearchResults.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './searchlawyer.css'

const SearchResults = ({ results }) => {
  return (
    <div  className='search-results'>
      <ul className="myUL">
        {results.map((lawyer) => (
          <li key={lawyer.id} >
            <div >
              {lawyer.profilePhoto ? (
                <img
                  src={`data:image/png;base64,${lawyer.profilePhoto}`}
                  alt={`${lawyer.nom} profile`}
                  className="profile-photo"
                />
              ) : (
                <div>No profile photo available</div>
              )}
              <Link className='link' to={`/lawyers/${lawyer.id}`}>
                <div >
                  {lawyer.nom} {lawyer.prenom}
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      profilePhoto: PropTypes.string,
      nom: PropTypes.string.isRequired,
      prenom: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchResults;
