/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
// eslint-disable-next-line no-unused-vars
import viteLogo from '/vite.svg'
import './App.css'
import FirstPage from './SignupClient';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Navbar from './navbar';
import Loginclient from './loginclient';
import { Loading } from './loading';
import Loginlawyer from './loginlawyer';
import Signuplawyer from './signuplawyer';
import Mainpage from './mainpage';
import Searchforlawyers from './searchforlawyers';
import LawyerProfile from './lawyerprofile'
import AskingPlace from './Askingplace';
import Feed from './Feed';
import Forum from './forum';
function App() {

  return (
    <Router>
      <Navbar/>
    <Routes>     
    <Route path="/searchforlawyers" exact element={<Searchforlawyers/>} />     

    <Route path="/mainpage" exact element={<Mainpage/>} /> 
    <Route path="/askingplace" exact element={<AskingPlace/>} />   
    <Route path="/feed" exact element={<Feed/>} />     
  
    

      <Route path="/loginclient" exact element={<Loginclient/>} />     
       <Route path="/signupclient" exact element={<FirstPage/>} />

      <Route path="/signuplawyer" exact element={<Signuplawyer/>} />
      <Route path="/loginlawyer" exact element={<Loginlawyer/>} />

      <Route path="/lawyers/:id" element={<LawyerProfile />} />
      <Route path="/feed/:id" element={<Forum />} />



    </Routes>
  </Router>
 
  )
}

export default App
