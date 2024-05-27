/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import NavbarClient from './NavbarClient'; // Import the Navbar component for clients
import Loginclient from './loginclient';
import Loginlawyer from './loginlawyer';
import FirstPage from './SignupClient';
import Signuplawyer from './signuplawyer';
import Mainpage from './mainpage';
import Searchforlawyers from './searchforlawyers';
import LawyerProfile from './lawyerprofile';
import AskingPlace from './Askingplace';
import Feed from './Feed';
import Forum from './forum';
import Editprofilelawyer from './editprofilelawyer';
import SelfProfileLawyer from './selfprofilelawyer';
import RequestsTab from './request';
import ConfigureRequest from './ConfigureRequest';
import FetchDocuments from './FetchDocuments';
import PostAnn from './PostAnn';
import Announcements from './announcements';
import EditProfile from './EditProfile';
import Reunions from './reunions';
import EditProfileClient from './EditprofileCli';
import ManageFiles from './managefiles';
import ForumNotificationModal from './Forumnotificationmodal';
import AcceptedRequests from './RequestResult';

function App() {

  
  // Retrieve user type from session storage
  const userType = sessionStorage.getItem('userType'); 
  
  const isLoggedIn = userType === 'client' || userType === 'lawyer';


  return (
    <Router>
      {/* Conditional rendering of Navbar based on user type */}
      {isLoggedIn && (userType === 'client' ? <NavbarClient /> : <Navbar />)}      
      <Routes>
      <Route path="/reunioNcli" exact element ={<AcceptedRequests/>}/>

        <Route path="/notification" exact element ={<ForumNotificationModal/>}/>
      <Route path="/editprofilecli" exact element={<EditProfileClient />} />
      <Route path="/managefiles" exact element={<ManageFiles />} />

        <Route path="/reunions" exact element={<Reunions />} />
        <Route path="/search" exact element={<Searchforlawyers />} />
        <Route path="/announcement" exact element={<Announcements />} />
        <Route path="/editprofile" exact element={<EditProfile />} />
        <Route path="/postannouncement" exact element={<PostAnn />} />
        <Route path="/mainpage" exact element={<Mainpage />} />
        <Route path="/requests" exact element={<RequestsTab />} />
        <Route path="/fetchdocs" exact element={<FetchDocuments />} />
        <Route path="/profile" exact element={<SelfProfileLawyer />} />
        <Route path="/askingplace" exact element={<AskingPlace />} />
        <Route path="/feed" exact element={<Feed />} />
        <Route path="/editprofilelawyer" exact element={<Editprofilelawyer />} />
        <Route path="/configure-request/:serviceRequestId" element={<ConfigureRequest />} />
        <Route path="/loginclient" exact element={<Loginclient />} />
        <Route path="/signupclient" exact element={<FirstPage />} />
        <Route path="/signuplawyer" exact element={<Signuplawyer />} />
        <Route path="/loginlawyer" exact element={<Loginlawyer />} />
        <Route path="/lawyers/:id" element={<LawyerProfile />} />
        <Route path="/feed/:id" element={<Forum />} />
      </Routes>
    </Router>
  );
}

export default App;
