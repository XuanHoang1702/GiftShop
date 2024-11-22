import React from 'react';
import { Link } from 'react-router-dom';

const BestSellerProduct = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="bg-white p-4 rounded-lg relative shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Best Seller
            </span>
            <img 
                src={`http://localhost:8000/api/product/${product.id}/image`} 
                alt={product.alt} 
                className="w-full h-40 object-contain mb-4 rounded-lg"
            />
            <div className="flex justify-between items-center">
                <span className="text-lg font-semibold truncate">{product.name}</span>
                <span className="text-lg text-red-500 font-semibold">Price ${product.pricebuy}</span>
            </div>
        </Link>
    );
};

export default BestSellerProduct;
