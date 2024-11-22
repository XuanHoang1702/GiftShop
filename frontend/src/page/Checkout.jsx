import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderService from '../service/OrderService';

const Checkout = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        paymentMethod: 'credit-card',
    });
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const userData = JSON.parse(localStorage.getItem('userData'));

    // Cập nhật userInfo nếu userData có sẵn
    useEffect(() => {
        if (userData && userData.user) {
            setUserInfo((prev) => ({
                ...prev,
                fullName: userData.user.name || '',
                address: userData.user.address || '',
                city: userData.user.city || '',
                postalCode: userData.user.postalCode || '',
                phone: userData.user.phone || '',
                paymentMethod: userData.user.paymentMethod || 'credit-card', // Default là 'credit-card'
            }));
        }

        if (location.state && location.state.selectedItems) {
            setOrderItems(location.state.selectedItems);
            const price = location.state.selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(price);
        }
    }, [location.state, userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOrderSubmit = async () => {
        try {
            const orderData = {
                total_quantity: orderItems.reduce((acc, item) => acc + item.quantity, 0),
                total_price: totalPrice,
                status: "pending",
            };

            const orderResponse = await OrderService.placeOrder(orderData);
            const orderId = orderResponse.order.id;

            const orderDetails = orderItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price * item.quantity,
            }));

            const payload = {
                order_id: orderId,
                order_details: orderDetails,
            };
            await OrderService.placeOrderDetails(payload);

            toast.success('Order placed successfully!');
            setTimeout(() => {
                navigate('/cart');
            }, 3000);
        } catch (error) {
            setError('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white mt-10 rounded-lg shadow-lg">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Information */}
                <div className="p-6 border rounded-lg bg-gray-50 shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Information</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={userInfo.fullName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={userInfo.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={userInfo.city}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={userInfo.postalCode}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={userInfo.paymentMethod}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            >
                                <option value="credit-card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="cash-on-delivery">Cash on Delivery</option>
                            </select>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="p-6 border rounded-lg bg-gray-50 shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                    {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between mb-4">
                            <div>
                                <p className="text-gray-700 font-semibold">{item.product_name}</p>
                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-gray-700 font-semibold">${item.price * item.quantity}</p>
                        </div>
                    ))}

                    <div className="border-t pt-4">
                        <p className="text-lg font-bold text-gray-800">Total: ${totalPrice}</p>
                        <button
                            onClick={handleOrderSubmit}
                            className="bg-pink-500 w-full text-white font-bold py-2 px-4 rounded hover:bg-pink-600 mt-4"
                        >
                            Place Order
                        </button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
