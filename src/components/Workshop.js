import React from 'react';
import { FaCalendar, FaArrowRight } from 'react-icons/fa';

const workshops = [
  {
    id: 1,
    title: 'AWS webinar',
    agenda: 'Introduction to Cloud technology and AWS',
    date: '04-Aug-2024',
    time: '7:00 AM - 9:00 AM',
    price: '₹ 99',
    image: 'https://api.opqbootcamp.com/ImgUpload/420147_1000113590.jpg',
    link: '/workshop/aws-webinar/5'
  }
  // Add more workshops as needed
];

const Workshop = () => {
  return (
    <div>
      <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Workshop</h1>
          <ol className="breadcrumb text-center">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active text-white" aria-current="page">Workshops</li>
          </ol>
        </div>
      </section>

      <section className="py-12 workshop-lists">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 mx-auto">
              {workshops.map(workshop => (
                <div key={workshop.id} className="card overflow-hidden mb-8 shadow-lg workshop-box">
                  <div className="md:flex">
                    <div className="item-card9-img md:w-1/3">
                      <a href={workshop.link}>
                        <img src={workshop.image} alt={workshop.title} className="w-full h-48 object-cover" />
                      </a>
                    </div>
                    <div className="card-body p-4 md:w-2/3">
                      <div className="top-sec mb-4">
                        <h3 className="text-xl font-bold text-gray-900"><a href={workshop.link} className="hover:text-blue-500">{workshop.title}</a></h3>
                        <p className="text-gray-700">{workshop.agenda}</p>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <h4 className="date text-gray-700 flex items-center">
                              <FaCalendar className="mr-2" aria-hidden="true" />
                              {workshop.date} <small>({workshop.time})</small>
                            </h4>
                            <h4 className="price text-gray-900 font-bold">{workshop.price}</h4>
                          </div>
                          <div className="btn-text">
                            <a href={workshop.link} className="text-blue-500 hover:text-blue-700 flex items-center">
                              <FaArrowRight className="mr-2" aria-hidden="true" />
                              Learn More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;
