import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Element } from 'react-scroll';
import Navbar1 from './components/Navbar1'; 
// import Home from './components/Home'; 
import Aboutus from './components/Aboutus';
 import Fullstack from './components/Fullstack';
import Awscloud from './components/Awscloud';
import Devops from './components/Devops';
import Workshop from './components/Workshop';
import Bloglist from './components/Bloglist';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Login from './components/Login';
import Footer from './components/Footer'
// import Courses from './components/Courses';
import MainPage from './components/Mainpage';

const App = () => {
  return (
    <Router>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/courses/full-stack-developer" element={<Fullstack />} />
        <Route path="/courses/aws-cloud-practitioner" element={<Awscloud />}/>
        <Route path="/courses/devops-bootcamp" element={<Devops />} />  
        <Route path="/workshops" element={<Workshop />} />
        <Route path="/blogs" element={<Bloglist />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/login" element={<Login />} />
      </Routes>
     
      <Footer/>
    </Router>

  );
};

export default App;
