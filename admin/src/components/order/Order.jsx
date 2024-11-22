import React, { useEffect, useState } from 'react';
import OrderService from '../../Service/OrderService';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getOrders();
        setOrders(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        setError('An error occurred while fetching orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="overflow-x-auto max-h-60">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">User ID</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
              <th className="py-2 px-4 border-b text-left">Created at</th>
              <th className="py-2 px-4 border-b text-left">Updated at</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.user_id}</td>
                <td className="py-2 px-4 border-b">{order.user.phone}</td>
                <td className="py-2 px-4 border-b">{order.user.email}</td>
                <td className="py-2 px-4 border-b">{order.user.address}</td>
                <td className="py-2 px-4 border-b">{order.created_at}</td>
                <td className="py-2 px-4 border-b">{order.updated_at}</td>
                <td className="py-2 px-4 border-b">{order.status || 'Processing'}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
