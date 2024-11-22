import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostService from '../../Service/PostService';

const PostTrash = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await PostService.getTrash();
            setPosts(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await PostService.deletePost(id);
            toast.success('menu deleted successfully');
            fetchPosts();
        } catch (error) {
            toast.error('Error deleting menu');
        }
    };

    const handleRestore = async (id) => {
        try {
            await PostService.restore(id);
            toast.success('menu restored successfully');
            fetchPosts();
        } catch (error) {
            toast.error('Error restoring menu');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Post Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Topic ID', 'Slug', 'Content', 'Thumbnail', 'Type',  'Description', 'Created By', 'Updated By', 'Created at', 'Updated at',  'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="py-2 px-4">{post.id}</td>
                                    <td className="py-2 px-4">{post.topic_id}</td>
                                    <td className="py-2 px-4">{post.slug}</td>
                                    <td className="py-2 px-4">{post.content}</td>
                                    <td className="py-2 px-4">
                                    <img
                                        src={`http://localhost:8000/storage/images/${post.thumbnail}`}
                                        alt="Thumbnail"
                                        className="w-16 h-16 object-cover"
                                    />
                                    </td>
                                    <td className="py-2 px-4">{post.type}</td>
                                    <td className="py-2 px-4">{post.description}</td>
                                    <td className="py-2 px-4">{post.created_by}</td>
                                    <td className="py-2 px-4">{post.updated_by}</td>
                                    <td className="py-2 px-4">{post.created_at}</td>
                                    <td className="py-2 px-4">{post.updated_at}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{post.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(post.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No posts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostTrash;
