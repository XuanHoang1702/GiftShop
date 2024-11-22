import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostService from '../../Service/PostService';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [topicId, setTopicId] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [createdBy, setCreatedBy] = useState(1);
    const [updatedBy, setUpdatedBy] = useState(1);
    const [status, setStatus] = useState(1);
    const [editingPostId, setEditingPostId] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await PostService.getList();
            setPosts(response);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleAddPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('topic_id', topicId);
        formData.append('slug', slug);
        formData.append('content', content);
        if (thumbnail) formData.append('thumbnail', thumbnail);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('created_by', createdBy);
        formData.append('updated_by', updatedBy);
        formData.append('status', 1);

        try {
            if (editingPostId) {
                const response = await PostService.updatePost(editingPostId, formData);
                console.log(response);
                toast.success('Post updated successfully!');
            } else {
                await PostService.createPost(formData);
                toast.success('Post added successfully!');
            }
            fetchPosts();
            resetForm();
        } catch (error) {
            console.error('Error adding or updating post:', error);
            toast.error('An error occurred while adding/updating the post.');
        }
    };

    const resetForm = () => {
        setTopicId('');
        setSlug('');
        setContent('');
        setThumbnail(null);
        setType('');
        setDescription('');
        setCreatedBy(1);
        setUpdatedBy(1);
        setStatus(1);
        setEditingPostId(null);
    };

    const handleEdit = (post) => {
        setTopicId(post.topic_id);
        setSlug(post.slug);
        setContent(post.content);
        setThumbnail(null);
        setType(post.type);
        setDescription(post.description);
        setCreatedBy(post.created_by);
        setUpdatedBy(post.updated_by);
        setStatus(post.status);
        setEditingPostId(post.id);
    };

    const handlePutTrash = async (id) => {
        try {
            await PostService.putTrash(id);
            toast.success('Post put trash successfully!');
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('An error occurred while deleting the post.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Manage Post List</h1>
            <form className="mb-8 border p-4 rounded bg-gray-100" onSubmit={handleAddPost}>
                <h2 className="text-xl font-bold mb-4">{editingPostId ? 'Edit Post' : 'Add Post'}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topicId">
                        Topic ID
                    </label>
                    <input
                        id="topicId"
                        type="number"
                        value={topicId}
                        onChange={(e) => setTopicId(e.target.value)}
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                        Thumbnail (Image)
                    </label>
                    <input
                        id="thumbnail"
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        accept="image/*"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                        Type
                    </label>
                    <input
                        id="type"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <input
                        id="status"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {editingPostId ? 'Update Post' : 'Add Post'}
                </button>
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">Topic ID</th>
                            <th className="py-2 px-4 border-b text-left">Slug</th>
                            <th className="py-2 px-4 border-b text-left">Content</th>
                            <th className="py-2 px-4 border-b text-left">Thumbnail</th>
                            <th className="py-2 px-4 border-b text-left">Type</th>
                            <th className="py-2 px-4 border-b text-left">Description</th>
                            <th className="py-2 px-4 border-b text-left">Created By</th>
                            <th className="py-2 px-4 border-b text-left">Updated By</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="py-2 px-4 border-b">{post.id}</td>
                                <td className="py-2 px-4 border-b">{post.topic_id}</td>
                                <td className="py-2 px-4 border-b">{post.slug}</td>
                                <td className="py-2 px-4 border-b">{post.content}</td>
                                <td className="py-2 px-4 border-b">
                                    <img
                                        src={`http://localhost:8000/api/post/${post.id}/image`}
                                        alt="Thumbnail"
                                        className="w-20 h-20 object-cover"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b">{post.type}</td>
                                <td className="py-2 px-4 border-b">{post.description}</td>
                                <td className="py-2 px-4 border-b">{post.created_by}</td>
                                <td className="py-2 px-4 border-b">{post.updated_by}</td>
                                <td className="py-2 px-4 border-b">{post.status}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handlePutTrash(post.id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                    >
                                        Trash
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Post;
