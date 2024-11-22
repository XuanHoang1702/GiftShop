
import React from 'react';
// import productImage from '../assets/product1.jpg'; 
const TopNav = () => (
    <div className="flex justify-between items-center p-4 bg-white shadow">
        <div className="text-2xl font-bold">Admin Dashboard</div>
        <div className="flex items-center">
            <div className="mr-4">admin</div>
            {/* <img src={productImage} alt="Admin avatar" className="rounded-full"/> */}
        </div>
    </div>
    
);

export default TopNav;
