import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactService from '../../Service/ContactService';

const ContactTrash = () => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await ContactService.getTrash();
            setContacts(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await ContactService.deleteContact(id);
            toast.success('Contact deleted successfully');
            fetchContacts();
        } catch (error) {
            toast.error('Error deleting Contact');
        }
    };

    const handleRestore = async (id) => {
        try {
            await ContactService.restore(id);
            toast.success('Contact restored successfully');
            fetchContacts();
        } catch (error) {
            toast.error('Error restoring Contact');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Contact Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">User ID</th>
                            <th className="py-2 px-4 border-b text-left">Title</th>
                            <th className="py-2 px-4 border-b text-left">Content</th>
                            <th className="py-2 px-4 border-b text-left">Reply ID</th>
                            <th className="py-2 px-4 border-b text-left">Created_at</th>
                            <th className="py-2 px-4 border-b text-left">Updated_at</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td className="py-2 px-4 border-b">{contact.id}</td>
                                    <td className="py-2 px-4 border-b">{contact.user_id}</td>
                                    <td className="py-2 px-4 border-b">{contact.title}</td>
                                    <td className="py-2 px-4 border-b">{contact.content}</td>
                                    <td className="py-2 px-4 border-b">{contact.reply_id}</td>
                                    <td className="py-2 px-4 border-b">{contact.created_at}</td>
                                    <td className="py-2 px-4 border-b">{contact.updated_at}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{contact.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(contact.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(contact.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No menus found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactTrash;
