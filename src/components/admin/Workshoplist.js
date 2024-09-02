import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkshopList = () => {
    const [workshops, setWorkshops] = useState([]);
    const [newWorkshop, setNewWorkshop] = useState({
        title: '',
        agenda: '',
        date: '',
        time: '',
        price: '',
        image: '',
        link: '',
        description: ''
    });
    const [editWorkshop, setEditWorkshop] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const workshopsPerPage = 3;

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getWorkshops');
            setWorkshops(response.data);
        } catch (error) {
            console.error('Error fetching workshops:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorkshop(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditWorkshop(prevState => ({ ...prevState, [name]: value }));
    };

    const addWorkshop = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addWorkshop', newWorkshop);
            fetchWorkshops();
            setNewWorkshop({
                title: '',
                agenda: '',
                date: '',
                time: '',
                price: '',
                image: '',
                link: '',
                description: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding workshop:', error);
        }
    };

    const updateWorkshop = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updateWorkshop/${editWorkshop.id}`, editWorkshop);
            fetchWorkshops();
            setEditWorkshop(null);
        } catch (error) {
            console.error('Error updating workshop:', error);
        }
    };

    const deleteWorkshop = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deleteWorkshop/${id}`);
            fetchWorkshops();
        } catch (error) {
            console.error('Error deleting workshop:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current workshops
    const indexOfLastWorkshop = currentPage * workshopsPerPage;
    const indexOfFirstWorkshop = indexOfLastWorkshop - workshopsPerPage;
    const filteredWorkshops = workshops.filter(workshop =>
        (workshop.title ? workshop.title.toLowerCase() : '').includes(searchTerm.toLowerCase())
    );
    const currentWorkshops = filteredWorkshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredWorkshops.length / workshopsPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => (
            <li key={number} className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-gray-300' : 'bg-white'}`}>
                <button onClick={() => handlePageChange(number)}>
                    {number}
                </button>
            </li>
        ));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-center text-blue-700">Workshop Manager</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Workshop
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search workshops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="overflow-x-auto w-full max-w-5xl mx-auto">
                <table className="min-w-full bg-white border border-gray-200 w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 text-left whitespace-nowrap">Title</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Agenda</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Date</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Time</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Price</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Image</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Link</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Description</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {currentWorkshops.map(workshop => (
                            <tr key={workshop.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <input type="text" name="title" value={editWorkshop.title} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        workshop.title}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <textarea name="agenda" value={editWorkshop.agenda} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        workshop.agenda}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <input type="date" name="date" value={editWorkshop.date} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        new Date(workshop.date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <input type="text" name="time" value={editWorkshop.time} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        workshop.time}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <input type="number" name="price" value={editWorkshop.price} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        workshop.price}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <input type="text" name="image" value={editWorkshop.image} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        <img src={workshop.image} alt={workshop.title} className="w-16 h-16 object-cover" />}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <input type="text" name="link" value={editWorkshop.link} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        <a href={workshop.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{workshop.link}</a>}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <textarea name="description" value={editWorkshop.description} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        workshop.description}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ?
                                        <>
                                            <button onClick={updateWorkshop} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Save</button>
                                            <button onClick={() => setEditWorkshop(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                                        </> :
                                        <>
                                            <button onClick={() => setEditWorkshop(workshop)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                            <button onClick={() => deleteWorkshop(workshop.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <ul className="flex">
                    {renderPageNumbers()}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add New Workshop</h2>
                        <input type="text" name="title" value={newWorkshop.title} onChange={handleInputChange} placeholder="Title" className="border p-2 rounded w-full mb-2" />
                        <textarea name="agenda" value={newWorkshop.agenda} onChange={handleInputChange} placeholder="Agenda" className="border p-2 rounded w-full mb-2" />
                        <input type="date" name="date" value={newWorkshop.date} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
                        <input type="text" name="time" value={newWorkshop.time} onChange={handleInputChange} placeholder="Time" className="border p-2 rounded w-full mb-2" />
                        <input type="number" name="price" value={newWorkshop.price} onChange={handleInputChange} placeholder="Price" className="border p-2 rounded w-full mb-2" />
                        <input type="text" name="image" value={newWorkshop.image} onChange={handleInputChange} placeholder="Image URL" className="border p-2 rounded w-full mb-2" />
                        <input type="text" name="link" value={newWorkshop.link} onChange={handleInputChange} placeholder="Link" className="border p-2 rounded w-full mb-2" />
                        <textarea name="description" value={newWorkshop.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded w-full mb-2" />
                        <div className="flex justify-end">
                            <button onClick={addWorkshop} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Add</button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkshopList;
