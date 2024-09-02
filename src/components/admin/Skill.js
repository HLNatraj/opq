import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Skill = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [editSkill, setEditSkill] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const skillsPerPage = 5;

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getskills');
            setSkills(response.data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewSkill(e.target.value);
    };

    const handleEditInputChange = (e) => {
        setEditSkill({ ...editSkill, name: e.target.value });
    };

    const addSkill = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addskill', { name: newSkill });
            fetchSkills();
            setNewSkill('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    const updateSkill = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updateskill/${editSkill.skill_id}`, { name: editSkill.name });
            fetchSkills();
            setEditSkill(null);
        } catch (error) {
            console.error('Error updating skill:', error);
        }
    };

    const deleteSkill = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deleteskill/${id}`);
            fetchSkills();
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current skills
    const indexOfLastSkill = currentPage * skillsPerPage;
    const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
    const filteredSkills = skills.filter(skill =>
        (skill.name ? skill.name.toLowerCase() : '').includes(searchTerm.toLowerCase())
    );
    const currentSkills = filteredSkills.slice(indexOfFirstSkill, indexOfLastSkill);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredSkills.length / skillsPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-center text-blue-700">Skill Manager</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Skill
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {currentSkills.map(skill => (
                        <tr key={skill.skill_id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editSkill && editSkill.skill_id === skill.skill_id ?
                                    <input type="text" name="name" value={editSkill.name} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    skill.name}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editSkill && editSkill.skill_id === skill.skill_id ?
                                    <>
                                        <button
                                            onClick={updateSkill}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditSkill(null)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </> :
                                    <>
                                        <button
                                            onClick={() => setEditSkill(skill)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteSkill(skill.skill_id)}
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
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Skill Name"
                            value={newSkill}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <button
                            onClick={addSkill}
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skill;
