import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactService from '../service/ContactService';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        title: '',
        contents: '',
        status: 1,
    });
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async () => {
        if (!email) return;
        try {
            const response = await ContactService.email(email);
            if (response && response.id) {
                setFormData({ ...formData, user_id: response.id });
            } else {
                console.log('Email not found!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error retrieving user ID.');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!email || !formData.title || !formData.contents) {
            toast.error('Please fill out all fields.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await ContactService.sendContact(formData);
            if (response.message) {
                toast.success('Message sent successfully!');
                setFormData({
                    user_id: '',
                    title: '',
                    contents: '',
                    status: 1,
                });
                setEmail('');
            } else {
                toast.error('Failed to send message.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error sending message.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8">CONTACT US</h1>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 pr-4 mb-8 sm:mb-0">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999999999995!2d2.2944813156746826!3d48.85837007928744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fef46e1b0b1%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1633022820000!5m2!1sen!2sfr"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Google Map of Eiffel Tower"
                    ></iframe>
                </div>
                <div className="w-full sm:w-1/2 pl-4">
                    <form className="space-y-4" onSubmit={handleFormSubmit}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleEmailSubmit}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Message"
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="4"
                                value={formData.contents}
                                onChange={(e) => setFormData({ ...formData, contents: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full p-2 bg-pink-500 text-white font-bold rounded flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : <><FaPaperPlane className="mr-2" /> SEND</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
