import React from 'react';
import logo from 'F:/mern/React/OPQ/my-opq/src/opq-logo.png'; 

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#">
            <img src={logo} alt="Logo" className="h-10" />
          </a>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2">Home</a>
          <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2">About Us</a>
          <div className="relative group">
            <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2 inline-flex items-center">
              Courses
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <div className="absolute hidden group-hover:block bg-white shadow-lg px-3 py-2 space-y-2">
              <a href="#" className="block text-gray-800 hover:text-blue-500 px-2 py-1 text-sm">Full Stack Developer Course</a>
              <a href="#" className="block text-gray-800 hover:text-blue-500 px-2 py-1 text-sm">AWS Cloud Practitioner</a>
              <a href="#" className="block text-gray-800 hover:text-blue-500 px-2 py-1 text-sm">DevOps Bootcamp</a>
            </div>
          </div>
          <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2">Workshops</a>
          <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2">Blogs</a>
          <div className="relative group">
            <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2 inline-flex items-center">
              Contact
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <div className="absolute hidden group-hover:block bg-white shadow-lg px-3 py-2 space-y-2">
              <a href="#" className="block text-gray-800 hover:text-blue-500 px-2 py-1 text-sm">Contact Us</a>
              <a href="#" className="block text-gray-800 hover:text-blue-500 px-2 py-1 text-sm">FAQ's</a>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-600">Login</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
