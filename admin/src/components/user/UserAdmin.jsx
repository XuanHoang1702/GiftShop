import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { default as UserService, default as UserServiceApi } from '../../Service/UserService';

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: ''
    });

    const fetchUser = async () => {
        try {
            const data = await UserServiceApi.getList();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await UserServiceApi.createUser(newUser); 
            setNewUser({ name: '', email: '', phone: '', address: '', gender: '' });
            toast.success('User created successfully');
            fetchUser(); 
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Can not create user');
        }
    };

    const handlePutTrash = async (id) => {
        try {
            await UserService.putTrash(id);
            toast.success('User put trash successfully!');
            fetchUser();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('An error occurred while deleting the user.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer/>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <form className="mb-8 border p-4 rounded bg-gray-100" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Add User</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={newUser.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={newUser.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={newUser.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={newUser.address}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={newUser.gender}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add User
                </button>
            </form>

            {/* User List Table */}
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Email</th>
                        <th className="py-2 px-4 border-b text-left">Phone Number</th>
                        <th className="py-2 px-4 border-b text-left">Image</th>
                        <th className="py-2 px-4 border-b text-left">Address</th>
                        <th className="py-2 px-4 border-b text-left">Gender</th>
                        <th className="py-2 px-4 border-b text-left">Created_at</th>
                        <th className="py-2 px-4 border-b text-left">Updated_at</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b">{user.id}</td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.phone}</td>
                                <td className="py-2 px-4 border-b">
                                    {
                                        user.image === 'No image' ? (
                                            <img src={require('../../assets/Default.jpg') }alt="Default" className='w-10 h-10'/>
                                        ) : (
                                            <img src={`http://localhost:8000/api/user/profile/${user.id}`} alt="User" className='w-10 h-10'/>
                                        )
                                    }
                                </td>
                                <td className="py-2 px-4 border-b">{user.address}</td>
                                <td className="py-2 px-4 border-b">{user.gender}</td>
                                <td className="py-2 px-4 border-b">{user.created_at}</td>
                                <td className="py-2 px-4 border-b">{user.updated_at}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handlePutTrash(user.id)}>Put trash</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="py-2 px-4 text-center">No user data available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserAdmin;
