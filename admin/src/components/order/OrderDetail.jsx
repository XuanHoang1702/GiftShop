import React, { useEffect, useState } from 'react';
import OrderDetailService from '../../Service/OrderDetailService';

const OrderDetail = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        userId: '',
        orderId: '',
        productId: '',
        qty: '',
        price: '',
        amount: '',
        discount: '',
        customerName: '',
        phone: '',
        email: '',
        address: '',
        note: '',
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await OrderDetailService.getOrders(); 
                setOrders(data);
            } catch (error) {
                console.error('Error fetching order list:', error.message);
                setError('An error occurred while fetching the order list. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            const newOrder = await OrderDetailService.createOrder(formData);
            setOrders((prevOrders) => [...prevOrders, newOrder]);
            setFormData({
                userId: '',
                orderId: '',
                productId: '',
                qty: '',
                price: '',
                amount: '',
                discount: '',
                customerName: '',
                phone: '',
                email: '',
                address: '',
                note: '',
            });
            setError('');
        } catch (error) {
            console.error('Error adding order:', error.message);
            setError('An error occurred while adding the order. Please check the information.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit();
    };

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            {error && <p className="text-red-500">{error}</p>}
            <h1 className="text-2xl font-bold mb-4">Order Detail Management</h1>
            <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-100 mb-4">
                <h2 className="text-xl font-bold mb-4">Add Order Detail</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">User ID</label>
                    <input
                        id="userId"
                        type="text"
                        value={formData.userId}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderId">Order ID</label>
                    <input
                        id="orderId"
                        type="text"
                        value={formData.orderId}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">Product ID</label>
                    <input
                        id="productId"
                        type="text"
                        value={formData.productId}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qty">Quantity</label>
                    <input
                        id="qty"
                        type="number"
                        value={formData.qty}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Total Amount</label>
                    <input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">Discount</label>
                    <input
                        id="discount"
                        type="number"
                        value={formData.discount}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Order Detail
                </button>
            </form>
            <table className="min-w-full bg-white mb-8">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Order ID</th>
                        <th className="py-2 px-4 border-b">Product ID</th>
                        <th className="py-2 px-4 border-b">Quantity</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Total Amount</th>
                        <th className="py-2 px-4 border-b">Discount</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((detail) => (
                        <tr key={detail.id}>
                            <td className="py-2 px-4 border-b">{detail.id}</td>
                            <td className="py-2 px-4 border-b">{detail.order_id}</td>
                            <td className="py-2 px-4 border-b">{detail.product_id}</td>
                            <td className="py-2 px-4 border-b">{detail.qty}</td>
                            <td className="py-2 px-4 border-b">{detail.price}</td>
                            <td className="py-2 px-4 border-b">{detail.amount}</td>
                            <td className="py-2 px-4 border-b">{detail.discount}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;
