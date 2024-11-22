import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopicService from '../../Service/TopicService';

const TopicTrash = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            const response = await TopicService.getTrash();
            setTopics(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await TopicService.deleteTopic(id);
            toast.success('Topic deleted successfully');
            fetchTopics();
        } catch (error) {
            toast.error('Error deleting Topic');
        }
    };

    const handleRestore = async (id) => {
        try {
            await TopicService.restore(id);
            toast.success('Topic restored successfully');
            fetchTopics();
        } catch (error) {
            toast.error('Error restoring topic');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Topic Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Topic ID', 'Name', 'Slug', 'Sort Order', 'Created By', 'Updated By', 'Created at', 'Updated at',  'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {topics.length > 0 ? (
                            topics.map((topic) => (
                                <tr key={topic.id}>
                                    <td className="py-2 px-4">{topic.id}</td>
                                    <td className="py-2 px-4">{topic.topic_id}</td>
                                    <td className="py-2 px-4">{topic.name}</td>
                                    <td className="py-2 px-4">{topic.slug}</td>
                                    <td className="py-2 px-4">{topic.sort_order}</td>
                                    <td className="py-2 px-4">{topic.created_by}</td>
                                    <td className="py-2 px-4">{topic.updated_by}</td>
                                    <td className="py-2 px-4">{topic.created_at}</td>
                                    <td className="py-2 px-4">{topic.updated_at}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{topic.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(topic.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(topic.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No topics found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopicTrash;
