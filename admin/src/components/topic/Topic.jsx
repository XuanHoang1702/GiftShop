import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopicService from '../../Service/TopicService';


const Topic = () => {
    const [topics, setTopics] = useState([]); 
    const [name, setName] = useState(''); 
    const [slug, setSlug] = useState(''); 
    const [sort_order, setSortOrder] = useState(0);
    const [created_by, setCreatedBy] = useState(''); // New state for created_by
    const [updated_by, setUpdatedBy] = useState(''); // New state for updated_by
    const [status, setStatus] = useState(1); // Assuming 'status' is a number (e.g., 1 for active, 0 for inactive)

    const fetchTopics = async () => {
        try {
            const response = await TopicService.getList();
            setTopics(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Error fetching topics:', error);
            setTopics([]);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleAddTopic = async () => {
        try {
            await TopicService.addTopic({
                name,
                slug,
                sort_order,
                created_by,
                updated_by,
                status
            });
            toast.success("Topic added success");
            fetchTopics();
            setName('');
            setSlug('');
            setSortOrder(0);
            setCreatedBy('');
            setUpdatedBy('');
            setStatus(1);
        } catch (error) {
            console.error('Error adding topic:', error);
        }
    };

    const handlePutTrash = async (id) => {
        try {
            await TopicService.putTrash(id);
            toast.success('Topic put trash successfully!');
            fetchTopics();
        } catch (error) {
            console.error('Error deleting topic:', error);
            toast.error('An error occurred while deleting the topic.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer/>
            <h1 className="text-2xl font-bold mb-4">Manage Topic List</h1>
            <form className="mb-8 border p-4 rounded bg-gray-100" onSubmit={(e) => { e.preventDefault(); handleAddTopic(); }}>
                <h2 className="text-xl font-bold mb-4">Add Topic</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Topic Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                        Slug
                    </label>
                    <input
                        id="slug"
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sortOrder">
                        Sort Order
                    </label>
                    <input
                        id="sort_0rder"
                        type="number"
                        value={sort_order}
                        onChange={(e) => setSortOrder(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdBy">
                        Created By
                    </label>
                    <input
                        id="created_by"
                        type="text"
                        value={created_by}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="updatedBy">
                        Updated By
                    </label>
                    <input
                        id="updated_by"
                        type="text"
                        value={updated_by}
                        onChange={(e) => setUpdatedBy(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Topic
                </button>
            </form>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Topic Name</th>
                        <th className="py-2 px-4 border-b text-left">Slug</th>
                        <th className="py-2 px-4 border-b text-left">Sort Order</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(topics) && topics.length > 0 ? (
                        topics.map((topic) => (
                            <tr key={topic.id}>
                                <td className="py-2 px-4 border-b">{topic.id}</td>
                                <td className="py-2 px-4 border-b">{topic.name}</td>
                                <td className="py-2 px-4 border-b">{topic.slug}</td>
                                <td className="py-2 px-4 border-b">{topic.sortOrder}</td>
                                <td className="py-2 px-4 border-b">{topic.status === 1 ? 'Active' : 'Inactive'}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handlePutTrash(topic.id)}>Put trash</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-2 px-4 text-center">No topics available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Topic;
