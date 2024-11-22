import React from 'react';
import { Outlet } from 'react-router-dom';
import Card from '../components/cart/Card';

const Dashboard = () => (
    <div className="flex">
        <div className="flex-1 flex flex-col">
            <div className="p-4 bg-gray-100 flex-1">
                <Outlet />
                <div className="flex justify-between mt-4">
                    <Card title="Orders" value="50" percentage="+2.5%" icon="fa-shopping-cart" isPositive={true} />
                    <Card title="Members" value="40" percentage="+5.25%" icon="fa-user" isPositive={true} />
                    <Card title="Sales" value="3" percentage="-3.65%" icon="fa-truck" isPositive={false} />
                    <Card title="Revenue" value="$100.000" percentage="+6.5%" icon="fa-dollar-sign" isPositive={true} />
                </div>
                <div className="mt-8 bg-white p-4 rounded shadow">
                    <div className="text-xl font-bold mb-4">Orders</div>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="pb-2">ID</th>
                                <th className="pb-2">Payment Method</th>
                                <th className="pb-2">Order Date</th>
                                <th className="pb-2">Delivery Date</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2">Shipping Address</th>
                                <th className="pb-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2">1</td>
                                <td className="py-2">thanh toán onl</td>
                                <td className="py-2">2024-09-16 09:33:40</td>
                                <td className="py-2">2024-09-23 09:33:40</td>
                                <td className="py-2"><span className="bg-blue-500 text-white px-2 py-1 rounded">Processing</span></td>
                                <td className="py-2">quận 7 </td>
                                <td className="py-2"><button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button></td>
                            </tr>
                            <tr>
                                <td className="py-2">2</td>
                                <td className="py-2">thanh toán onl</td>
                                <td className="py-2">2024-09-16 10:15:00</td>
                                <td className="py-2">2024-09-18 10:15:00</td>
                                <td className="py-2"><span className="bg-green-500 text-white px-2 py-1 rounded">Shipped</span></td>
                                <td className="py-2">quận 9 </td>
                                <td className="py-2"><button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default Dashboard;
