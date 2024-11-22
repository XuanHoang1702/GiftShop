
import React from 'react';

const Card = ({ title, value, percentage, icon, isPositive }) => (
    <div className="bg-white p-4 rounded shadow w-1/4">
        <div className="flex justify-between items-center mb-2">
            <div className="text-gray-500">{title}</div>
            <div className="bg-blue-100 p-2 rounded-full">
                <i className={`fas ${icon} text-blue-500`}></i>
            </div>
        </div>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {percentage} Since last week
        </div>
    </div>
);

export default Card;
