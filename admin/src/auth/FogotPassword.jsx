import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../Service/UserService';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (formData.email && formData.phone) {
            handleValidation();
        }
    }, [formData.email, formData.phone]);

    const handleValidation = async () => {
        try {
            const response = await UserService.emailPhone(formData);
            setUserId(response.user_id);
            toast.success('User validated. You can now set a new password.');
        } catch (error) {
            toast.error('Email or phone number is incorrect.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId) {
            try {
                await UserService.changePass(userId, formData.password, formData.password_confirmation);
                toast.success('Password updated successfully.');
                setTimeout(() => navigate('/login'), 2000); // Chuyển hướng sau 2 giây
            } catch (error) {
                toast.error('Failed to update password. Please try again.');
            }
        } else {
            toast.error('Please validate email and phone first.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Forgot Password</h2>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-gray-600 mb-1">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-600 mb-1">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password_confirmation" className="block text-gray-600 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-3 px-6 rounded w-full hover:bg-blue-600 transition duration-200"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
