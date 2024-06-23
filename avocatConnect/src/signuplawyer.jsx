/* eslint-disable no-unused-vars */
import React from 'react';
import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css'
  const algerianCities = [
    'Adrar', 'Aflou', 'Aïn Beïda', 'Aïn Defla', 'Aïn Témouchent', 'Algiers', 'Annaba', 'Barika', 'Batna',
    'Béchar', 'Béjaïa', 'Beni Saf', 'Birkhadem', 'Blida', 'Bordj Bou Arréridj', 'Bordj El Kiffan',
    'Bordj Menaiel', 'Bouïra', 'Boufarik', 'Bouira', 'Boumerdès', 'Chlef', 'Constantine', 'Djelfa',
    'Douera', 'Draa El Mizan', 'El Achir', 'El Bayadh', 'El Eulma', 'El Hadjar', 'El Khroub', 'El Oued',
    'El Tarf', 'Ghardaïa', 'Guelma', 'Hadjout', 'Hassi Messaoud', 'Héliopolis', 'I-n-Salah', 'Jijel',
    'Khemis Miliana', 'Khemis-El-Khechna', 'Khenchela', 'Laghouat', 'Larbaâ', 'M\'Sila', 'Mascara',
    'Médéa', 'Mekla', 'Mila', 'Mostaganem', 'Msila', 'Ouargla', 'Oum el Bouaghi', 'Relizane', 'Rouiba',
    'Saïda', 'Sétif', 'Sidi Bel Abbès', 'Skikda', 'Sougueur', 'Souk Ahras', 'Sour El-Ghozlane', 'Tamalous',
    'Tamanrasset', 'Tebessa', 'Tiaret', 'Timimoun', 'Tindouf', 'Tipasa', 'Tissemsilt', 'Tizi Ouzou', 'Tlemcen',
    'Tolga', 'Zeralda',
   
  ];



  const lawyerSpecialties = [
    'Droit des personnes' ,
     'Droit immobilier',
     'Droit administratif',
    'Droit rural',
    'Droit de l\'environnement',
    'Droit public',
    'Droit de la propriété intellectuelle',
    'Droit commercial',
    'Droit des sociétés',
    'Droit fiscal',
    'Droit social',
    'Droit économique',
    'Droit des mesures d\'exécution',
    'Droit communautaire'
  ];







const Signuplawyer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [years, setyears] = useState('');

  const [password, setPassword] = useState('');

  const [name, setname] = useState('');
  const [lastname, setlastname] = useState('');
  const [birth, setbirth] = useState('');
  const [adress, setadress] = useState('');
  const [username, setusername] = useState('');
  const [wilaya, setwilaya] = useState('');
  const [phone, setphone] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [education, seteducation] = useState('');

const [selectedSpecialty, setSelectedSpecialty] = useState('');

  
  const handleFormSubmit = (event) => {
    event.preventDefault(); 

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('adress', adress);
 formData.append('birth', birth);
    formData.append('phone', phone);
    formData.append('username', username);
    formData.append('years', years);
    formData.append('education', education); // Add education to formData
    formData.append('city', selectedCity);
    formData.append('specialty', selectedSpecialty);


    fetch('https://avocatconnect.000webhostapp.com/signuplawyer.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
window.location.href='/feed';
          console.log("userid",responseData.userID);

          document.cookie = `userID=${responseData.userID}; path=/`;
          document.cookie = `userType=lawyer; path=/`;
          sessionStorage.setItem('lawyerId', responseData.userID);
          sessionStorage.setItem('userType', "lawyer");   
        
        } else {
          alert('Signup failed!');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
     
  };

  return (

<div className='lmao'>
<div className='titleholder'>
<div className='titlediv'> </div>

</div>

    <div className="page-content">
      <div className="form-v10-content">
        <form className="form-detail" action="#" method="post" id="myform"  onSubmit={handleFormSubmit}>


          <div className="form-left">

      
            <h2>General Information</h2>
            

          
            <div className="form-group">
              <div className="form-row form-row-1">
                <input type="text" name="first_name" id="first_name" className="input-text" placeholder="First Name" required 
                
                value={name}
                onChange={(e) => setname(e.target.value)}
                
                />
              </div>
              <div className="form-row form-row-2">
                <input type="text" name="last_name" id="last_name" className="input-text" placeholder="Last Name" required 
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                />
              </div>
            </div>



           <div className="form-row">
              <input type='date' name="birth" className="birth"  placeholder="birth" required
              
              value={birth}
              onChange={(e) => setbirth(e.target.value)}
              />
            </div>




            <div className="form-row">
              <input type='text' name="phonenumber" className="phonenumber" id="phonenumber" placeholder="phone number" required
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              
              />
            </div>

           


            <div className="form-row">
      <select id="algerianCities" name="algerianCities"
      
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      
      >        {algerianCities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
    
            </div>

            <div className="form-row">
  <select
    id="specialite"
    name="specialite"
    value={selectedSpecialty}
    onChange={(e) => setSelectedSpecialty(e.target.value)}
  >
    <option value="" disabled selected>specialite</option>
    {lawyerSpecialties.map((spes, index) => (
      <option key={index} value={index}>{spes}</option>
    ))}
  </select>
  {console.log(selectedSpecialty)}
</div>


            <div className="form-row">
              <input type='text' name="phonenumber" className="phonenumber" placeholder="years worked" required
                value={years}
                onChange={(e) => setyears(e.target.value)}
              
              />
            </div>





            <div className="form-row">
              <input type='text' name="adress" className="adress" id="adress" placeholder="localisation" required
                  value={adress}
                  onChange={(e) => setadress(e.target.value)}
              
              />
            </div>
          
            <div className="form-row">
              <input type='text' name="adress" className="adress" id="adress" placeholder=" education" required
                  value={education}
                  onChange={(e) => seteducation(e.target.value)}
              
              />
            </div>

          
          </div>
          <div className="form-right">
            <h2>Create an account</h2>
            <div className="form-row">
              <input type="email" name="email" className="email" id="email" placeholder="email" required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input type="text" name="username" className="username" id="user name" placeholder="user name" required
              
              value={username}
              onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input type="text" name="password" className="password" id="password" placeholder="password" required 
              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input type="text" name="password" className="password" id="password" placeholder="confirm password" required />
            </div>
          
            <div className="form-row-last">
              <input type="submit" name="register" className="register" value="join" />
            </div>
          </div>
        </form>
      </div>
    </div></div>
  );
};

export default Signuplawyer;
