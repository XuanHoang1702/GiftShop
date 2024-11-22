import React from 'react';
import { FaAward, FaShippingFast, FaTruck } from 'react-icons/fa';

const WhyUs = () => {
    return (
        <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-8">WHY SHOP WITH US</h1>
            <div className="flex flex-wrap justify-center space-x-8">
                {/* Fast Delivery */}
                <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full sm:w-1/3 md:w-1/4">
                    <FaTruck className="text-5xl text-purple-700 mb-4" />
                    <h2 className="text-xl font-bold mb-2">Fast Delivery</h2>
                    <p className="text-gray-600">Get your products quickly with fast shipping.</p>
                </div>
                {/* Free Shipping */}
                <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full sm:w-1/3 md:w-1/4">
                    <FaShippingFast className="text-5xl text-purple-700 mb-4" />
                    <h2 className="text-xl font-bold mb-2">Free Shipping</h2>
                    <p className="text-gray-600">Enjoy free shipping on all orders.</p>
                </div>
                {/* Best Quality */}
                <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full sm:w-1/3 md:w-1/4">
                    <FaAward className="text-5xl text-purple-700 mb-4" />
                    <h2 className="text-xl font-bold mb-2">Best Quality</h2>
                    <p className="text-gray-600">We guarantee the best quality for all products.</p>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
