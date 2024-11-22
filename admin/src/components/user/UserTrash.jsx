import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../../Service/UserService';

const UserTrash = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UserService.getTrash();
            setUsers(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await UserService.deleteUser(id);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Error deleting user');
        }
    };

    const handleRestore = async (id) => {
        try {
            await UserService.restore(id);
            fetchUsers();
            toast.success('user restored successfully');
        } catch (error) {
            toast.error('Error restoring user');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">User Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Email', 'Phone', 'Image', 'Address',  'Gender', 'Created at', 'Updated at', 'Status', 'Action'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4">{user.id}</td>
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.phone}</td>
                                    <td className="py-2 px-4">
                                    {
                                        user.image === 'No image' ? (
                                            <img src={require('../../assets/Default.jpg') }alt="Default" className='w-10 h-10'/>
                                        ) : (
                                            <img src={`http://localhost:8000/api/user/profile/${user.id}`} alt="User" className='w-10 h-10'/>
                                        )
                                    }
                                    </td>
                                    <td className="py-2 px-4">{user.address}</td>
                                    <td className="py-2 px-4">{user.gender}</td>
                                    <td className="py-2 px-4">{user.created_at}</td>
                                    <td className="py-2 px-4">{user.updated_at}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{user.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(user.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTrash;
