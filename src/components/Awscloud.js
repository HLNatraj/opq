import React, { useState } from 'react';
import { FaCloud, FaBriefcase, FaUniversity, FaList, FaArrowRight } from 'react-icons/fa';

const Awscloud = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AWS Cloud Practitioner</h1>
          <ol className="breadcrumb text-center">
            <li className="breadcrumb-item"><a href="/">Course</a></li>
            <li className="breadcrumb-item active text-white" aria-current="page">Course Information</li>
          </ol>
        </div>
      </section>
      
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="md:w-2/3 p-4">
          <div className="course-overview">
            <h2 className="text-2xl font-bold mb-4">Course <strong>Overview</strong></h2>
            <div>AWS Cloud computing refers to the supply of IT resources over the internet on demand. This reduces the expense of maintaining physical data centres and servers by allowing organisations to use cloud providers such as Amazon Web Services to obtain upgraded technological services such as processing power, storage, and databases on an as-needed basis. The Cloud Practitioner training at OPQ Tech is a beginner-intermediate level course for professionals who want to learn more about Cloud computing.</div>
            <div className="my-4"></div>
            <h3 className="text-xl font-semibold mb-2">Course Details</h3>
            <p className="text-sm mb-4">
              The course covers essential areas including cloud principles, security, technology, and billing and pricing.
            </p>
            <h4 className="text-lg font-semibold mb-2">Course Objectives</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>The Amazon Web Services AWS Cloud and the world's basic infrastructure</li>
              <li>Describe AWS Cloud's basic architecture principles</li>
              <li>Describe AWS Cloud's value proposition</li>
              <li>Describe the most common use cases for the platform's core services</li>
              <li>Describe the basic security and compliance aspects of the platform</li>
              <li>Pricing models, billing, and account management</li>
              <li>Where to find documentation and technical help</li>
              <li>Basic/core elements of installing and working in AWS Cloud</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">Intended Audience</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Sales</li>
              <li>Legal</li>
              <li>Marketing</li>
              <li>Business analysts</li>
              <li>Project managers</li>
              <li>C-level executives</li>
              <li>AWS Academy students</li>
              <li>Other IT-related professionals</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">Course Prerequisites</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Platform knowledge</li>
              <li>AWS Cloud experience of at least six months</li>
              <li>Basic understanding of IT services and cloud usage</li>
              <li>Basic services knowledge, including use cases, billing, pricing models, and security concepts</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">OPQ Tech Cloud Practitioner Certification Course</h4>
            <p className="mb-4">
              The AWS Cloud Practitioner certification verifies knowledge of the Amazon Web Services cloud platform. This certification is for individuals who want to learn the fundamentals of cloud computing with a focus on AWS. It provides a competitive edge in the job market with comprehensive self-study tools and training courses.
            </p>
            <h4 className="text-lg font-semibold mb-2">Key Features</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>AWS Cloud Practitioner Certification Training with an Instructor</li>
              <li>Course preview to get started on your preparation</li>
              <li>Key materials supplied to learners</li>
              <li>Accredited course content developed by SMEs</li>
              <li>Expert teachers with real-world skills</li>
              <li>Industry-recognized course completion certificate</li>
              <li>Training available online and accessible worldwide</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">Who Can Take Up This Training?</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>IT Administrators</li>
              <li>Cloud Administrators</li>
              <li>Database Administrators</li>
              <li>Business Analysts</li>
              <li>Project Managers</li>
              <li>Engineers</li>
              <li>IT Professionals</li>
              <li>CXOs</li>
              <li>Sales and Marketing Professionals</li>
              <li>Aspiring Cloud Computing Professionals</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">Learning Objectives</h4>
            <p className="mb-4">
              The course provides a fundamental understanding of AWS cloud concepts, preparing professionals to participate confidently in cloud activities.
            </p>
            <h4 className="text-lg font-semibold mb-2">Benefits</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Demonstrate fundamental understanding of AWS cloud computing to employers</li>
              <li>Advanced level certifications are available to further strengthen skills</li>
              <li>Gain hands-on experience to increase earning potential</li>
              <li>Baseline certification improves job prospects and salary</li>
            </ul>
          </div>
        </div>
        
        <div className="md:w-1/3 p-4 sticky top-16 max-h-screen">
          <div className="card border p-4 rounded bg-white shadow-md">
            <div className="card-body">
              <img src="https://api.opqbootcamp.com/ImgUpload/873224_f1.jpg" alt="img" className="w-full h-auto border rounded mb-4" />
              <div className="mt-4 mb-4">
                <button onClick={handleFormToggle} className="w-full bg-gray-500 text-white py-2 rounded mb-4 flex items-center justify-between">
                  <span>Enroll Now</span>
                  <FaArrowRight />
                </button>
              </div>
              <div className="features mt-6 space-y-4">
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaCloud size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Cloud computing concepts with real-world applications</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaBriefcase size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Practical training with industry-recognized certification</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaUniversity size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Comprehensive materials and self-study tools</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaList size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Detailed course content developed by experts</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Enrollment Form</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input type="text" id="name" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="email" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium mb-1">Contact Number</label>
                <input type="text" id="contact" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                <input type="text" id="city" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleFormToggle} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Awscloud;
