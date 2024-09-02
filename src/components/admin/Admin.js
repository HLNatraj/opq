import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [editAdmin, setEditAdmin] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const adminsPerPage = 5;

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getadmins');
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditAdmin(prevState => ({ ...prevState, [name]: value }));
    };

    const addAdmin = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addadmin', newAdmin);
            fetchAdmins();
            setNewAdmin({ username: '', password: '', email: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    const updateAdmin = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updateadmin/${editAdmin.admin_id}`, editAdmin);
            fetchAdmins();
            setEditAdmin(null);
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    const deleteAdmin = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deleteadmin/${id}`);
            fetchAdmins();
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current admins
    const indexOfLastAdmin = currentPage * adminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
    const filteredAdmins = admins.filter(admin =>
        (admin.username ? admin.username.toLowerCase() : '').includes(searchTerm.toLowerCase())
    );
    const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredAdmins.length / adminsPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-center text-blue-700">Admin Manager</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Admin
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Username</th>
                        <th className="py-3 px-6 text-left">Password</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {currentAdmins.map(admin => (
                        <tr key={admin.admin_id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editAdmin && editAdmin.admin_id === admin.admin_id ?
                                    <input type="text" name="username" value={editAdmin.username} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    admin.username}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editAdmin && editAdmin.admin_id === admin.admin_id ?
                                    <input type="password" name="password" value={editAdmin.password} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    admin.password}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editAdmin && editAdmin.admin_id === admin.admin_id ?
                                    <input type="email" name="email" value={editAdmin.email} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    admin.email}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editAdmin && editAdmin.admin_id === admin.admin_id ?
                                    <>
                                        <button
                                            onClick={updateAdmin}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditAdmin(null)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </> :
                                    <>
                                        <button
                                            onClick={() => setEditAdmin(admin)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteAdmin(admin.admin_id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>}
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
                        <input
                            type="text"
                            name="username"
                            value={newAdmin.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="password"
                            name="password"
                            value={newAdmin.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="email"
                            name="email"
                            value={newAdmin.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <button
                            onClick={addAdmin}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Add Admin
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
