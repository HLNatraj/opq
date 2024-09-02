import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Batchlist = () => {
    const [batches, setBatches] = useState([]);
    const [newBatch, setNewBatch] = useState({
        name: '',
        start_date: '',
        end_date: '',
        course_id: '' // Assuming batches are linked to courses
    });
    const [editBatch, setEditBatch] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const batchesPerPage = 5;

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getbatches');
            console.log('Batches:', response.data); // Log the fetched data
            setBatches(response.data);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBatch(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditBatch(prevState => ({ ...prevState, [name]: value }));
    };

    const addBatch = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addbatch', {
                course_id: newBatch.course_id,
                batch_name: newBatch.name,
                start_date: newBatch.start_date,
                end_date: newBatch.end_date
            });
            fetchBatches();
            setNewBatch({ name: '', start_date: '', end_date: '', course_id: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding batch:', error);
        }
    };

    const updateBatch = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updatebatch/${editBatch.batch_id}`, editBatch);
            fetchBatches();
            setEditBatch(null);
        } catch (error) {
            console.error('Error updating batch:', error);
        }
    };

    const deleteBatch = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deletebatch/${id}`);
            fetchBatches();
        } catch (error) {
            console.error('Error deleting batch:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current batches
    const indexOfLastBatch = currentPage * batchesPerPage;
    const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
    const filteredBatches = batches.filter(batch =>
        (batch.batch_name ? batch.batch_name.toLowerCase() : '').includes(searchTerm.toLowerCase())
    );
    const currentBatches = filteredBatches.slice(indexOfFirstBatch, indexOfLastBatch);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredBatches.length / batchesPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-center text-blue-700">Batch Manager</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Batch
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search batches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Start Date</th>
                        <th className="py-3 px-6 text-left">End Date</th>
                        <th className="py-3 px-6 text-left">Course ID</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {currentBatches.map(batch => (
                        <tr key={batch.batch_id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editBatch && editBatch.batch_id === batch.batch_id ?
                                    <input type="text" name="name" value={editBatch.name} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    batch.batch_name}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editBatch && editBatch.batch_id === batch.batch_id ?
                                    <input type="date" name="start_date" value={editBatch.start_date} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    batch.start_date}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editBatch && editBatch.batch_id === batch.batch_id ?
                                    <input type="date" name="end_date" value={editBatch.end_date} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    batch.end_date}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editBatch && editBatch.batch_id === batch.batch_id ?
                                    <input type="text" name="course_id" value={editBatch.course_id} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    batch.course_id}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {editBatch && editBatch.batch_id === batch.batch_id ?
                                    <button onClick={updateBatch} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button> :
                                    <button onClick={() => setEditBatch(batch)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                                }
                                <button onClick={() => deleteBatch(batch.batch_id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <ul className="flex justify-center space-x-2">
                    {renderPageNumbers()}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black opacity-50 fixed inset-0"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-xl font-bold mb-4">Add New Batch</h2>
                        <form onSubmit={(e) => { e.preventDefault(); addBatch(); }}>
                            <input type="text" name="name" placeholder="Name" value={newBatch.name} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" required />
                            <input type="date" name="start_date" value={newBatch.start_date} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" required />
                            <input type="date" name="end_date" value={newBatch.end_date} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" required />
                            <input type="text" name="course_id" placeholder="Course ID" value={newBatch.course_id} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" required />
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Batch</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Batchlist;
