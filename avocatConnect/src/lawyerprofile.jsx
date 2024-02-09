/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import emptypfp from './images.png'
import './lawyerprofile.css'
const LawyerProfile =()=>{


    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [lawyerProfile, setLawyerProfile] = useState(null);
    const [lol, setlol] = useState(null);

  
    useEffect(() => {
      const fetchLawyerProfile = async () => {
        try {
          const formData = new FormData();
          formData.append('id', id);
          
          const response = await fetch(`http://localhost/avocatConnect/avocatConnect/src/lawyerprofile.php?id=${id}`, {
            method: 'POST',
            body: formData,
          });
  
          const data = await response.json();
          console.log('Fetched data:', data);
          
          if (Object.keys(data).length !== 0) {
            setLawyerProfile(data);
            console.log("loggin lawyerprofile inside suseeffect",lawyerProfile);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching lawyer profile:', error);
          setLoading(false);
        }
      };
  
      fetchLawyerProfile();
    }, [id]);

    console.log('Component rendering...');

    return (
      
      <div>



        {lawyerProfile && Object.keys(lawyerProfile).length > 0  ? (
<div>
  
<div className="sidenav">
        <div className="profile">
        {lawyerProfile && lawyerProfile.lawyers && lawyerProfile.lawyers.length > 0 && (
        <img
          className="lmao"
          src={
            lawyerProfile.lawyers[0].profilePhoto
              ? `data:image/png;base64,${lawyerProfile.lawyers[0].profilePhoto}`
              : emptypfp // Display emptypfp when profilePhoto is not available
          }
          alt={
            lawyerProfile.lawyers[0].nom
              ? `${lawyerProfile.lawyers[0].nom} profile`
              : 'Default Profile' // Alt text for default profile image
          }
        />
      )}



          <div className="job">
          {lawyerProfile.lawyers[0].nom}   {lawyerProfile.lawyers[0].prenom}
          </div>
        </div>

        <div className="sidenav-url">
          <div className="url">
            <a href="#profile" className="active">Profile</a>
            <hr align="center" />
          </div>
          <button className='btn'></button>
        </div>
      </div>

      {/* Main */}
      <div className="main">
  
        <h2>IDENTITY</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
            <table>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>:</td>
                {lawyerProfile.lawyers[0].nom}
             
                  <td></td>
                </tr>
                <tr>
                  <td>last Name</td>
                  <td>:</td>
                  {lawyerProfile.lawyers[0].prenom}
                  <td></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>            
                      {lawyerProfile.lawyers[0].email}

                  <td></td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>        
                            {lawyerProfile.lawyers[0].adressCabinet}

                  <td></td>
                </tr>
                <tr>
                  <td>speciality</td>
                  
                  <td>:</td>
                  {lawyerProfile.lawyers[0].specialite}
                  <td></td>
                </tr>
                <tr>
                  <td>tel number</td>
                  <td>:</td>
                {lawyerProfile.lawyers[0].tel}
                  <td></td>
                </tr>

                <tr>
                  <td>education</td>
                  <td>:</td>
                  {lawyerProfile.lawyers[0].education}
                  <td></td>
                </tr>

                 
                <tr>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

       
      </div>
      {/* End Main */}
    </div> 
     ): (
      <p>Loading...</p>
    )}

</div>
    );
}
export default LawyerProfile;