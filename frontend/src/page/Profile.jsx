import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ContactService from '../service/ContactService';
import UserService from '../service/UserService';

const Profile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [orders, setOrders] = useState([]);
    const [replies, setReplies] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);
    const navigate = useNavigate();

    const fetchOrder = async () => {
        if (isLoadingOrders) return;  // Prevent duplicate requests
        setIsLoadingOrders(true);
        try {
            const response = await axios.get('http://localhost:8000/api/order', {
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                }
            });
            setOrders(response.data.order_details);
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setIsLoadingOrders(false);
        }
    };

    const updateUser = async (id, formData) => {
        try {
            const response = await UserService.update(id, formData);
            if (response.message) {
                toast.success('Update Success!');
                setUser(prevUser => ({ ...prevUser, ...formData }));
            }
        } catch (error) {
            console.log(error);
            toast.error('Can not update now.');
        }
    };

    const fetchReplies = async (userId) => {
        if (isLoadingReplies) return;  // Prevent duplicate requests
        setIsLoadingReplies(true);
        try {
            const response = await ContactService.replies(userId);
            console.log(replies)
            setReplies(response);
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setIsLoadingReplies(false);
        }
    };

    useEffect(() => {
        if (userData) {
            setUser(userData.user);
            fetchReplies(userData.user.id);
        }
    }, [userData]);  // Only run once when userData changes

    useEffect(() => {
        if (userData) {
            fetchOrder();  // Fetch order details when userData is set
        }
    }, [userData]);  // Prevent infinite loop

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('address', user.address);

        updateUser(user.id, formData);
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-6 bg-white mt-20">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-pink-500 mb-4">Profile Page</h1>
            <div className="flex items-center bg-pink-100 p-4 rounded-lg shadow-md mb-6">
                <img src={`http://localhost:8000/api/user/profile/${user.id}`} alt="User Avatar" className="w-24 h-24 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-semibold text-pink-500">Personal Information</h2>
                    {isEditing ? (
                        <div>
                            <input type="text" name="name" value={user.name} onChange={handleChange} className="border border-gray-300 p-2 rounded mb-2 w-full" placeholder="Name" />
                            <input type="email" name="email" value={user.email} onChange={handleChange} className="border border-gray-300 p-2 rounded mb-2 w-full" placeholder="Email" />
                            <input type="tel" name="phone" value={user.phone} onChange={handleChange} className="border border-gray-300 p-2 rounded mb-2 w-full" placeholder="Phone" />
                            <input type="text" name="address" value={user.address} onChange={handleChange} className="border border-gray-300 p-2 rounded mb-2 w-full" placeholder="Address" />
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-700">Name: {user.name}</p>
                            <p className="text-gray-700">Email: {user.email}</p>
                            <p className="text-gray-700">Phone: {user.phone}</p>
                            <p className="text-gray-700">Address: {user.address}</p>
                        </div>
                    )}
                    <button className="bg-pink-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-pink-600" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-2 hover:bg-green-600" onClick={handleUpdate}>
                            Update
                        </button>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-pink-500 mb-2">Order History</h2>
                <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-4 space-y-4 bg-white">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                            <div>
                                <p className="font-semibold text-gray-700">{order.product_name}</p>
                                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                            </div>
                            <div>
                                <p className={`font-semibold ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Cancelled' ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {order.status}
                                </p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-pink-600 mb-4">Admin Replies</h2>
                <div className="border-t border-gray-200 bg-gray-50 p-6 rounded-lg shadow-lg">
                    {replies.length > 0 ? (
                        replies.map((reply, index) => (
                            <div key={index} className="mb-6 border-b border-gray-200 pb-4">
                                <div className="flex items-center mb-2">
                                    <span className="text-pink-500 font-medium">Admin:</span>
                                    <p className="ml-2 text-lg font-semibold text-gray-800">{reply.title}</p>
                                </div>
                                <p className="text-gray-700 mb-3">{reply.content}</p>
                                <p className="text-sm text-gray-500">
                                    {reply.updated_at ? format(new Date(reply.updated_at), 'dd MMM yyyy, HH:mm') : 'N/A'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No replies yet.</p>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <button onClick={handleLogout} className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
