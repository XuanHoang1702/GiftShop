import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactService from '../../Service/ContactService';

const ContactAdmin = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ user_id: '', title: '', content: '', reply_id: 1, status: 1 });
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await ContactService.getAllContacts();
            setContacts(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleAddContact = async (e) => {
        e.preventDefault();

        const formData = {
            title: newContact.title,
            content: newContact.content,
        };

        try {
            if (editingId) {
                const response = await ContactService.reply(editingId, formData);
                console.log("data:", response);
                toast.success('Contact replied successfully!');
                setEditingId(null);
            }
            fetchContacts();
            setNewContact({ user_id: '', title: '', content: '', reply_id: 1, status: 1 });
        } catch (error) {
            console.error('Error adding/updating contact:', error);
            toast.error('Failed to add/update contact.');
        }
    };

    const handlePutTrash = async (id) => {
        try {
            await ContactService.putTrash(id);
            toast.success('Contact put trash successfully!');
            fetchContacts();
        } catch (error) {
            console.error('Error put trash contact:', error);
            toast.error('Failed to delete contact.');
        }
    };

    const handleReply = (contact) => {
        setNewContact({
            title: contact.title,
            content: contact.content,
        });
        setEditingId(contact.id);
    };

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Contact Management</h1>
            {editingId && (
                <form className="mb-8 border p-4 rounded bg-gray-50 shadow-md" onSubmit={handleAddContact}>
                    <h2 className="text-xl font-bold mb-4">Reply to Contact</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={newContact.title}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={newContact.content}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Reply to Contact
                    </button>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">User ID</th>
                            <th className="py-2 px-4 border-b text-left">Title</th>
                            <th className="py-2 px-4 border-b text-left">Content</th>
                            <th className="py-2 px-4 border-b text-left">Reply ID</th>
                            <th className="py-2 px-4 border-b text-left">Created_at</th>
                            <th className="py-2 px-4 border-b text-left">Updated_at</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-100 transition-colors">
                                <td className="py-2 px-4 border-b">{contact.id}</td>
                                <td className="py-2 px-4 border-b">{contact.user_id}</td>
                                <td className="py-2 px-4 border-b">{contact.title}</td>
                                <td className="py-2 px-4 border-b">{contact.content}</td>
                                <td className="py-2 px-4 border-b">{contact.reply_id}</td>
                                <td className="py-2 px-4 border-b">{contact.created_at}</td>
                                <td className="py-2 px-4 border-b">{contact.updated_at}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => handleReply(contact)}
                                    >
                                        Reply
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => handlePutTrash(contact.id)}
                                    >
                                        Put Trash
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

export default ContactAdmin;
