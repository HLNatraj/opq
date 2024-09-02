import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courselist = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        link: '',
        imageUrl: ''
    });
    const [editCourse, setEditCourse] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const coursesPerPage = 3;

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getcourses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCourse({ ...editCourse, [name]: value });
    };

    const addCourse = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addcourse', newCourse);
            fetchCourses();
            setNewCourse({
                title: '',
                description: '',
                start_date: '',
                end_date: '',
                link: '',
                imageUrl: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const updateCourse = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updatecourse/${editCourse.course_id}`, editCourse);
            fetchCourses();
            setEditCourse(null);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deletecourse/${id}`);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current courses
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredCourses.length / coursesPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-center text-blue-700">Course Manager</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Course
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="overflow-x-auto w-full max-w-5xl mx-auto"> 
                <table className="min-w-full bg-white border border-gray-200 w-full">
                    <thead>
                        <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Start Date</th>
                            <th className="py-3 px-6 text-left">End Date</th>
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Link</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light ">
                        {currentCourses.map(course => (
                            <tr key={course.course_id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {editCourse && editCourse.course_id === course.course_id ?
                                        <input type="text" name="title" value={editCourse.title} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        course.title}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {editCourse && editCourse.course_id === course.course_id ?
                                        <input type="text" name="description" value={editCourse.description} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        course.description}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {editCourse && editCourse.course_id === course.course_id ?
                                        <input type="date" name="start_date" value={editCourse.start_date} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        course.start_date}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {editCourse && editCourse.course_id === course.course_id ?
                                        <input type="date" name="end_date" value={editCourse.end_date} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        course.end_date}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {editCourse && editCourse.course_id === course.course_id ?
                                        <input type="text" name="imageUrl" value={editCourse.imageUrl} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        <img src={course.imageUrl} alt={course.title} className="w-16 h-16 object-cover" />}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {editCourse && editCourse.course_id === course.course_id ?
                                        <input type="text" name="link" value={editCourse.link} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                        <a href={course.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Course</a>}
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {editCourse && editCourse.course_id === course.course_id ?
                                        <button onClick={updateCourse} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button> :
                                        <>
                                            <button onClick={() => setEditCourse(course)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                                            <button onClick={() => deleteCourse(course.course_id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <ul className="flex justify-center space-x-2">
                    {renderPageNumbers()}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                        <input type="text" name="title" value={newCourse.title} onChange={handleInputChange} placeholder="Title" className="border p-2 rounded w-full mb-4" />
                        <textarea name="description" value={newCourse.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded w-full mb-4"></textarea>
                        <input type="date" name="start_date" value={newCourse.start_date} onChange={handleInputChange} className="border p-2 rounded w-full mb-4" />
                        <input type="date" name="end_date" value={newCourse.end_date} onChange={handleInputChange} className="border p-2 rounded w-full mb-4" />
                        <input type="text" name="imageUrl" value={newCourse.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="border p-2 rounded w-full mb-4" />
                        <input type="text" name="link" value={newCourse.link} onChange={handleInputChange} placeholder="Course Link" className="border p-2 rounded w-full mb-4" />
                        <button onClick={addCourse} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                        <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courselist;
